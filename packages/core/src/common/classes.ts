

import type { Alignment } from "./alignment";
import type { Elevation } from "./elevation";
import { Intent, type Intent as IntentType } from "./intent";
import type { Position } from "./position";

const NS = "kz";

// modifiers
export const ACTIVE = `${NS}-active`;
export const ALIGN_LEFT = `${NS}-align-left`;
export const ALIGN_RIGHT = `${NS}-align-right`;
export const DARK = `${NS}-dark`;
export const DISABLED = `${NS}-disabled`;
export const FILL = `${NS}-fill`;
export const FIXED = `${NS}-fixed`;
export const FIXED_TOP = `${NS}-fixed-top`;
export const INLINE = `${NS}-inline`;
export const INTERACTIVE = `${NS}-interactive`;
export const LARGE = `${NS}-large`;
export const LOADING = `${NS}-loading`;
export const MINIMAL = `${NS}-minimal`;
export const MULTILINE = `${NS}-multiline`;
export const OUTLINED = `${NS}-outlined`;
export const ROUND = `${NS}-round`;
export const SELECTED = `${NS}-selected`;
export const SMALL = `${NS}-small`;
export const VERTICAL = `${NS}-vertical`;

// components
export const ALERT = `${NS}-alert`;
export const ALERT_BODY = `${NS}-alert-body`;
export const ALERT_CONTENTS = `${NS}-alert-contents`;
export const ALERT_FOOTER = `${NS}-alert-footer`;

export const BUTTON = `${NS}-button`;
export const BUTTON_GROUP = `${NS}-button-group`;
export const BUTTON_SPINNER = `${NS}-button-spinner`;
export const BUTTON_TEXT = `${NS}-button-text`;

export const CALLOUT = `${NS}-callout`;
export const CALLOUT_ICON = `${NS}-callout-icon`;

export const CARD = `${NS}-card`;

export const CONTEXT_MENU = `${NS}-context-menu`;
export const CONTEXT_MENU_TARGET = `${NS}-context-menu-target`;

export const CONTROL = `${NS}-control`;
export const CONTROL_GROUP = `${NS}-control-group`;
export const CONTROL_INDICATOR = `${NS}-control-indicator`;

export const DIALOG = `${NS}-dialog`;
export const DIALOG_CONTAINER = `${NS}-dialog-container`;
export const DIALOG_BODY = `${NS}-dialog-body`;
export const DIALOG_CLOSE_BUTTON = `${NS}-dialog-close-button`;
export const DIALOG_FOOTER = `${NS}-dialog-footer`;
export const DIALOG_FOOTER_ACTIONS = `${NS}-dialog-footer-actions`;
export const DIALOG_HEADER = `${NS}-dialog-header`;

export const DIVIDER = `${NS}-divider`;

export const FORM_GROUP = `${NS}-form-group`;
export const FORM_CONTENT = `${NS}-form-content`;
export const FORM_HELPER_TEXT = `${NS}-form-helper-text`;

export const ICON = `${NS}-icon`;

export const INPUT = `${NS}-input`;
export const INPUT_ACTION = `${NS}-input-action`;
export const INPUT_GROUP = `${NS}-input-group`;
export const INPUT_LEFT_CONTAINER = `${NS}-input-left-container`;
export const INPUT_RIGHT_CONTAINER = `${NS}-input-right-container`;

export const LABEL = `${NS}-label`;

export const MENU = `${NS}-menu`;
export const MENU_DIVIDER = `${NS}-menu-divider`;
export const MENU_HEADER = `${NS}-menu-header`;
export const MENU_ITEM = `${NS}-menu-item`;
export const MENU_ITEM_ICON = `${NS}-menu-item-icon`;
export const MENU_ITEM_LABEL = `${NS}-menu-item-label`;
export const MENU_ITEM_TEXT = `${NS}-menu-item-text`;
export const MENU_ITEM_SHORTCUT = `${NS}-menu-item-shortcut`;
export const MENU_ITEM_RIGHT_ICON = `${NS}-menu-item-right-icon`;
export const MENU_ITEM_SUBMENU_ICON = `${NS}-menu-item-submenu-icon`;
export const MENU_SUBMENU = `${NS}-menu-submenu`;

export const NAVBAR = `${NS}-navbar`;
export const NAVBAR_GROUP = `${NS}-navbar-group`;
export const NAVBAR_HEADING = `${NS}-navbar-heading`;
export const NAVBAR_DIVIDER = `${NS}-navbar-divider`;

export const OVERLAY = `${NS}-overlay`;
export const OVERLAY_BACKDROP = `${NS}-overlay-backdrop`;
export const OVERLAY_CONTAINER = `${NS}-overlay-container`;
export const OVERLAY_CONTENT = `${NS}-overlay-content`;
export const OVERLAY_INLINE = `${NS}-overlay-inline`;
export const OVERLAY_OPEN = `${NS}-overlay-open`;
export const OVERLAY_SCROLL_CONTAINER = `${NS}-overlay-scroll-container`;

export const POPOVER = `${NS}-popover`;
export const POPOVER_ARROW = `${NS}-popover-arrow`;
export const POPOVER_BACKDROP = `${NS}-popover-backdrop`;
export const POPOVER_CAPTURE_DISMISS = `${NS}-popover-capture-dismiss`;
export const POPOVER_CONTENT = `${NS}-popover-content`;
export const POPOVER_DISMISS = `${NS}-popover-dismiss`;
export const POPOVER_DISMISS_OVERRIDE = `${NS}-popover-dismiss-override`;
export const POPOVER_OPEN = `${NS}-popover-open`;
export const POPOVER_TARGET = `${NS}-popover-target`;
export const POPOVER_WRAPPER = `${NS}-popover-wrapper`;

