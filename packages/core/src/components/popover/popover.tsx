

import classNames from "classnames";
import React, { type ReactElement } from "react";

import { Classes } from "../../common";
import { DISPLAYNAME_PREFIX } from "../../common/props";
import { isNodeEmpty } from "../../common/utils";
import { Overlay } from "../overlay/overlay";
import { PopoverInteractionKind, PopoverPosition } from "./popoverProps";
import type { PopoverProps, PopoverTargetProps } from "./popoverProps";
import { calculatePopoverPosition } from "./popoverUtils";

export interface PopoverState {
    isOpen: boolean;
    hasDarkParent: boolean;
}

/**
 * Popover component.
 *
 */
export class Popover extends React.PureComponent<PopoverProps, PopoverState> {
    public static displayName = `${DISPLAYNAME_PREFIX}.Popover`;

    public state: PopoverState = {
        isOpen: this.props.defaultIsOpen || false,
        hasDarkParent: false,
    };

    private targetRef = React.createRef<HTMLElement>();
    private popoverRef = React.createRef<HTMLDivElement>();
    private openTimeout?: number;
    private closeTimeout?: number;

    public render(): ReactElement<HTMLDivElement> {
        const { children, disabled } = this.props;
        
        if (disabled) {
            return <>{children}</>;
        }

        return (
            <>
                {this.renderTarget()}
                {this.maybeRenderPopover()}
            </>
        );
    }

