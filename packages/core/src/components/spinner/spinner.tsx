

import classNames from "classnames";
import { forwardRef } from "react";

import { Classes, intentClass } from "../../common";
import type { HTMLDivProps, Intent, Props } from "../../common/props";

export const SpinnerSize = {
    SMALL: 20,
    STANDARD: 50,
    LARGE: 100,
} as const;

export type SpinnerSize = (typeof SpinnerSize)[keyof typeof SpinnerSize];

export interface SpinnerProps extends Props, HTMLDivProps {
    /** Visual intent color to apply to element. */
    intent?: Intent;

    /** Width and height of the spinner in pixels. */
    size?: number | SpinnerSize;

    /** A value between 0 and 1 (inclusive) representing how far along the operation is. */
    value?: number;
}

/**
 * Spinner component
 */
export const Spinner: React.FC<SpinnerProps> = forwardRef<HTMLDivElement, SpinnerProps>((props, ref) => {
    const {
        className,
        intent,
        size = SpinnerSize.STANDARD,
        value,
        ...htmlProps
    } = props;

    const classes = classNames(
        Classes.SPINNER,
        intentClass(intent),
        className,
    );

    const style: React.CSSProperties = {
        width: size,
        height: size,
        ...htmlProps.style,
    };

    const trackPath = 2 * Math.PI * (size / 2 - 5); // circumference
    const strokeDasharray = value != null ? `${value * trackPath} ${trackPath}` : undefined;

    return (
        <div
            {...htmlProps}
            className={classes}
            ref={ref}
            style={style}
        >
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    className={Classes.SPINNER_TRACK}
                    cx={size / 2}
                    cy={size / 2}
                    r={size / 2 - 5}
                    fill="none"
                    strokeWidth="3"
                />
                <circle
                    className={Classes.SPINNER_HEAD}
                    cx={size / 2}
                    cy={size / 2}
                    r={size / 2 - 5}
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray={strokeDasharray}
                    style={value != null ? { strokeDasharray } : undefined}
                />
            </svg>
        </div>
    );
});

Spinner.displayName = "KizilUI.Spinner";