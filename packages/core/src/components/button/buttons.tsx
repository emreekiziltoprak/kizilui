

import classNames from "classnames";
import { forwardRef } from "react";

import { useInteractiveAttributes } from "../../accessibility/useInteractiveAttributes";
import { Classes, alignmentClass, intentClass } from "../../common";
import { DISPLAYNAME_PREFIX } from "../../common/props";
import { removeNonHTMLProps } from "../../common/utils";
import { Icon } from "../icon/icon";
import { Spinner, SpinnerSize } from "../spinner/spinner";
import { Text } from "../text/text";

import type { AnchorButtonProps, ButtonProps } from "./buttonProps";

/**
 * Button component.
 *
 */
export const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const commonAttributes = useSharedButtonAttributes(props, ref);

    return (
        <button type={props.type || "button"} {...removeNonHTMLProps(props)} {...commonAttributes}>
            {renderButtonContents(props)}
        </button>
    );
});
Button.displayName = `${DISPLAYNAME_PREFIX}.Button`;

/**
 * AnchorButton component.
 *
 */
export const AnchorButton: React.FC<AnchorButtonProps> = forwardRef<HTMLAnchorElement, AnchorButtonProps>((props, ref) => {
    const { href, target = "_blank", ...restProps } = props;
    const commonAttributes = useSharedButtonAttributes(restProps, ref);

    return (
        <a
            role="button"
            href={href}
            target={target}
            {...removeNonHTMLProps(restProps)}
            {...commonAttributes}
        >
            {renderButtonContents(restProps)}
        </a>
    );
});
AnchorButton.displayName = `${DISPLAYNAME_PREFIX}.AnchorButton`;

function useSharedButtonAttributes<T extends HTMLElement>(
    props: ButtonProps | AnchorButtonProps,
    ref: React.Ref<T>
) {
    const {
        active = false,
        alignText,
        className,
        disabled = false,
        fill = false,
        intent,
        large = false,
        loading = false,
        minimal = false,
        outlined = false,
        small = false,
    } = props;

    const interactiveAttributes = useInteractiveAttributes({ disabled, loading }, ref);

    const classes = classNames(
        Classes.BUTTON,
        {
            [Classes.ACTIVE]: active,
            [Classes.DISABLED]: disabled,
            [Classes.FILL]: fill,
            [Classes.LARGE]: large,
            [Classes.LOADING]: loading,
            [Classes.MINIMAL]: minimal,
            [Classes.OUTLINED]: outlined,
            [Classes.SMALL]: small,
        },
        alignmentClass(alignText),
        intentClass(intent),
        className,
    );

    return {
        ...interactiveAttributes,
        className: classes,
        disabled: disabled || loading,
    };
}

function renderButtonContents(props: ButtonProps | AnchorButtonProps): React.ReactNode {
    const { children, ellipsizeText, icon, loading, rightIcon, text } = props;

    const hasTextContent = !children && text != null;

    return (
        <>
            {loading && <Spinner className={Classes.BUTTON_SPINNER} size={SpinnerSize.SMALL} />}
            <Icon icon={icon} />
            {hasTextContent ? (
                <Text className={Classes.BUTTON_TEXT} ellipsize={ellipsizeText} tagName="span">
                    {text}
                </Text>
            ) : (
                children
            )}
            <Icon icon={rightIcon} />
        </>
    );
}