

import React from "react";

export function createIconPaths(pathsData: readonly string[]): JSX.Element[] {
  return pathsData.map((d, i) => <path key={i} d={d} fillRule="evenodd" />);
}


/**
 * Removes all non-HTML props from the given props object.
 * Use this function on props objects before passing to DOM elements.
 */
export function removeNonHTMLProps<T>(
    props: T & Record<string, unknown>,
    invalidProps: string[] = [],
    shouldMerge = false,
): T {
    const baseInvalidProps = [
        "active",
        "alignText",
        "fill",
        "icon",
        "intent",
        "large",
        "loading",
        "minimal",
        "outlined",
        "rightIcon",
        "small",
        "text",
    ];

    const propsToOmit = shouldMerge
        ? [...baseInvalidProps, ...invalidProps]
        : invalidProps;

    return omit(props, propsToOmit);
}

/**
 * Returns true if `node` is null/undefined, false, empty string, or an array
 * composed of those same things.
 */
export function isNodeEmpty(node?: React.ReactNode): boolean {
    return (
        node == null ||
        node === "" ||
        node === false ||
        (Array.isArray(node) && (node.length === 0 || node.every(isNodeEmpty)))
    );
}

/**
 * Converts a React child to a string. `null` and `undefined` will become the empty string.
 */
export function ensureElement(child: React.ReactChild | undefined, tagName = "span"): React.ReactElement {
    if (child == null) {
        return React.createElement(tagName);
    } else if (typeof child === "string" || typeof child === "number") {
        return React.createElement(tagName, {}, child);
    } else {
        return child;
    }
}

/**
 * Returns the displayed name of a React component.
 */
export function getDisplayName(ComponentClass: React.ComponentType): string {
    return ComponentClass.displayName || ComponentClass.name || "Unknown";
}

/**
 * Returns true if the given JSX element matches the given component type.
 *
 * NOTE: This function only checks equality of `displayName` for performance and
 * to tolerate multiple minor versions of the same component in one app.
 */
export function isElementOfType<P = object>(
    element: unknown,
    ComponentType: React.ComponentType<P>,
): element is React.ReactElement<P> {
    return (
        element != null &&
        element.type != null &&
        element.type.displayName != null &&
        element.type.displayName === ComponentType.displayName
    );
}

/**
 * Omit utility function
 */
export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj };
    keys.forEach(key => {
        delete result[key];
    });
    return result;
}