

import classNames from "classnames";
import { Children, forwardRef } from "react";

import { Classes } from "../../common";
import type { ActionProps, HTMLDivProps, MaybeElement, Props } from "../../common/props";
import { DISPLAYNAME_PREFIX } from "../../common/props";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";

export interface MenuProps extends HTMLDivProps, Props {
    /** Menu items. */
    children?: React.ReactNode;

    /**
     * Whether the menu should appear with large styling.
     * @default false
     */
    large?: boolean;
}

export interface MenuItemProps extends ActionProps, HTMLDivProps {
    /** Whether this menu item is active/selected. */
    active?: boolean;

    /** Menu item contents. */
    children?: React.ReactNode;

    /** Right-aligned label text content, useful for displaying hotkeys. */
    label?: string;

    /** Menu item label. */
    labelElement?: React.ReactElement;

    /** Icon to render after the text. */
    rightIcon?: string | MaybeElement;

    /** Menu item role. */
    role?: string;

    /** Menu item contents. */
    text?: React.ReactNode;
}

export interface MenuDividerProps extends HTMLDivProps, Props {
    /** Optional header title. */
    title?: React.ReactNode;
}

/**
 * Menu component.
 *
 */
export const Menu: React.FC<MenuProps> = forwardRef<HTMLUListElement, MenuProps>((props, ref) => {
    const { children, className, large, ...htmlProps } = props;

    const classes = classNames(
        Classes.MENU,
        {
            [Classes.LARGE]: large,
        },
        className,
    );

    return (
        <ul {...htmlProps} className={classes} ref={ref} role="menu">
            {children}
        </ul>
    );
});

Menu.displayName = `${DISPLAYNAME_PREFIX}.Menu`;

/**
 * Menu item component.
 */
export const MenuItem: React.FC<MenuItemProps> = forwardRef<HTMLLIElement, MenuItemProps>((props, ref) => {
    const {
        active,
        children,
        className,
        disabled,
        icon,
        intent,
        label,
        labelElement,
        onClick,
        rightIcon,
        role = "menuitem",
        text,
        title,
        ...htmlProps
    } = props;

    const hasSubmenu = Children.count(children) > 0;

    const classes = classNames(
        Classes.MENU_ITEM,
        {
            [Classes.ACTIVE]: active,
            [Classes.DISABLED]: disabled,
            [Classes.INTENT_PRIMARY]: intent === "primary",
            [Classes.INTENT_SUCCESS]: intent === "success",
            [Classes.INTENT_WARNING]: intent === "warning",
            [Classes.INTENT_DANGER]: intent === "danger",
        },
        className,
    );

    const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
        if (disabled) {
            return;
        }
        onClick?.(event);
    };

    return (
        <li
            {...htmlProps}
            className={classes}
            onClick={handleClick}
            ref={ref}
            role={role}
            tabIndex={disabled ? -1 : 0}
            title={title}
        >
            {icon && <Icon className={Classes.MENU_ITEM_ICON} icon={icon} />}
            <div className={Classes.MENU_ITEM_LABEL}>
                {text && (
                    <span className={Classes.MENU_ITEM_TEXT}>
                        {text}
                    </span>
                )}
                {children}
            </div>
            {label && <span className={Classes.MENU_ITEM_SHORTCUT}>{label}</span>}
            {labelElement}
            {rightIcon && <Icon className={Classes.MENU_ITEM_RIGHT_ICON} icon={rightIcon} />}
            {hasSubmenu && <Icon className={Classes.MENU_ITEM_SUBMENU_ICON} icon="chevron-right" />}
        </li>
    );
});

MenuItem.displayName = `${DISPLAYNAME_PREFIX}.MenuItem`;

/**
 * Menu divider component.
 */
export const MenuDivider: React.FC<MenuDividerProps> = (props) => {
    const { className, title, ...htmlProps } = props;

    const classes = classNames(Classes.MENU_DIVIDER, className);

    return (
        <li {...htmlProps} className={classes}>
            {title && <h6 className={Classes.MENU_HEADER}>{title}</h6>}
        </li>
    );
};

MenuDivider.displayName = `${DISPLAYNAME_PREFIX}.MenuDivider`;