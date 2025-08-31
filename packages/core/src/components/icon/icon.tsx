

import classNames from "classnames";
import { forwardRef } from "react";

import { Classes, intentClass } from "../../common";
import type { HTMLDivProps, Intent, MaybeElement, Props } from "../../common/props";

export type IconName = string;

export const IconSize = {
    STANDARD: 16,
    LARGE: 20,
} as const;

export type IconSize = (typeof IconSize)[keyof typeof IconSize];

export interface IconProps extends Props, Omit<HTMLDivProps, "title"> {
    icon?: IconName | MaybeElement;

    /** Visual intent color to apply to element. */
    intent?: Intent;

    /** 
     * Pixel size of the icon. 
     * @default IconSize.STANDARD (16px)
     */
    size?: number | IconSize;

    /** Description string for the icon. */
    title?: string;

    /** HTML tag name to use for rendered element. */
    tagName?: keyof React.JSX.IntrinsicElements;
}

/**
 * Icon component
 */
export const Icon: React.FC<IconProps> = forwardRef<HTMLElement, IconProps>((props, ref) => {
    const {
        className,
        icon,
        intent,
        size = IconSize.STANDARD,
        tagName: TagName = "span",
        title,
        ...htmlProps
    } = props;

    if (icon == null) {
        return null;
    }

    if (typeof icon !== "string") {
        return icon;
    }

    const classes = classNames(
        Classes.ICON,
        {
            [`${Classes.ICON}-${size}`]: typeof size === "number",
        },
        intentClass(intent),
        className,
    );

    const pixelSize = typeof size === "number" ? size : size;

    return (
        <TagName
            {...htmlProps}
            className={classes}
            ref={ref as React.Ref<HTMLElement>}
            style={{
                width: pixelSize,
                height: pixelSize,
                fontSize: pixelSize,
                lineHeight: 1,
                ...htmlProps.style,
            }}
            title={title}
        >
            {/* For now, render as text. In a real implementation, this would be SVG icons */}
            {icon}
        </TagName>
    );
});

Icon.displayName = "KizilUI.Icon";