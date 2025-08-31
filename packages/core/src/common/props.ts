

import type { Intent } from "./intent";

export const DISPLAYNAME_PREFIX = "KizilUI";

/**
 * Alias for all valid HTML props for `<div>` element.
 * Does not include React's `ref` or `key`.
 */
export type HTMLDivProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Alias for all valid HTML props for `<input>` element.
 * Does not include React's `ref` or `key`.
 */
export type HTMLInputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Alias for all valid HTML props for `<textarea>` element.
 * Does not include React's `ref` or `key`.
 */
export type HTMLTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Alias for a `React.JSX.Element` or a value that renders nothing.
 *
 * In React, `boolean`, `null`, and `undefined` do not produce any output.
 */
export type MaybeElement = React.JSX.Element | false | null | undefined;

/**
 * A shared base interface for all component props.
 */
export interface Props {
    /** A space-delimited list of class names to pass along to a child element. */
    className?: string;
}

/**
 * Interface for all  components to include an optional `intent` prop.
 */
export interface IntentProps {
    /** Visual intent color to apply to element. */
    intent?: Intent;
}

/**
 * Interface for all components to include an optional `icon` prop.
 */
export interface IconProps {
    /** Name of a UI icon, or an icon element, to render before the text. */
    icon?: string | React.JSX.Element;
}

/**
 * Interface for components that can be disabled.
 */
export interface Disabled {
    /** Whether this component is non-interactive. */
    disabled?: boolean;
}

/**
 * Interface for components that can show a loading state.
 */
export interface Loading {
    /** Whether this component should show a loading spinner. */
    loading?: boolean;
}

/**
 * Interface for components that can be made "active" (pressed, opened, selected, etc.).
 */
export interface Active {
    /** Whether this component is active/selected/opened. */
    active?: boolean;
}

/**
 * An interface for an action supported by a component.
 * Actions are typically rendered as buttons or menu items.
 */
export interface ActionProps extends IntentProps, IconProps, Props {
    /** Whether this action is disabled. */
    disabled?: boolean;
    /** Click event handler. */
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    /** Action text. Can be any renderable content. */
    text?: React.ReactNode;
    /** Action title text, for button `title` attribute. */
    title?: string;
}

/**
 * Interface for components which accept arbitrary key-value pairs.
 * Consumers should extend this interface to define their own props.
 */
export interface ControlledProps {
    /** Initial value of the input, for uncontrolled usage. */
    defaultValue?: string;
    /** Form input name attribute. */
    name?: string;
    /** Callback invoked when user changes the input (in controlled mode). */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /** Input value, for controlled usage. */
    value?: string;
}