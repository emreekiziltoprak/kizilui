

import type { Props } from "../../common/props";

export interface OverlayLifecycleProps {
    /**
     * Lifecycle method invoked just before the CSS _close_ transition begins.
     * Receives the DOM element of the child being closed.
     */
    onClosing?: (node: HTMLElement) => void;

    /**
     * Lifecycle method invoked just after the CSS _close_ transition ends.
     * Receives the DOM element of the child being closed.
     */
    onClosed?: (node: HTMLElement) => void;

    /**
     * Lifecycle method invoked just after the CSS _open_ transition ends.
     * Receives the DOM element of the child being opened.
     */
    onOpened?: (node: HTMLElement) => void;

    /**
     * Lifecycle method invoked just before the CSS _open_ transition begins.
     * Receives the DOM element of the child being opened.
     */
    onOpening?: (node: HTMLElement) => void;
}

export interface OverlayableProps extends OverlayLifecycleProps {
    /**
     * Whether the overlay should acquire application focus when it first opens.
     * @default true
     */
    autoFocus?: boolean;

    /**
     * Whether pressing the `esc` key should invoke `onClose`.
     * @default true
     */
    canEscapeKeyClose?: boolean;

    /**
     * Whether the overlay should prevent focus from leaving itself. That is, if the user attempts
     * to focus an element outside the overlay and this prop is enabled, then the overlay will
     * immediately focus itself.
     * @default true
     */
    enforceFocus?: boolean;

    /**
     * If `true` and `usePortal={true}`, the `Portal` containing the children is created and attached
     * to the DOM when the overlay is opened for the first time; otherwise this happens when the
     * component mounts. Lazy mounting provides noticeable performance improvements if you have lots
     * of overlays at once, such as on each row of a table.
     * @default true
     */
    lazy?: boolean;

    /**
     * Indicates how long (in milliseconds) the overlay's enter/leave transition takes.
     * This is used by React `CSSTransition` to know when a transition completes and must match
     * the duration of the animation in CSS. Only set this prop if you override default
     * transitions with new transitions of a different length.
     * @default 300
     */
    transitionDuration?: number;

    /**
     * Whether the overlay should be rendered inside a `Portal` attached to
     * `portalContainer` prop.
     * @default true
     */
    usePortal?: boolean;

    /** 
     * Space-delimited string of class names applied to the `Portal` element if
     * `usePortal={true}`.
     */
    portalClassName?: string;

    /**
     * The container element into which the overlay renders its contents, when `usePortal` is `true`.
     * This prop is ignored if `usePortal` is `false`.
     * @default document.body
     */
    portalContainer?: HTMLElement;
}

export interface BackdropProps {
    /**
     * CSS class names to apply to backdrop element.
     */
    backdropClassName?: string;

    /**
     * HTML props for the backdrop element.
     */
    backdropProps?: React.HTMLProps<HTMLDivElement>;

    /**
     * Whether clicking outside the overlay element (either on backdrop when present or on document)
     * should invoke `onClose`.
     * @default true
     */
    canOutsideClickClose?: boolean;

    /**
     * Whether a container-spanning backdrop element should be rendered behind the contents.
     * @default true
     */
    hasBackdrop?: boolean;
}

export interface OverlayProps extends OverlayableProps, BackdropProps, Props {
    /**
     * Toggles the visibility of the overlay and its children.
     * This prop is required because the component is controlled.
     */
    isOpen: boolean;

    /**
     * A callback that is invoked when user interaction causes the overlay to close,
     * such as clicking on the overlay or pressing the `esc` key (if enabled).
     *
     * Receives the event from the user's interaction, if there was an event (generally either a
     * mouse or key event). Note that, since this component is controlled by the `isOpen` prop, it
     * will not actually close itself until that prop becomes `false`.
     */
    onClose?: (event?: React.SyntheticEvent<HTMLElement>) => void;
}