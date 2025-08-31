

import type { PopoverSharedProps, PopoverPosition } from "../popover/popoverProps";

export interface TooltipProps extends Omit<PopoverSharedProps, "content" | "interactionKind"> {
    /**
     * The content that will be displayed inside of the tooltip.
     */
    content: React.ReactNode;

    /**
     * Whether to use compact styles which reduce the tooltip's padding.
     * @default false
     */
    compact?: boolean;

    /**
     * The position (relative to the target) at which the tooltip should appear.
     * @default "top"
     */
    placement?: PopoverPosition;
}