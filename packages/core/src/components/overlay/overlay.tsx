

import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Classes } from "../../common";
import type { HTMLDivProps } from "../../common/props";
import type { OverlayProps } from "./overlayProps";

export interface OverlayState {
    hasEverOpened: boolean;
}

/**
 * Overlay component.
 *
 */
export function Overlay(props: OverlayProps & HTMLDivProps) {
    const {
        autoFocus = true,
        backdropClassName,
        backdropProps,
        canEscapeKeyClose = true,
        canOutsideClickClose = true,
        children,
        className,
        _enforceFocus = true,
        hasBackdrop = true,
        isOpen,
        lazy = true,
        onClose,
        onClosed,
        onClosing,
        onOpened,
        onOpening,
        portalClassName,
        portalContainer = typeof document !== "undefined" ? document.body : undefined,
        transitionDuration = 300,
        usePortal = true,
        ...htmlProps
    } = props;

    const [hasEverOpened, setHasEverOpened] = useState(!lazy);
    const containerRef = useRef<HTMLDivElement>(null);
    const prevIsOpenRef = useRef<boolean>(isOpen);

    // Track if overlay has ever been opened for lazy mounting
    useEffect(() => {
        if (isOpen && !hasEverOpened) {
            setHasEverOpened(true);
        }
    }, [isOpen, hasEverOpened]);

    // Fire lifecycle: opening/closing/closed
    useEffect(() => {
        const prevIsOpen = prevIsOpenRef.current;
        if (isOpen && !prevIsOpen) {
            // before open transition starts
            onOpening?.(containerRef.current as HTMLElement);
        } else if (!isOpen && prevIsOpen) {
            // before close transition starts
            onClosing?.(containerRef.current as HTMLElement);
            const id = window.setTimeout(() => {
                onClosed?.(containerRef.current as HTMLElement);
            }, transitionDuration);
            return () => window.clearTimeout(id);
        }
        prevIsOpenRef.current = isOpen;
    }, [isOpen, onOpening, onClosing, onClosed, transitionDuration]);

    // After open
    useEffect(() => {
        if (!isOpen) return;
        const id = window.setTimeout(() => onOpened?.(containerRef.current as HTMLElement), 0);
        return () => window.clearTimeout(id);
    }, [isOpen, onOpened]);

    // Handle ESC key
    useEffect(() => {
        if (!isOpen || !canEscapeKeyClose) return;

        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose?.(e as React.SyntheticEvent<HTMLElement, KeyboardEvent>);
            }
        };

        document.addEventListener("keydown", handleKeydown);
        return () => document.removeEventListener("keydown", handleKeydown);
    }, [isOpen, canEscapeKeyClose, onClose]);

    // Handle outside click
    useEffect(() => {
        if (!isOpen || !canOutsideClickClose) return;

        const handleMouseDown = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                onClose?.(e as React.SyntheticEvent<HTMLElement, MouseEvent>);
            }
        };

        document.addEventListener("mousedown", handleMouseDown);
        return () => document.removeEventListener("mousedown", handleMouseDown);
    }, [isOpen, canOutsideClickClose, onClose]);

    // Focus management
    useEffect(() => {
        if (!isOpen || !autoFocus || !containerRef.current) return;

        const focusableElement = containerRef.current.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        
        if (focusableElement) {
            focusableElement.focus();
        } else {
            containerRef.current.focus();
        }
    }, [isOpen, autoFocus]);

    if (!hasEverOpened) {
        return null;
    }

    const overlayClasses = classNames(
        Classes.OVERLAY,
        {
            [Classes.OVERLAY_OPEN]: isOpen,
        },
        className,
    );

    const backdropClasses = classNames(
        Classes.OVERLAY_BACKDROP,
        backdropClassName,
    );

    const content = (
        <div
            {...htmlProps}
            className={overlayClasses}
            style={{ 
                display: isOpen ? "flex" : "none",
                // Do not intercept pointer events when there is no backdrop; allow hovering target beneath
                pointerEvents: hasBackdrop ? "auto" : "none",
                ...htmlProps.style 
            }}
        >
            {hasBackdrop && (
                <div
                    {...backdropProps}
                    className={backdropClasses}
                    tabIndex={-1}
                />
            )}
            <div
                className={Classes.OVERLAY_CONTENT}
                ref={containerRef}
                tabIndex={-1}
                style={{ pointerEvents: "auto" }}
            >
                {children}
            </div>
        </div>
    );

    if (usePortal && portalContainer) {
        return createPortal(
            <div className={portalClassName}>
                {content}
            </div>,
            portalContainer
        );
    }

    return content;
}

Overlay.displayName = "KizilUI.Overlay";