export const SPINNER = `${NS}-spinner`;
export const SPINNER_ANIMATION = `${NS}-spinner-animation`;
export const SPINNER_HEAD = `${NS}-spinner-head`;
export const SPINNER_NO_SPIN = `${NS}-spinner-no-spin`;
export const SPINNER_TRACK = `${NS}-spinner-track`;

export const TEXT = `${NS}-text`;

export const TOOLTIP = `${NS}-tooltip`;
export const TOOLTIP_CONTENT = `${NS}-tooltip-content`;
export const TOOLTIP_CONTENT_COMPACT = `${NS}-tooltip-content-compact`;
export const TOOLTIP_INDICATOR = `${NS}-tooltip-indicator`;
export const TOOLTIP_TARGET = `${NS}-tooltip-target`;

// intent classes
export const INTENT_PRIMARY = `${NS}-intent-primary`;
export const INTENT_SUCCESS = `${NS}-intent-success`;
export const INTENT_WARNING = `${NS}-intent-warning`;
export const INTENT_DANGER = `${NS}-intent-danger`;

// text utilities
export const TEXT_LARGE = `${NS}-text-large`;
export const TEXT_SMALL = `${NS}-text-small`;
export const TEXT_MUTED = `${NS}-text-muted`;
export const TEXT_DISABLED = `${NS}-text-disabled`;
export const TEXT_OVERFLOW_ELLIPSIS = `${NS}-text-overflow-ellipsis`;

// utility functions
export function alignmentClass(alignment: Alignment): string {
    switch (alignment) {
        case "center":
            return `${NS}-align-center`;
        case "left":
            return `${NS}-align-left`;
        case "right":
            return `${NS}-align-right`;
        default:
            return "";
    }
}

export function elevationClass(elevation: Elevation): string {
    if (elevation == null) {
        return "";
    }
    return `${NS}-elevation-${elevation}`;
}

export function intentClass(intent?: IntentType): string {
    if (intent == null || intent === Intent.NONE) {
        return "";
    }
    return `${NS}-intent-${intent}`;
}

export function positionClass(position: Position): string {
    if (position == null) {
        return "";
    }
    return `${NS}-position-${position}`;
}

export const Classes = {
    // modifiers
    ACTIVE,
    ALIGN_LEFT,
    ALIGN_RIGHT,
    DARK,
    DISABLED,
    FILL,
    FIXED,
    FIXED_TOP,
    INLINE,
    INTERACTIVE,
    LARGE,
    LOADING,
    MINIMAL,
    MULTILINE,
    OUTLINED,
    ROUND,
    SELECTED,
    SMALL,
    VERTICAL,

    // components
    ALERT,
    ALERT_BODY,
    ALERT_CONTENTS,
    ALERT_FOOTER,

    BUTTON,
    BUTTON_GROUP,
    BUTTON_SPINNER,
    BUTTON_TEXT,

    CALLOUT,
    CALLOUT_ICON,

    CARD,

    CONTEXT_MENU,
    CONTEXT_MENU_TARGET,

    CONTROL,
    CONTROL_GROUP,
    CONTROL_INDICATOR,

    DIALOG,
    DIALOG_CONTAINER,
    DIALOG_BODY,
    DIALOG_CLOSE_BUTTON,
    DIALOG_FOOTER,
    DIALOG_FOOTER_ACTIONS,
    DIALOG_HEADER,

    DIVIDER,

    FORM_GROUP,
    FORM_CONTENT,
    FORM_HELPER_TEXT,

    ICON,

    INPUT,
    INPUT_ACTION,
    INPUT_GROUP,
    INPUT_LEFT_CONTAINER,
    INPUT_RIGHT_CONTAINER,

    LABEL,

    MENU,
    MENU_DIVIDER,
    MENU_HEADER,
    MENU_ITEM,
    MENU_ITEM_ICON,
    MENU_ITEM_LABEL,
    MENU_ITEM_TEXT,
    MENU_ITEM_SHORTCUT,
    MENU_ITEM_RIGHT_ICON,
    MENU_ITEM_SUBMENU_ICON,
    MENU_SUBMENU,

    NAVBAR,
    NAVBAR_GROUP,
    NAVBAR_HEADING,
    NAVBAR_DIVIDER,

    OVERLAY,
    OVERLAY_BACKDROP,
    OVERLAY_CONTAINER,
    OVERLAY_CONTENT,
    OVERLAY_INLINE,
    OVERLAY_OPEN,
    OVERLAY_SCROLL_CONTAINER,

    POPOVER,
    POPOVER_ARROW,
    POPOVER_BACKDROP,
    POPOVER_CAPTURE_DISMISS,
    POPOVER_CONTENT,
    POPOVER_DISMISS,
    POPOVER_DISMISS_OVERRIDE,
    POPOVER_OPEN,
    POPOVER_TARGET,
    POPOVER_WRAPPER,

    SPINNER,
    SPINNER_ANIMATION,
    SPINNER_HEAD,
    SPINNER_NO_SPIN,
    SPINNER_TRACK,

    TEXT,

    TOOLTIP,
    TOOLTIP_CONTENT,
    TOOLTIP_CONTENT_COMPACT,
    TOOLTIP_INDICATOR,
    TOOLTIP_TARGET,

    // intent classes
    INTENT_PRIMARY,
    INTENT_SUCCESS,
    INTENT_WARNING,
    INTENT_DANGER,

    // text utilities
    TEXT_LARGE,
    TEXT_SMALL,
    TEXT_MUTED,
    TEXT_DISABLED,
    TEXT_OVERFLOW_ELLIPSIS,
} as const;