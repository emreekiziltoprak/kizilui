

import { useMemo } from "react";

export interface UseInteractiveAttributesOptions {
    disabled?: boolean;
    loading?: boolean;
}

/**
 * Hook to provide interactive attributes for elements
 */
export function useInteractiveAttributes(
    options: UseInteractiveAttributesOptions,
    ref?: React.Ref<HTMLElement>
): React.HTMLAttributes<HTMLElement> {
    return useMemo(() => {
        const { disabled = false, loading = false } = options;

        return {
            "aria-disabled": disabled || loading,
            ref,
        };
    }, [options, ref]);
}