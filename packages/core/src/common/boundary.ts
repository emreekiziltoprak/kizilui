

/** Boundary of a one-dimensional interval. */
export const Boundary = {
    START: "start" as const,
    /* eslint-disable-next-line sort-keys */
    END: "end" as const,
};
export type Boundary = (typeof Boundary)[keyof typeof Boundary];