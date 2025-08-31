import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Button } from "../../button";
import { Menu, MenuItem, MenuDivider } from "../../menu";
import { Popover, PopoverInteractionKind, PopoverPosition } from "../";

const meta: Meta<typeof Popover> = {
    title: "Components/Popover",
    component: Popover,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Popover displays floating content next to a target element. It supports click and hover interactions with automatic positioning."
            }
        }
    },
    argTypes: {
        interactionKind: {
            control: "select",
            options: Object.values(PopoverInteractionKind),
            description: "How the popover is triggered"
        },
        placement: {
            control: "select", 
            options: Object.values(PopoverPosition),
            description: "Preferred placement relative to target"
        },
        disabled: {
            control: "boolean",
            description: "Whether the popover is disabled"
        },
        minimal: {
            control: "boolean",
            description: "Whether to use minimal styling"
        },
        usePortal: {
            control: "boolean",
            description: "Whether to render in a portal"
        }
    }
};

export default meta;
type Story = StoryObj<typeof Popover>;

const simpleContent = (
    <div style={{ padding: "20px", maxWidth: "200px" }}>
        <h4>Popover Content</h4>
        <p>This is some content inside the popover. It can contain any React elements.</p>
    </div>
);

const menuContent = (
    <Menu>
        <MenuItem icon="new-text-box" text="New text box" />
        <MenuItem icon="new-object" text="New object" />
        <MenuItem icon="new-link" text="New link" />
        <MenuDivider />
        <MenuItem text="Settings" icon="cog" />
    </Menu>
);

export const Default: Story = {
    args: {
        content: simpleContent,
        interactionKind: PopoverInteractionKind.CLICK,
        placement: PopoverPosition.AUTO,
        children: <Button text="Click me" />
    }
};

export const ClickInteraction: Story = {
    args: {
        content: simpleContent,
        interactionKind: PopoverInteractionKind.CLICK,
        placement: PopoverPosition.BOTTOM,
        children: <Button text="Click to open" />
    }
};

export const HoverInteraction: Story = {
    args: {
        content: simpleContent,
        interactionKind: PopoverInteractionKind.HOVER,
        position: PopoverPosition.TOP,
        children: <Button text="Hover to open" />
    }
};

export const WithMenu: Story = {
    args: {
        content: menuContent,
        interactionKind: PopoverInteractionKind.CLICK,
        position: PopoverPosition.BOTTOM_START,
        children: <Button text="Open Menu" rightIcon="chevron-down" />
    }
};

export const AllPositions: Story = {
    render: () => (
        <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: "20px",
            width: "600px",
            height: "400px",
            alignItems: "center",
            justifyItems: "center"
        }}>
            <Popover content={simpleContent} placement={PopoverPosition.TOP_START}>
                <Button text="Top Start" />
            </Popover>
            <Popover content={simpleContent} placement={PopoverPosition.TOP}>
                <Button text="Top" />
            </Popover>
            <Popover content={simpleContent} placement={PopoverPosition.TOP_END}>
                <Button text="Top End" />
            </Popover>
            
            <Popover content={simpleContent} placement={PopoverPosition.LEFT}>
                <Button text="Left" />
            </Popover>
            <Popover content={simpleContent} placement={PopoverPosition.AUTO}>
                <Button text="Auto" />
            </Popover>
            <Popover content={simpleContent} placement={PopoverPosition.RIGHT}>
                <Button text="Right" />
            </Popover>
            
            <Popover content={simpleContent} placement={PopoverPosition.BOTTOM_START}>
                <Button text="Bottom Start" />
            </Popover>
            <Popover content={simpleContent} placement={PopoverPosition.BOTTOM}>
                <Button text="Bottom" />
            </Popover>
            <Popover content={simpleContent} placement={PopoverPosition.BOTTOM_END}>
                <Button text="Bottom End" />
            </Popover>
        </div>
    )
};

export const Minimal: Story = {
    args: {
        content: simpleContent,
        interactionKind: PopoverInteractionKind.CLICK,
        placement: PopoverPosition.BOTTOM,
        minimal: true,
        children: <Button text="Minimal Popover" />
    }
};

export const Disabled: Story = {
    args: {
        content: simpleContent,
        interactionKind: PopoverInteractionKind.CLICK,
        placement: PopoverPosition.BOTTOM,
        disabled: true,
        children: <Button text="Disabled Popover" disabled />
    }
};

export const TargetOnly: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "20px" }}>
            <Popover 
                content={simpleContent}
                interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}
                placement={PopoverPosition.BOTTOM}
            >
                <div style={{ 
                    padding: "10px", 
                    border: "2px dashed #ccc", 
                    borderRadius: "4px",
                    cursor: "pointer"
                }}>
                    Click Target Only
                    <div style={{ 
                        marginTop: "10px", 
                        padding: "5px", 
                        background: "#f0f0f0",
                        fontSize: "12px"
                    }}>
                        This area won't close the popover
                    </div>
                </div>
            </Popover>
            
            <Popover 
                content={simpleContent}
                interactionKind={PopoverInteractionKind.HOVER_TARGET_ONLY}
                placement={PopoverPosition.BOTTOM}
            >
                <div style={{ 
                    padding: "10px", 
                    border: "2px dashed #ccc", 
                    borderRadius: "4px"
                }}>
                    Hover Target Only
                    <div style={{ 
                        marginTop: "10px", 
                        padding: "5px", 
                        background: "#f0f0f0",
                        fontSize: "12px"
                    }}>
                        This area won't close the popover
                    </div>
                </div>
            </Popover>
        </div>
    )
};