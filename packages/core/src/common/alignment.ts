

/** Alignment along the horizontal axis. */
export const Alignment = {
    CENTER: "center" as const,
    END: "end" as const,
    /**
     * @deprecated use `Alignment.START` instead.
     */
    LEFT: "left" as const,
    /**
     * @deprecated use `Alignment.END` instead.
     */
    RIGHT: "right" as const,
    START: "start" as const,
};
export type Alignment = (typeof Alignment)[keyof typeof Alignment];

export const TextAlignment = {
    CENTER: "center" as const,
    END: "end" as const,
    START: "start" as const,
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type TextAlignment = (typeof TextAlignment)[keyof typeof TextAlignment];