

import classNames from "classnames";
import React from "react";

import { Classes } from "../../common";
import { DISPLAYNAME_PREFIX } from "../../common/props";
import { Popover } from "../popover/popover";
import type { PopoverProps } from "../popover/popoverProps";
import type { ContextMenuPopoverOptions, Offset } from "./contextMenuShared";

export interface ContextMenuPopoverProps extends ContextMenuPopoverOptions {
    /** Menu content. This is usually a `Menu` component. */
    content: React.ReactNode;

    /** Target element position. */
    targetOffset: Offset;

    /** Whether the popover is visible. */
    isOpen?: boolean;

    /** Callback invoked when the popover requests to be closed. */
    onClose?: () => void;

    /** Additional props to pass to the underlying Popover. */
    popoverProps?: Partial<PopoverProps>;
}

/**
 * ContextMenuPopover component.
 * This is an internal component used by ContextMenu.
 */
export const ContextMenuPopover: React.FC<ContextMenuPopoverProps> = (props) => {
    const {
        backdropClassName,
        className,
        content,
        isOpen = false,
        onClose,
        onClosed,
        onClosing,
        onOpened,
        onOpening,
        placement = "right-start",
        popoverClassName,
        popoverProps = {},
        targetOffset,
        transitionDuration = 300,
    } = props;

    const classes = classNames(Classes.CONTEXT_MENU, className);

    // Create a virtual target element at the offset position
    const targetElement = React.useMemo(() => {
        if (typeof document === "undefined") {
            return null;
        }

        const element = document.createElement("div");
        element.style.position = "absolute";
        element.style.left = `${targetOffset.left}px`;
        element.style.top = `${targetOffset.top}px`;
        element.style.width = "1px";
        element.style.height = "1px";
        element.style.pointerEvents = "none";
        element.style.visibility = "hidden";
        
        if (isOpen) {
            document.body.appendChild(element);
        }

        return element;
    }, [targetOffset.left, targetOffset.top, isOpen]);

    React.useEffect(() => {
        return () => {
            if (targetElement && targetElement.parentNode) {
                targetElement.parentNode.removeChild(targetElement);
            }
        };
    }, [targetElement]);

    if (!targetElement) {
        return null;
    }

    return (
        <Popover
            backdropProps={{ className: backdropClassName }}
            className={classes}
            content={content}
            hasBackdrop={false}
            interactionKind="click"
            isOpen={isOpen}
            minimal
            onClose={onClose}
            onClosed={onClosed}
            onClosing={onClosing}
            onOpened={onOpened}
            onOpening={onOpening}
            placement={placement}
            popoverClassName={popoverClassName}
            target={targetElement}
            transitionDuration={transitionDuration}
            usePortal
            {...popoverProps}
        />
    );
};

ContextMenuPopover.displayName = `${DISPLAYNAME_PREFIX}.ContextMenuPopover`;