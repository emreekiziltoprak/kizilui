

import type { Props } from "../../common/props";
import type { OverlayableProps, OverlayLifecycleProps } from "../overlay/overlayProps";
import { Position } from "../../common/position";

export const PopoverInteractionKind = {
    CLICK: "click" as const,
    CLICK_TARGET_ONLY: "click-target" as const,
    HOVER: "hover" as const,
    HOVER_TARGET_ONLY: "hover-target" as const,
};

export type PopoverInteractionKind = (typeof PopoverInteractionKind)[keyof typeof PopoverInteractionKind];

export const PopoverPosition = {
    ...Position,
    AUTO: "auto" as const,
    AUTO_END: "auto-end" as const,
    AUTO_START: "auto-start" as const,
    // Popper-style synonyms for convenience in stories / API parity
    TOP_START: "top-start" as const,
    TOP_END: "top-end" as const,
    BOTTOM_START: "bottom-start" as const,
    BOTTOM_END: "bottom-end" as const,
    LEFT_START: "left-start" as const,
    LEFT_END: "left-end" as const,
    RIGHT_START: "right-start" as const,
    RIGHT_END: "right-end" as const,
};

export type PopoverPosition = (typeof PopoverPosition)[keyof typeof PopoverPosition];

export interface PopoverTargetProps {
    /** Whether the popover or tooltip is open. */
    isOpen: boolean;
    
    /** Mouse event handlers for hover interaction. */
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    
    /** Click event handler for click interaction. */
    onClick?: React.MouseEventHandler<HTMLElement>;
    
    /** Focus and blur event handlers. */
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    
    /** Key event handlers. */
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    
    /** Tab index for keyboard navigation. */
    tabIndex?: number;
    
    /** ARIA attributes for accessibility. */
    "aria-haspopup"?: React.AriaAttributes["aria-haspopup"];
    "aria-expanded"?: React.AriaAttributes["aria-expanded"];
}

export interface DefaultPopoverTargetHTMLProps {
    "aria-haspopup": "true";
    className: string;
}

export interface PopoverSharedProps<TProps = DefaultPopoverTargetHTMLProps> extends OverlayableProps, OverlayLifecycleProps, Props {
    /**
     * Interactive trigger element that will trigger the popover when interacted with.
     * Element can be an interactive component like Button or AnchorButton.
     */
    children?: React.ReactNode;

    /**
     * The content displayed inside the popover. This can also be a function that
     * returns JSX content, useful for rendering content that depends on popover state.
     */
    content?: React.ReactNode | (() => React.ReactNode);

    /**
     * Initial opened state when uncontrolled.
     * @default false
     */
    defaultIsOpen?: boolean;

    /**
     * Prevents the popover from appearing when `true`.
     * @default false
     */
    disabled?: boolean;

    /**
     * The amount of time in milliseconds the popover should remain open after
     * the user hovers off the trigger. The timer is canceled if the user mouses
     * over the target again before it expires.
     * @default 300
     */
    hoverCloseDelay?: number;

    /**
     * The amount of time in milliseconds the popover should wait before opening
     * after the user hovers over the trigger.
     * @default 150
     */
    hoverOpenDelay?: number;

    /**
     * Whether a popover that overflows its container should automatically inherit
     * the dark theme of its parent.
     * @default true
     */
    inheritDarkTheme?: boolean;

    /**
     * The kind of interaction that triggers the display of the popover.
     * @default PopoverInteractionKind.CLICK
     */
    interactionKind?: PopoverInteractionKind;

    /**
     * Whether the popover is visible. Passing this prop puts the popover in
     * controlled mode, where the only way to change visibility is by updating this property.
     * If `disabled={true}`, this prop will be ignored, and the popover will never be displayed.
     * @default undefined
     */
    isOpen?: boolean;

    /**
     * Whether the popover/tooltip should be rendered with a minimal appearance.
     * Minimal popovers do not have an arrow pointing to their target and use
     * less visual emphasis in general.
     * @default false
     */
    minimal?: boolean;

