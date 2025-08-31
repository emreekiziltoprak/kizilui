

import classNames from "classnames";
import React, { type ReactElement } from "react";

import { Classes } from "../../common";
import { DISPLAYNAME_PREFIX } from "../../common/props";
import { isNodeEmpty } from "../../common/utils";
import { Popover } from "../popover/popover";
import { PopoverInteractionKind } from "../popover/popoverProps";
import type { TooltipProps } from "./tooltipProps";

export interface TooltipState {
    isOpen: boolean;
    hasDarkParent: boolean;
}

/**
 * Tooltip component.
 *
 */
export class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {
    public static displayName = `${DISPLAYNAME_PREFIX}.Tooltip`;

    public static defaultProps: Partial<TooltipProps> = {
        compact: false,
        hoverCloseDelay: 0,
        hoverOpenDelay: 100,
        inheritDarkTheme: true,
        minimal: false,
        placement: "top",
        transitionDuration: 100,
        usePortal: true,
    };

    public state: TooltipState = {
        isOpen: this.props.defaultIsOpen || false,
        hasDarkParent: false,
    };

    private popoverRef = React.createRef<Popover>();

    public render(): ReactElement<HTMLElement> {
        const { children, content, disabled } = this.props;
        
        if (disabled || isNodeEmpty(content)) {
            return <>{children}</>;
        }

        return (
            <Popover
                {...this.props}
                autoFocus={false}
                canEscapeKeyClose={false}
                canOutsideClickClose={false}
                className={classNames(Classes.TOOLTIP, this.props.className)}
                content={this.renderTooltipContent()}
                enforceFocus={false}
                hasBackdrop={false}
                interactionKind={PopoverInteractionKind.HOVER_TARGET_ONLY}
                lazy={false}
                minimal={this.props.minimal}
                onClosed={this.props.onClosed}
                onClosing={this.props.onClosing}
                onOpened={this.handlePopoverOpened}
                onOpening={this.props.onOpening}
                ref={this.popoverRef}
                targetTagName="span"
            >
                {children}
            </Popover>
        );
    }

    public reposition() {
        if (this.popoverRef.current != null) {
            this.popoverRef.current.reposition?.();
        }
    }

    private renderTooltipContent() {
        const { content, compact } = this.props;
        
        return (
            <div
                className={classNames(
                    Classes.TOOLTIP_CONTENT,
                    {
                        [Classes.TOOLTIP_CONTENT_COMPACT]: compact,
                    },
                )}
            >
                {content}
            </div>
        );
    }

    private handlePopoverOpened = (node: HTMLElement) => {
        this.props.onOpened?.(node);
        
        // Detect dark theme from the popover's position in DOM
        if (node != null) {
            const hasDarkParent = this.detectDarkTheme(node);
            if (hasDarkParent !== this.state.hasDarkParent) {
                this.setState({ hasDarkParent });
            }
        }
    };

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
}