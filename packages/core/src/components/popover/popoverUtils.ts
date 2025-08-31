

import type { PopoverPosition } from "./popoverProps";

export interface PopoverPlacement {
    position: PopoverPosition;
    offset: {
        top: number;
        left: number;
    };
    arrowOffset?: {
        top: number;
        left: number;
    };
}

// should match SCSS arrow triangle size (see _popover.scss ::before/::after border widths)
const ARROW_SIZE = 14;
const ARROW_OFFSET = 8;
const POPOVER_MARGIN = 6;

/**
 * Calculates the position for a popover relative to its target element.
 * This implementation mimics Popper.js behavior used.
 */
export function calculatePopoverPosition(
    target: HTMLElement,
    popover: HTMLElement,
    preferredPosition: PopoverPosition = "auto",
    flip: boolean = true,
    boundary: HTMLElement | string = "viewport"
): PopoverPlacement {
    const targetRect = target.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();

    // Get boundary dimensions  
    const boundaryRect = getBoundaryRect(boundary);

    let finalPosition = normalizePosition(preferredPosition);
    
    // Handle auto positioning
    if (preferredPosition === "auto" || preferredPosition === "auto-start" || preferredPosition === "auto-end") {
        finalPosition = getBestAutoPosition(targetRect, popoverRect, boundaryRect, preferredPosition);
    }
    
    // Calculate position
    let placement = calculatePlacement(targetRect, popoverRect, finalPosition as Exclude<PopoverPosition, "auto" | "auto-start" | "auto-end">);
    
    // Apply flip logic if enabled
    if (flip && !isWithinBounds(placement, popoverRect, boundaryRect)) {
        const flippedPosition = getFlippedPosition(finalPosition as Exclude<PopoverPosition, "auto" | "auto-start" | "auto-end">);
        const flippedPlacement = calculatePlacement(targetRect, popoverRect, flippedPosition);
        
        if (isWithinBounds(flippedPlacement, popoverRect, boundaryRect) || 
            getOverflowScore(flippedPlacement, popoverRect, boundaryRect) < getOverflowScore(placement, popoverRect, boundaryRect)) {
            placement = flippedPlacement;
            finalPosition = flippedPosition;
        }
    }
    
    // Constrain to boundary
    placement = constrainToBoundary(placement, popoverRect, boundaryRect);
    
    const result = {
        position: finalPosition,
        offset: placement.offset,
        arrowOffset: calculateArrowOffset(targetRect, popoverRect, placement, finalPosition as Exclude<PopoverPosition, "auto" | "auto-start" | "auto-end">)
    };

    return result;
}

/**
 * Allow both Popper-style (e.g. "top-start") and legacy  (e.g. "top-left") values.
 */
function normalizePosition(position: PopoverPosition): PopoverPosition {
    if (position == null) {
        return "auto" as PopoverPosition;
    }
    const map: Record<string, PopoverPosition> = {
        // top/bottom
        "top-start": "top-left",
        "top-end": "top-right",
        "bottom-start": "bottom-left",
        "bottom-end": "bottom-right",
        // left/right
        "left-start": "left-top",
        "left-end": "left-bottom",
        "right-start": "right-top",
        "right-end": "right-bottom",
    } as const;
    const lower = String(position).toLowerCase();
    return (map[lower] ?? position) as PopoverPosition;
}

function getBoundaryRect(boundary: HTMLElement | string): DOMRect {
    if (typeof boundary === "string") {
        switch (boundary) {
            case "viewport":
            case "window":
                return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
            case "scrollParent":
                return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
            default:
                return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
        }
    }
    return boundary.getBoundingClientRect();
}

function getBestAutoPosition(
    targetRect: DOMRect, 
    popoverRect: DOMRect, 
    boundaryRect: DOMRect, 
    _autoType: "auto" | "auto-start" | "auto-end"
): Exclude<PopoverPosition, "auto" | "auto-start" | "auto-end"> {
    const positions: Array<Exclude<PopoverPosition, "auto" | "auto-start" | "auto-end">> = [
        "bottom", "top", "right", "left",
        "bottom-left", "bottom-right", "top-left", "top-right",
        "right-top", "right-bottom", "left-top", "left-bottom"
    ];
    
    let bestPosition: Exclude<PopoverPosition, "auto" | "auto-start" | "auto-end"> = "bottom";
    let bestScore = Infinity;
    
    for (const position of positions) {
        const placement = calculatePlacement(targetRect, popoverRect, position);
        const score = getOverflowScore(placement, popoverRect, boundaryRect);
        
        if (score < bestScore) {
            bestScore = score;
            bestPosition = position;
        }
        
        if (score === 0) break;
    }
    
    return bestPosition;
}

