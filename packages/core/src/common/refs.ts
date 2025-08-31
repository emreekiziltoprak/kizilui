

export function isRefObject<T>(value: React.Ref<T> | undefined): value is React.RefObject<T> {
    return value != null && typeof value !== "function";
}

export function isRefCallback<T>(value: React.Ref<T> | undefined): value is React.RefCallback<T> {
    return typeof value === "function";
}

/**
 * Assign the given ref to a target, either a React ref object or a callback which takes the ref as its first argument.
 */
export function setRef<T>(refTarget: React.Ref<T> | undefined, ref: T | null): void {
    if (isRefObject<T>(refTarget)) {
        // HACKHACK: .current property is readonly
        (refTarget.current as T | null) = ref;
    } else if (isRefCallback(refTarget)) {
        refTarget(ref);
    }
}

/**
 * Utility for merging refs into one singular callback ref.
 * If using in a functional component, would recomend using `useMemo` to preserve function identity.
 */
export function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
    return value => {
        refs.forEach(ref => {
            setRef(ref, value);
        });
    };
}