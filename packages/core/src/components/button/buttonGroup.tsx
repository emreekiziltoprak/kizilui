

import classNames from "classnames";
import { forwardRef } from "react";

import { alignmentClass, Classes } from "../../common";
import type { Alignment } from "../../common/alignment";
import { DISPLAYNAME_PREFIX, type HTMLDivProps, type Props } from "../../common/props";

export interface ButtonGroupProps extends Props, HTMLDivProps, React.RefAttributes<HTMLDivElement> {
    /**
     * Text alignment within button. By default, icons and text will be centered
     * within the button. Passing `"start"` or `"end"` will align the button
     * text to that side and push `icon` and `endIcon` to either edge. Passing
     * `"center"` will center the text and icons together.
     */
    alignText?: Alignment;

    /** Buttons in this group. */
    children: React.ReactNode;

    /**
     * Whether the button group should take up the full width of its container.
     *
     * @default false
     */
    fill?: boolean;

    /**
     * Whether the child buttons should appear with minimal styling.
     *
     * @deprecated use individual button `minimal` prop instead
     * @default false
     */
    minimal?: boolean;

    /**
     * Whether the child buttons should use outlined styles.
     *
     * @deprecated use individual button `outlined` prop instead
     * @default false
     */
    outlined?: boolean;

    /**
     * Whether the child buttons should be large.
     *
     * @deprecated use individual button `large` prop instead
     * @default false
     */
    large?: boolean;

    /**
     * Whether the child buttons should be small.
     *
     * @deprecated use individual button `small` prop instead
     * @default false
     */
    small?: boolean;

    /**
     * Whether the button group should appear with vertical styling.
     *
     * @default false
     */
    vertical?: boolean;
}

/**
 * Button group component.
 *
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = forwardRef<HTMLDivElement, ButtonGroupProps>((props, ref) => {
    const {
        alignText,
        className,
        fill = false,
        minimal = false,
        outlined = false,
        large = false,
        small = false,
        vertical = false,
        ...htmlProps
    } = props;

    const classes = classNames(
        Classes.BUTTON_GROUP,
        {
            [Classes.FILL]: fill,
            [Classes.MINIMAL]: minimal,
            [Classes.OUTLINED]: outlined,
            [Classes.LARGE]: large,
            [Classes.SMALL]: small,
            [Classes.VERTICAL]: vertical,
        },
        alignmentClass(alignText),
        className,
    );

    return (
        <div {...htmlProps} className={classes} ref={ref} />
    );
});

ButtonGroup.displayName = `${DISPLAYNAME_PREFIX}.ButtonGroup`;