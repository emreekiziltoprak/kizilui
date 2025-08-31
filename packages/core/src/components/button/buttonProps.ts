

import type { ActionProps } from "../../common/props";
import type { Alignment } from "../../common/alignment";
import type { MaybeElement } from "../../common/props";

export interface ButtonSharedProps extends ActionProps {
    /**
     * If set to `true`, the button will display in an active state.
     * This is equivalent to setting `className={Classes.ACTIVE}`.
     *
     * @default false
     */
    active?: boolean;

    /**
     * Text alignment within button. By default, icons and text will be centered
     * within the button. Passing `"start"` or `"end"` will align the button
     * text to that side and push `icon` and `endIcon` to either edge. Passing
     * `"center"` will center the text and icons together.
     *
     * @default Alignment.CENTER
     */
    alignText?: Alignment;

    /** Button contents. */
    children?: React.ReactNode;

    /**
     * If set to `true`, the button text element will hide overflow text that does not fit into a
     * single line and show a trailing ellipsis, similar to the `Text` component.
     *
     * @default false
     */
    ellipsizeText?: boolean;

    /** Name of an icon or an icon element to render after the text. */
    rightIcon?: string | MaybeElement;

    /**
     * Whether the button should take up the full width of its container.
     *
     * @default false
     */
    fill?: boolean;

    /**
     * Whether this button should use large styles.
     *
     * @default false
     */
    large?: boolean;

    /**
     * If set to `true`, the button will display a centered loading spinner instead of its contents.
     * The width of the button is not affected by the value of this prop.
     *
     * @default false
     */
    loading?: boolean;

    /**
     * Whether this button should use minimal styles.
     *
     * @default false
     */
    minimal?: boolean;

    /**
     * Whether this button should use outlined styles.
     *
     * @default false
     */
    outlined?: boolean;

    /**
     * Whether this button should use small styles.
     *
     * @default false
     */
    small?: boolean;

    /**
     * HTML `type` attribute of button. Accepted values are `"button"`, `"submit"`, and `"reset"`.
     * Note that this prop has no effect on `AnchorButton`; it only affects `Button`.
     *
     * @default "button"
     */
    type?: "submit" | "reset" | "button";
}

export type ButtonProps = ButtonSharedProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type AnchorButtonProps = ButtonSharedProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        /** Href attribute for the anchor. */
        href?: string;
        /** Target attribute for the anchor. */
        target?: string;
    };