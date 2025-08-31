

import type { OverlayLifecycleProps } from "../overlay/overlayProps";
import type { PopoverPosition } from "../popover/popoverProps";

export interface Offset {
    left: number;
    top: number;
}

/**
 * Context menu popover options.
 * For most use cases, we recommend not changing the `placement` because
 * the context menu placement is normally controlled by mouse position.
 */
export interface ContextMenuPopoverOptions
    extends Pick<OverlayLifecycleProps, "onOpened" | "onOpening" | "onClosed" | "onClosing"> {
    /**
     * CSS class names to apply to backdrop element.
     */
    backdropClassName?: string;

    /**
     * CSS class names to apply to the popover element.
     */
    className?: string;

    /**
     * The position (relative to the target) at which the context menu should appear.
     * @default "right-start"
     */
    placement?: PopoverPosition;

    /**
     * Space-delimited string of class names applied to the popover element.
     */
    popoverClassName?: string;

    /**
     * Indicates how long (in milliseconds) the overlay's enter/leave transition takes.
     * This is used by React `CSSTransition` to know when a transition completes and must match
     * the duration of the animation in CSS. Only set this prop if you override  default
     * transitions with new transitions of a different length.
     * @default 300
     */
    transitionDuration?: number;
}