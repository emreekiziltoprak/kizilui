import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { Button } from "../../button";
import { Overlay } from "../overlay";

const meta: Meta<typeof Overlay> = {
    title: "Components/Overlay",
    component: Overlay,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Overlay component provides a base for modal-like interfaces with backdrop, focus management, and portal rendering."
            }
        }
    },
    argTypes: {
        isOpen: {
            control: "boolean",
            description: "Controls the visibility of the overlay"
        },
        hasBackdrop: {
            control: "boolean",
            description: "Whether to render a backdrop behind the overlay"
        },
        canEscapeKeyClose: {
            control: "boolean",
            description: "Whether pressing escape closes the overlay"
        },
        canOutsideClickClose: {
            control: "boolean",
            description: "Whether clicking outside closes the overlay"
        },
        usePortal: {
            control: "boolean",
            description: "Whether to render in a portal"
        }
    }
};

export default meta;
type Story = StoryObj<typeof Overlay>;

// Interactive example with button to toggle overlay
function OverlayExample(args: unknown) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Button onClick={() => setIsOpen(true)} text="Open Overlay" />
            <Overlay
                {...args}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <div style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    maxWidth: "400px",
                    margin: "50px auto"
                }}>
                    <h3>Overlay Content</h3>
                    <p>This is the content inside the overlay. Click outside, press ESC, or click the button to close.</p>
                    <Button onClick={() => setIsOpen(false)} text="Close Overlay" intent="primary" />
                </div>
            </Overlay>
        </div>
    );
}

export const Default: Story = {
    render: (args) => <OverlayExample {...args} />,
    args: {
        hasBackdrop: true,
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        usePortal: true
    }
};

export const WithoutBackdrop: Story = {
    render: (args) => <OverlayExample {...args} />,
    args: {
        hasBackdrop: false,
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        usePortal: true
    }
};

export const NoEscapeClose: Story = {
    render: (args) => <OverlayExample {...args} />,
    args: {
        hasBackdrop: true,
        canEscapeKeyClose: false,
        canOutsideClickClose: true,
        usePortal: true
    }
};

export const NoOutsideClickClose: Story = {
    render: (args) => <OverlayExample {...args} />,
    args: {
        hasBackdrop: true,
        canEscapeKeyClose: true,
        canOutsideClickClose: false,
        usePortal: true
    }
};

export const InlineRendering: Story = {
    render: (args) => <OverlayExample {...args} />,
    args: {
        hasBackdrop: true,
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        usePortal: false
    }
};