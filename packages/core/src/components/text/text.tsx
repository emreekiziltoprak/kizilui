

import classNames from "classnames";
import { forwardRef, useLayoutEffect, useRef, useState } from "react";

import { Classes } from "../../common";
import type { HTMLDivProps, Props } from "../../common/props";

export interface TextProps extends Props, HTMLDivProps {
    /** 
     * Indicates that this component should be truncated with an ellipsis if it overflows its container.
     * @default false
     */
    ellipsize?: boolean;

    /**
     * HTML tag name to use for rendered element.
     * @default "div"
     */
    tagName?: keyof React.JSX.IntrinsicElements;
}

/**
 * Text component
 */
export const Text: React.FC<TextProps> = forwardRef<HTMLElement, TextProps>((props, ref) => {
    const {
        children,
        className,
        ellipsize = false,
        tagName: TagName = "div",
        title,
        ...htmlProps
    } = props;

    const textRef = useRef<HTMLElement>(null);
    const [isContentOverflowing, setIsContentOverflowing] = useState(false);

    // Merge refs
    const mergedRef = (node: HTMLElement | null) => {
        if (textRef.current) {
            textRef.current = node;
        }
        if (typeof ref === "function") {
            ref(node);
        } else if (ref) {
            ref.current = node;
        }
    };

    useLayoutEffect(() => {
        if (ellipsize && textRef.current != null) {
            const isOverflowing = textRef.current.scrollWidth > textRef.current.clientWidth;
            setIsContentOverflowing(isOverflowing);
        }
    }, [ellipsize]);

    const classes = classNames(
        Classes.TEXT,
        {
            [Classes.TEXT_OVERFLOW_ELLIPSIS]: ellipsize,
        },
        className,
    );

    const textTitle = ellipsize && isContentOverflowing && title == null
        ? (typeof children === "string" ? children : undefined)
        : title;

    return (
        <TagName
            {...htmlProps}
            className={classes}
            ref={mergedRef}
            title={textTitle}
        >
            {children}
        </TagName>
    );
});

Text.displayName = "KizilUI.Text";