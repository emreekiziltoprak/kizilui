

/**
 * Generic constructor interface.
 */
export interface Constructor<T = object> {
    new (...args: unknown[]): T;
}

/**
 * Abstract constructor interface.
 */
export interface AbstractConstructor<T = object> {
    prototype: T;
}