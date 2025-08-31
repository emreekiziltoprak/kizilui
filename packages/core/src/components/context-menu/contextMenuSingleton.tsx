

import React from "react";
import { createRoot, type Root } from "react-dom/client";

import { ContextMenuPopover } from "./contextMenuPopover";
import type { ContextMenuPopoverOptions, Offset } from "./contextMenuShared";

export interface ShowContextMenuOptions extends ContextMenuPopoverOptions {
    /**
     * Menu content. This is usually a `Menu` component.
     */
    content: React.ReactNode;

    /**
     * Callback invoked when the context menu is closed.
     */
    onClose?: () => void;
}

let contextMenuState: {
    root?: Root;
    element?: HTMLElement;
} = {};

/**
 * Show a context menu at the given offset from the top-left corner of the document.
 * The menu will appear below-right of this point and will flip to below-left if there is not
 * enough room onscreen. Additional options allow customization of the menu.
 */
export function showContextMenu(
    options: ShowContextMenuOptions,
    offset: Offset,
    onClose?: () => void,
    isDarkTheme?: boolean,
): void {
    const { content, ...contextMenuOptions } = options;

    const element = document.createElement("div");
    element.className = isDarkTheme ? "bp5-dark" : "";
    document.body.appendChild(element);

    const root = createRoot(element);

    const handleClose = () => {
        hideContextMenu();
        onClose?.();
        options.onClose?.();
    };

    root.render(
        <ContextMenuPopover
            {...contextMenuOptions}
            content={content}
            targetOffset={offset}
            isOpen
            onClose={handleClose}
        />,
    );

    contextMenuState = { root, element };
}

/**
 * Hide the currently open context menu, if any.
 */
export function hideContextMenu(): void {
    if (contextMenuState.root != null) {
        contextMenuState.root.unmount();
        contextMenuState.root = undefined;
    }

    if (contextMenuState.element != null) {
        document.body.removeChild(contextMenuState.element);
        contextMenuState.element = undefined;
    }
}

// Hide context menu when clicking outside or pressing escape
if (typeof document !== "undefined") {
    document.addEventListener("mousedown", (e) => {
        // Only hide if clicking outside the context menu
        if (contextMenuState.element && !contextMenuState.element.contains(e.target as Node)) {
            hideContextMenu();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            hideContextMenu();
        }
    });
}