function calculatePlacement(
    targetRect: DOMRect, 
    popoverRect: DOMRect, 
    position: Exclude<PopoverPosition, "auto" | "auto-start" | "auto-end">
): PopoverPlacement {
    let top = 0;
    let left = 0;
    
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;
    
    switch (position) {
        case "top":
            top = targetRect.top - popoverRect.height - ARROW_SIZE;
            left = targetCenterX - popoverRect.width / 2;
            break;
        case "top-left":
            top = targetRect.top - popoverRect.height - ARROW_SIZE;
            left = targetRect.left;
            break;
        case "top-right":
            top = targetRect.top - popoverRect.height - ARROW_SIZE;
            left = targetRect.right - popoverRect.width;
            break;
        case "bottom":
            top = targetRect.bottom + ARROW_SIZE;
            left = targetCenterX - popoverRect.width / 2;
            break;
        case "bottom-left":
            top = targetRect.bottom + ARROW_SIZE;
            left = targetRect.left;
            break;
        case "bottom-right":
            top = targetRect.bottom + ARROW_SIZE;
            left = targetRect.right - popoverRect.width;
            break;
        case "left":
            top = targetCenterY - popoverRect.height / 2;
            left = targetRect.left - popoverRect.width - ARROW_SIZE;
            break;
        case "left-top":
            top = targetRect.top;
            left = targetRect.left - popoverRect.width - ARROW_SIZE;
            break;
        case "left-bottom":
            top = targetRect.bottom - popoverRect.height;
            left = targetRect.left - popoverRect.width - ARROW_SIZE;
            break;
        case "right":
            top = targetCenterY - popoverRect.height / 2;
            left = targetRect.right + ARROW_SIZE;
            break;
        case "right-top":
            top = targetRect.top;
            left = targetRect.right + ARROW_SIZE;
            break;
        case "right-bottom":
            top = targetRect.bottom - popoverRect.height;
            left = targetRect.right + ARROW_SIZE;
            break;
        default:
            // Fallback to bottom
            top = targetRect.bottom + ARROW_SIZE;
            left = targetCenterX - popoverRect.width / 2;
            break;
    }
    
    return {
        position,
        offset: { top, left }
    };
}

function getFlippedPosition(position: Exclude<PopoverPosition, "auto" | "auto-start" | "auto-end">): Exclude<PopoverPosition, "auto" | "auto-start" | "auto-end"> {
    const flipMap: Record<string, Exclude<PopoverPosition, "auto" | "auto-start" | "auto-end">> = {
        "top": "bottom",
        "bottom": "top",
        "left": "right",
        "right": "left",
        "top-left": "bottom-left",
        "top-right": "bottom-right",
        "bottom-left": "top-left",
        "bottom-right": "top-right",
        "left-top": "right-top",
        "left-bottom": "right-bottom",
        "right-top": "left-top",
        "right-bottom": "left-bottom",
    };
    
    return flipMap[position] || position;
}

function isWithinBounds(placement: PopoverPlacement, popoverRect: DOMRect, boundaryRect: DOMRect): boolean {
    const { offset } = placement;
    return (
        offset.left >= boundaryRect.left + POPOVER_MARGIN &&
        offset.top >= boundaryRect.top + POPOVER_MARGIN &&
        offset.left + popoverRect.width <= boundaryRect.right - POPOVER_MARGIN &&
        offset.top + popoverRect.height <= boundaryRect.bottom - POPOVER_MARGIN
    );
}

function getOverflowScore(placement: PopoverPlacement, popoverRect: DOMRect, boundaryRect: DOMRect): number {
    const { offset } = placement;
    let score = 0;
    
    if (offset.left < boundaryRect.left + POPOVER_MARGIN) {
        score += (boundaryRect.left + POPOVER_MARGIN) - offset.left;
    }
    if (offset.top < boundaryRect.top + POPOVER_MARGIN) {
        score += (boundaryRect.top + POPOVER_MARGIN) - offset.top;
    }
    if (offset.left + popoverRect.width > boundaryRect.right - POPOVER_MARGIN) {
        score += (offset.left + popoverRect.width) - (boundaryRect.right - POPOVER_MARGIN);
    }
    if (offset.top + popoverRect.height > boundaryRect.bottom - POPOVER_MARGIN) {
        score += (offset.top + popoverRect.height) - (boundaryRect.bottom - POPOVER_MARGIN);
    }
    
    return score;
}

function constrainToBoundary(placement: PopoverPlacement, popoverRect: DOMRect, boundaryRect: DOMRect): PopoverPlacement {
    let { top, left } = placement.offset;
    
    if (left < boundaryRect.left + POPOVER_MARGIN) {
        left = boundaryRect.left + POPOVER_MARGIN;
    } else if (left + popoverRect.width > boundaryRect.right - POPOVER_MARGIN) {
        left = boundaryRect.right - popoverRect.width - POPOVER_MARGIN;
    }
    
    if (top < boundaryRect.top + POPOVER_MARGIN) {
        top = boundaryRect.top + POPOVER_MARGIN;
    } else if (top + popoverRect.height > boundaryRect.bottom - POPOVER_MARGIN) {
        top = boundaryRect.bottom - popoverRect.height - POPOVER_MARGIN;
    }
    
    return {
        ...placement,
        offset: { top, left }
    };
}

function calculateArrowOffset(
    targetRect: DOMRect,
    popoverRect: DOMRect,
    placement: PopoverPlacement,
    position: Exclude<PopoverPosition, "auto" | "auto-start" | "auto-end">
): { top: number; left: number } {
    const { offset } = placement;
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    if (position.startsWith("top") || position.startsWith("bottom")) {
        // desired center position for arrow within popover box
        const desired = targetCenterX - offset.left;
        const min = ARROW_OFFSET + ARROW_SIZE; // leave space from edges
        const max = popoverRect.width - ARROW_OFFSET - ARROW_SIZE;
        const arrowLeft = clamp(desired, min, max);
        return { top: 0, left: arrowLeft };
    } else {
        const desired = targetCenterY - offset.top;
        const min = ARROW_OFFSET + ARROW_SIZE;
        const max = popoverRect.height - ARROW_OFFSET - ARROW_SIZE;
        const arrowTop = clamp(desired, min, max);
        return { top: arrowTop, left: 0 };
    }
}

function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
}