    /**
     * Callback invoked in controlled mode when the popover open state *would* change due to
     * user interaction.
     */
    onInteraction?: (nextOpenState: boolean, event?: React.SyntheticEvent<HTMLElement>) => void;

    /**
     * A space-delimited string of class names to pass along to a child element.
     */
    popoverClassName?: string;

    /**
     * Ref supplied to the Classes.POPOVER element.
     */
    popoverRef?: React.Ref<HTMLDivElement>;

    /**
     * The placement (relative to the target) at which the popover should appear.
     * @default "auto"
     */
    placement?: PopoverPosition;

    /**
     * (Deprecated) The position (relative to the target) at which the popover should appear.
     * Use placement instead.
     * @deprecated use placement instead
     */
    position?: PopoverPosition;

    /**
     * Custom target renderer which receives target element props (including ref) and optional children.
     */
    renderTarget?: (props: {
        isOpen: boolean;
        ref: React.Ref<HTMLElement>;
        [key: string]: unknown;
    } & TProps) => JSX.Element;

    /**
     * HTML tag name for the target element. This should only be used when you're using the legacy
     * target string (deprecated behavior) or when you want to wrap the target in a different
     * HTML element.
     *
     * @default "span"
     */
    targetTagName?: keyof JSX.IntrinsicElements;

    /**
     * Indicates whether the popover should size itself to match the target's width.
     * @default false
     */
    matchTargetWidth?: boolean;

    /**
     * HTMLElement or a function that returns HTMLElement, used to determine the boundary of the
     * popover. By default, the viewport is used as boundary.
     */
    boundary?: HTMLElement | "scrollParent" | "viewport" | "window";

    /**
     * Whether to enable the flip modifier, which prevents popovers from being positioned outside the boundary.
     * @default true
     */
    flip?: boolean;

    /**
     * Array of modifier objects to extend or modify the behavior of Popper.js.
     */
    modifiers?: Array<{
        name: string;
        enabled?: boolean;
        phase?: "beforeRead" | "read" | "afterRead" | "beforeMain" | "main" | "afterMain" | "beforeWrite" | "write" | "afterWrite";
        options?: Record<string, unknown>;
    }>;

    /**
     * The positioning strategy to use for the popover.
     * @default "absolute"
     */
    strategy?: "absolute" | "fixed";

    /**
     * Whether a container-spanning backdrop element should be rendered behind the contents.
     * Defaults to false for popovers (unlike Overlay which defaults to true).
     * @default false
     */
    hasBackdrop?: boolean;

    /**
     * Whether clicking outside the popover element should close it.
     * @default true
     */
    canOutsideClickClose?: boolean;

    /**
     * Whether the popover should automatically take focus when opened.
     * @default true (false for hover interactions)
     */
    autoFocus?: boolean;

    /**
     * Whether the application should return focus to the last active element in the
     * document after this popover closes.
     * This is automatically disabled for controlled hover popovers.
     * @default false
     */
    shouldReturnFocusOnClose?: boolean;

    /**
     * Whether the overlay should prevent focus from leaving itself. That is, if the user
     * attempts to focus an element outside the overlay, focus will be returned to the overlay.
     * @default true (false for hover interactions)
     */
    enforceFocus?: boolean;

    /**
     * The HTML element to focus when the popover is opened. 
     * @default first focusable element inside popover
     */
    initialFocusElement?: HTMLElement | null;

    /**
     * Determines which element receives keyboard focus when the popover closes.
     * @default target element
     */
    finalFocusElement?: HTMLElement | null;

    /**
     * ARIA role for the popup. For most use cases, "menu" or "dialog" is appropriate.
     * @default "dialog"
     */
    popupKind?: "dialog" | "listbox" | "menu" | "tree" | "grid";
}

export interface PopoverProps extends PopoverSharedProps {
    /** HTML props for the backdrop element. Only rendered when `usePortal={false}`. */
    backdropProps?: React.HTMLProps<HTMLDivElement>;

    /**
     * Target element, or element which will open the popover on interaction.
     * Alternatively, you can define a target by passing it as the only child element of this component.
     */
    target?: React.ReactNode;
}
