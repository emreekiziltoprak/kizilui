

import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { DISPLAYNAME_PREFIX } from "../../common/props";
import { isNodeEmpty } from "../../common/utils";
import type { PopoverProps } from "../popover/popoverProps";
import { ContextMenuPopover } from "./contextMenuPopover";
import type { ContextMenuPopoverOptions, Offset } from "./contextMenuShared";

export interface ContextMenuContentProps {
    /** Whether the context menu is open */
    isOpen: boolean;
    /** The offset position of the context menu */
    targetOffset: Offset;
    /** The original mouse event that triggered the context menu */
    mouseEvent?: React.MouseEvent<HTMLElement>;
}

export interface ContextMenuChildrenProps {
    /** CSS class name to apply to the context menu trigger element */
    className?: string;
    /** Props to pass to the context menu content */
    contentProps: ContextMenuContentProps;
    /** Context menu event handler */
    onContextMenu: React.MouseEventHandler<HTMLElement>;
    /** Popover element for advanced usage */
    popover?: React.ReactElement;
}

export interface ContextMenuProps extends ContextMenuPopoverOptions {
    /** Menu content. This is usually a `Menu` component or a render function. */
    content: React.ReactNode | ((props: ContextMenuContentProps) => React.ReactNode);

    /** 
     * Target element which will have the context menu attached.
     * Can be a render function that receives the context menu event handlers.
     */
    children?: React.ReactNode | ((props: ContextMenuChildrenProps) => React.ReactNode);

    /**
     * Prevents the context menu from appearing when `true`.
     * @default false
     */
    disabled?: boolean;

    /**
     * Callback invoked when the context menu is closed.
     */
    onClose?: () => void;

    /**
     * Callback invoked on right click. The callback can call `event.preventDefault()`
     * to prevent the default browser context menu. The callback can also return `false`
     * to prevent the context menu from appearing.
     */
    onContextMenu?: (event: React.MouseEvent<HTMLElement>) => void | boolean;

    /**
     * Additional props to pass to the context menu popover.
     */
    popoverProps?: Partial<PopoverProps>;

    /**
     * HTML tag name for the target element. 
     * This should only be used when you want to wrap the target in a different HTML element.
     * @default "span"
     */
    tagName?: keyof React.JSX.IntrinsicElements;
}

/**
 * ContextMenu component using modern React hooks and patterns.
 */
export const ContextMenu = forwardRef<HTMLElement, ContextMenuProps>((props, ref) => {
    const {
        children,
        content,
        disabled = false,
        onClose,
        onContextMenu: onContextMenuProp,
        popoverProps,
        tagName = "span",
        ...contextMenuOptions
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [offset, setOffset] = useState<Offset>({ left: 0, top: 0 });
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [mouseEvent, setMouseEvent] = useState<React.MouseEvent<HTMLElement>>();
    const targetRef = useRef<HTMLElement>(null);

    const detectDarkTheme = useCallback((element: Element): boolean => {
        let current: Element | null = element;
        while (current != null) {
            if (current.classList.contains("bp5-dark") || current.classList.contains("bp4-dark")) {
                return true;
            }
            current = current.parentElement;
        }
        return false;
    }, []);

    const handleContextMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        // Allow user to override context menu behavior
        if (onContextMenuProp) {
            const result = onContextMenuProp(event);
            if (result === false) {
                return;
            }
        }

        // Don't show context menu if disabled or no content
        if (disabled || isNodeEmpty(content)) {
            return;
        }

        // Prevent default browser context menu
        event.preventDefault();

        // Detect dark theme and set state
        const darkTheme = detectDarkTheme(event.currentTarget);
        setIsDarkTheme(darkTheme);
        setOffset({ left: event.clientX, top: event.clientY });
        setMouseEvent(event);
        setIsOpen(true);
    }, [content, disabled, onContextMenuProp, detectDarkTheme]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        onClose?.();
    }, [onClose]);

    // Handle refs properly
    const handleRef = useCallback((node: HTMLElement | null) => {
        if (targetRef.current !== node) {
            targetRef.current = node;
        }
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            ref.current = node;
        }
    }, [ref]);

    const contentProps: ContextMenuContentProps = useMemo(() => ({
        isOpen,
        targetOffset: offset,
        mouseEvent,
    }), [isOpen, offset, mouseEvent]);

    const contextMenu = useMemo(() => {
        if (!isOpen || isNodeEmpty(content)) {
            return null;
        }

        const resolvedContent = typeof content === "function" ? content(contentProps) : content;

        return (
            <ContextMenuPopover
                {...contextMenuOptions}
                {...popoverProps}
                content={resolvedContent}
                isOpen={isOpen}
                targetOffset={offset}
                onClose={handleClose}
            />
        );
    }, [isOpen, content, contentProps, contextMenuOptions, popoverProps, offset, handleClose]);

    const childProps: ContextMenuChildrenProps = useMemo(() => ({
        className: undefined,
        contentProps,
        onContextMenu: handleContextMenu,
        popover: contextMenu as React.ReactElement,
    }), [contentProps, handleContextMenu, contextMenu]);

    if (disabled) {
        return <>{children}</>;
    }

    if (typeof children === "function") {
        return (
            <>
                {children(childProps)}
                {contextMenu}
            </>
        );
    }

    const TargetTagName = tagName as React.ElementType;
    
    return (
        <>
            {React.isValidElement(children) ? (
                React.cloneElement(children, {
                    onContextMenu: handleContextMenu,
                    ref: handleRef,
                } as React.HTMLAttributes<HTMLElement>)
            ) : (
                <TargetTagName
                    onContextMenu={handleContextMenu}
                    ref={handleRef}
                >
                    {children}
                </TargetTagName>
            )}
            {contextMenu}
        </>
    );
});

ContextMenu.displayName = `${DISPLAYNAME_PREFIX}.ContextMenu`;

export { showContextMenu, hideContextMenu } from "./contextMenuSingleton";