    public componentDidUpdate(prevProps: PopoverProps, prevState: PopoverState) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.setOpenState(this.props.isOpen!, undefined, true);
        }

        // Update dark theme detection
        if (this.state.isOpen && !prevState.isOpen && this.targetRef.current != null) {
            const hasDarkParent = this.detectDarkTheme(this.targetRef.current);
            if (hasDarkParent !== this.state.hasDarkParent) {
                this.setState({ hasDarkParent });
            }
        }
    }

    public componentWillUnmount() {
        this.clearTimeouts();
    }

    public reposition() {
        if (this.targetRef.current && this.popoverRef.current) {
            const placement = calculatePopoverPosition(
                this.targetRef.current,
                this.popoverRef.current,
                this.props.placement || this.props.position || "auto",
                this.props.flip !== false,
                this.props.boundary || "viewport"
            );
            
            // Apply positioning
            this.popoverRef.current.style.position = this.props.strategy === "absolute" ? "absolute" : "fixed";
            this.popoverRef.current.style.top = `${placement.offset.top}px`;
            this.popoverRef.current.style.left = `${placement.offset.left}px`;

            // Apply orientation classes for arrow styling
            const primary = String(placement.position).split("-")[0];
            const popEl = this.popoverRef.current;
            popEl.classList.remove("kz-popover-top", "kz-popover-bottom", "kz-popover-left", "kz-popover-right");
            if (primary === "top" || primary === "bottom" || primary === "left" || primary === "right") {
                popEl.classList.add(`kz-popover-${primary}`);
            }

            // Apply match target width if specified
            if (this.props.matchTargetWidth && this.targetRef.current) {
                this.popoverRef.current.style.width = `${this.targetRef.current.offsetWidth}px`;
            }
            
            // Position arrow if not minimal
            if (!this.props.minimal && placement.arrowOffset) {
                const arrow = this.popoverRef.current.querySelector(`.${Classes.POPOVER_ARROW}`) as HTMLElement;
                if (arrow) {
                    // Only set one axis to avoid conflicting with SCSS positional rules
                    if (primary === "top" || primary === "bottom") {
                        arrow.style.top = "";
                        arrow.style.left = `${placement.arrowOffset.left}px`;
                    } else {
                        arrow.style.left = "";
                        arrow.style.top = `${placement.arrowOffset.top}px`;
                    }
                }
            }
        }
    }

    private renderTarget() {
        const { children, target, targetTagName = "span", renderTarget } = this.props;
        
        const targetProps = this.getTargetProps();
        
        // Use custom renderTarget if provided
        if (renderTarget != null) {
            return renderTarget({
                isOpen: this.isOpen(),
                ref: this.targetRef,
                ...targetProps,
                className: classNames(Classes.POPOVER_TARGET, targetProps.className),
                "aria-haspopup": this.props.popupKind || "dialog",
                "aria-expanded": this.isOpen(),
            } as React.HTMLAttributes<HTMLElement>);
        }
        
        let targetElement: React.ReactNode;
        if (target != null) {
            targetElement = target;
        } else if (React.Children.count(children) === 1) {
            targetElement = React.Children.only(children);
        } else if (React.Children.count(children) > 1) {
            targetElement = React.Children.toArray(children)[0];
        }

        const TargetTagName = targetTagName as React.ElementType;
        const finalTargetProps = {
            ...targetProps,
            className: classNames(Classes.POPOVER_TARGET, targetProps.className),
            "aria-haspopup": this.props.popupKind || "dialog",
            "aria-expanded": this.isOpen(),
        };

        if (React.isValidElement(targetElement)) {
            const clonedTarget = React.cloneElement(targetElement, finalTargetProps);
            return (
                <TargetTagName ref={this.targetRef}>
                    {clonedTarget}
                </TargetTagName>
            );
        } else {
            return (
                <TargetTagName ref={this.targetRef} {...finalTargetProps}>
                    {targetElement}
                </TargetTagName>
            );
        }
    }

    private maybeRenderPopover() {
        if (!this.isOpen()) {
            return null;
        }

        const { 
            backdropProps,
            content,
            inheritDarkTheme = true,
            minimal = false,
            popoverClassName,
            _popoverRef,
            hasBackdrop = false,
            canOutsideClickClose = true,
            autoFocus,
            shouldReturnFocusOnClose,
            enforceFocus,
            initialFocusElement,
            finalFocusElement,
            popupKind = "dialog",
            ...overlayProps
        } = this.props;

        const resolvedContent = typeof content === "function" ? content() : content;
        
        if (isNodeEmpty(resolvedContent)) {
            return null;
        }

        const popoverClasses = classNames(
            Classes.POPOVER,
            {
                [Classes.DARK]: inheritDarkTheme && this.state.hasDarkParent,
                [Classes.MINIMAL]: minimal,
            },
            popoverClassName,
        );
        const { interactionKind = PopoverInteractionKind.CLICK } = this.props;
        const isHover = interactionKind === PopoverInteractionKind.HOVER;
        const isHoverTargetOnly = interactionKind === PopoverInteractionKind.HOVER_TARGET_ONLY;
        const attachHoverHandlers = isHover || isHoverTargetOnly;

        const isHoverLike = interactionKind === PopoverInteractionKind.HOVER ||
            interactionKind === PopoverInteractionKind.HOVER_TARGET_ONLY;

        // For hover interactions, do not steal focus to avoid blur-close flicker
        const overlayAutoFocus = autoFocus !== undefined ? autoFocus : !isHoverLike;
        const overlayEnforceFocus = enforceFocus !== undefined ? enforceFocus : !isHoverLike;
        const overlayShouldReturnFocus = shouldReturnFocusOnClose !== undefined ? shouldReturnFocusOnClose : false;

        return (
            <Overlay
                autoFocus={overlayAutoFocus}
                backdropProps={backdropProps}
                canEscapeKeyClose={this.props.canEscapeKeyClose}
                canOutsideClickClose={canOutsideClickClose}
                className={this.props.className}
                enforceFocus={overlayEnforceFocus}
                hasBackdrop={hasBackdrop}
                isOpen={this.isOpen()}
                lazy={this.props.lazy}
                onClose={this.handleOverlayClose}
                onClosed={this.props.onClosed}
                onClosing={this.props.onClosing}
                onOpened={this.handlePopoverOpened}
                onOpening={this.props.onOpening}
                shouldReturnFocusOnClose={overlayShouldReturnFocus}
                transitionDuration={this.props.transitionDuration}
                usePortal={this.props.usePortal}
                portalClassName={this.props.portalClassName}
                {...overlayProps}
            >
                <div
                    className={popoverClasses}
                    ref={this.mergePopoverRef}
                    {...(attachHoverHandlers
                        ? {
                              onMouseEnter: this.handleContainerMouseEnter,
                              onMouseLeave: this.handleContainerMouseLeave,
                          }
                        : {})}
                >
                    {!minimal && <div className={Classes.POPOVER_ARROW} />}
                    <div className={Classes.POPOVER_CONTENT}>
                        {resolvedContent}
                    </div>
                </div>
            </Overlay>
        );
    }

    private getTargetProps(): PopoverTargetProps {
        const { interactionKind = PopoverInteractionKind.CLICK } = this.props;
        
        let targetProps: Partial<PopoverTargetProps> = {
            isOpen: this.isOpen(),
            onKeyDown: this.handleKeyDown,
            tabIndex: 0, // Make target focusable for keyboard navigation
        };

        if (interactionKind === PopoverInteractionKind.CLICK || 
            interactionKind === PopoverInteractionKind.CLICK_TARGET_ONLY) {
            targetProps.onClick = this.handleTargetClick;
            targetProps.onFocus = this.handleTargetFocus;
            targetProps.onBlur = this.handleTargetBlur;
        }

        if (interactionKind === PopoverInteractionKind.HOVER ||
            interactionKind === PopoverInteractionKind.HOVER_TARGET_ONLY) {
            targetProps.onMouseEnter = this.handleMouseEnter;
            targetProps.onMouseLeave = this.handleMouseLeave;
            targetProps.onFocus = this.handleTargetFocus;
            targetProps.onBlur = this.handleTargetBlur;
        }

        return targetProps as PopoverTargetProps;
    }

    private handleTargetClick = (event: React.MouseEvent<HTMLElement>) => {
        if (this.props.disabled || event.isDefaultPrevented()) {
            return;
        }

        this.setOpenState(!this.isOpen(), event);
    };

    private handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        if (this.props.disabled) {
            return;
        }

        if (this.closeTimeout !== undefined) {
            clearTimeout(this.closeTimeout);
            this.closeTimeout = undefined;
        }

        if (!this.isOpen() && this.openTimeout === undefined) {
            this.openTimeout = window.setTimeout(() => {
                this.setOpenState(true, event);
                this.openTimeout = undefined;
            }, this.props.hoverOpenDelay || 150);
        }
    };

    private handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
        if (this.props.disabled) {
            return;
        }

        // If moving into the popover content or back to target, do not start closing
        if (this.isEventFromInside(event)) {
            return;
        }

        if (this.openTimeout !== undefined) {
            clearTimeout(this.openTimeout);
            this.openTimeout = undefined;
        }

        if (this.isOpen() && this.closeTimeout === undefined) {
            this.closeTimeout = window.setTimeout(() => {
                this.setOpenState(false, event);
                this.closeTimeout = undefined;
            }, this.props.hoverCloseDelay || 300);
        }
    };

    private handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Escape" && this.isOpen()) {
            this.setOpenState(false, event);
        } else if (event.key === "Enter" || event.key === " ") {
            // Space or Enter should toggle popover for click interaction
            const { interactionKind = PopoverInteractionKind.CLICK } = this.props;
            if (interactionKind === PopoverInteractionKind.CLICK || 
                interactionKind === PopoverInteractionKind.CLICK_TARGET_ONLY) {
                this.setOpenState(!this.isOpen(), event);
                event.preventDefault();
            }
        }
    };

    private handleTargetFocus = (event: React.FocusEvent<HTMLElement>) => {
        if (this.props.disabled) {
            return;
        }

        // For hover interaction, focus should open popover
        const { interactionKind = PopoverInteractionKind.CLICK } = this.props;
        if (interactionKind === PopoverInteractionKind.HOVER ||
            interactionKind === PopoverInteractionKind.HOVER_TARGET_ONLY) {
            
            if (this.closeTimeout !== undefined) {
                clearTimeout(this.closeTimeout);
                this.closeTimeout = undefined;
            }

            if (!this.isOpen() && this.openTimeout === undefined) {
                this.openTimeout = window.setTimeout(() => {
                    this.setOpenState(true, event as React.SyntheticEvent<HTMLElement>);
                    this.openTimeout = undefined;
                }, this.props.hoverOpenDelay || 150);
            }
        }
    };

    private handleTargetBlur = (event: React.FocusEvent<HTMLElement>) => {
        if (this.props.disabled) {
            return;
        }

        // For hover interaction, blur should close popover
        const { interactionKind = PopoverInteractionKind.CLICK } = this.props;
        if (interactionKind === PopoverInteractionKind.HOVER ||
            interactionKind === PopoverInteractionKind.HOVER_TARGET_ONLY) {
            // If focus is moving into popover content, do not close
            if (this.isEventFromInside(event)) {
                return;
            }

            if (this.openTimeout !== undefined) {
                clearTimeout(this.openTimeout);
                this.openTimeout = undefined;
            }

            if (this.isOpen() && this.closeTimeout === undefined) {
                this.closeTimeout = window.setTimeout(() => {
                    this.setOpenState(false, event as React.SyntheticEvent<HTMLElement>);
                    this.closeTimeout = undefined;
                }, this.props.hoverCloseDelay || 300);
            }
        }
    };

    private handleOverlayClose = (event?: React.SyntheticEvent<HTMLElement>) => {
        this.setOpenState(false, event);
    };

    private handlePopoverOpened = (node: HTMLElement) => {
        this.props.onOpened?.(node);
        
        // Calculate position after popover is opened
        if (this.targetRef.current && this.popoverRef.current) {
            const placement = calculatePopoverPosition(
                this.targetRef.current,
                this.popoverRef.current,
                this.props.placement || this.props.position || "auto",
                this.props.flip !== false,
                this.props.boundary || "viewport"
            );
            
            // Apply positioning
            this.popoverRef.current.style.position = this.props.strategy === "absolute" ? "absolute" : "fixed";
            this.popoverRef.current.style.top = `${placement.offset.top}px`;
            this.popoverRef.current.style.left = `${placement.offset.left}px`;

            // Apply orientation classes for arrow styling
            const primary = String(placement.position).split("-")[0];
            const popEl = this.popoverRef.current;
            popEl.classList.remove("kz-popover-top", "kz-popover-bottom", "kz-popover-left", "kz-popover-right");
            if (primary === "top" || primary === "bottom" || primary === "left" || primary === "right") {
                popEl.classList.add(`kz-popover-${primary}`);
            }

            // Apply match target width if specified
            if (this.props.matchTargetWidth && this.targetRef.current) {
                this.popoverRef.current.style.width = `${this.targetRef.current.offsetWidth}px`;
            }
            
            // Position arrow if not minimal
            if (!this.props.minimal && placement.arrowOffset) {
                const arrow = this.popoverRef.current.querySelector(`.${Classes.POPOVER_ARROW}`) as HTMLElement;
                if (arrow) {
                    if (primary === "top" || primary === "bottom") {
                        arrow.style.top = "";
                        arrow.style.left = `${placement.arrowOffset.left}px`;
                    } else {
                        arrow.style.left = "";
                        arrow.style.top = `${placement.arrowOffset.top}px`;
                    }
                }
            }
        }
    };

    private setOpenState(isOpen: boolean, event?: React.SyntheticEvent<HTMLElement>, isControlled = false) {
        if (this.props.disabled) {
            return;
        }

        if (!isControlled) {
            this.setState({ isOpen });
        }

        this.props.onInteraction?.(isOpen, event);
    }

    private isOpen() {
        return this.props.isOpen != null ? this.props.isOpen : this.state.isOpen;
    }

    private detectDarkTheme(element: Element): boolean {
        let current: Element | null = element;
        while (current != null) {
            if (current.classList.contains("bp5-dark") || current.classList.contains("bp4-dark")) {
                return true;
            }
            current = current.parentElement;
        }
        return false;
    }

    private mergePopoverRef = (ref: HTMLDivElement | null) => {
        this.popoverRef.current = ref;
        if (this.props.popoverRef) {
            if (typeof this.props.popoverRef === "function") {
                this.props.popoverRef(ref);
            } else {
                (this.props.popoverRef as React.MutableRefObject<HTMLDivElement | null>).current = ref;
            }
        }
    };

    private handleContainerMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        if (this.props.disabled) {
            return;
        }

        // Cancel any pending close
        if (this.closeTimeout !== undefined) {
            clearTimeout(this.closeTimeout);
            this.closeTimeout = undefined;
        }

        const { interactionKind = PopoverInteractionKind.CLICK } = this.props;
        // In HOVER mode, entering the popover content should be able to open it (if there is a gap)
        // In HOVER_TARGET_ONLY, do not open from content; just prevent closing
        if (interactionKind === PopoverInteractionKind.HOVER) {
            if (!this.isOpen() && this.openTimeout === undefined) {
                this.openTimeout = window.setTimeout(() => {
                    this.setOpenState(true, event);
                    this.openTimeout = undefined;
                }, this.props.hoverOpenDelay || 150);
            }
        }
    };

    private handleContainerMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
        if (this.props.disabled) {
            return;
        }

        // If moving into target, don't close
        if (this.isEventFromInside(event)) {
            return;
        }

        if (this.openTimeout !== undefined) {
            clearTimeout(this.openTimeout);
            this.openTimeout = undefined;
        }

        if (this.isOpen() && this.closeTimeout === undefined) {
            this.closeTimeout = window.setTimeout(() => {
                this.setOpenState(false, event);
                this.closeTimeout = undefined;
            }, this.props.hoverCloseDelay || 300);
        }
    };

    private isEventFromInside = (event: { relatedTarget: EventTarget | null }) => {
        const rt = (event && event.relatedTarget) as Node | null;
        if (rt == null) return false;
        const pop = this.popoverRef.current;
        const tgt = this.targetRef.current;
        return !!((pop && pop.contains(rt)) || (tgt && tgt.contains(rt)));
    };

    private clearTimeouts() {
        if (this.openTimeout !== undefined) {
            clearTimeout(this.openTimeout);
            this.openTimeout = undefined;
        }
        if (this.closeTimeout !== undefined) {
            clearTimeout(this.closeTimeout);
            this.closeTimeout = undefined;
        }
    }
}

// Re-export types and constants for convenience
export { PopoverInteractionKind, PopoverPosition };
