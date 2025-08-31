import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Button } from "../../button";
import { Icon } from "../../icon";
import { PopoverPosition } from "../../popover";
import { Tooltip } from "../tooltip";

const meta: Meta<typeof Tooltip> = {
    title: "Components/Tooltip",
    component: Tooltip,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Tooltips display helpful information when users hover over an element. They provide contextual information without cluttering the interface."
            }
        }
    },
    argTypes: {
        content: {
            control: "text",
            description: "Content to display in the tooltip"
        },
        placement: {
            control: "select",
            options: Object.values(PopoverPosition),
            description: "Preferred position of the tooltip"
        },
        disabled: {
            control: "boolean",
            description: "Whether the tooltip is disabled"
        },
        hoverOpenDelay: {
            control: { type: "number", min: 0, max: 2000, step: 100 },
            description: "Delay before opening on hover (ms)"
        },
        hoverCloseDelay: {
            control: { type: "number", min: 0, max: 2000, step: 100 },
            description: "Delay before closing after hover ends (ms)"
        },
        minimal: {
            control: "boolean",
            description: "Whether to use minimal styling"
        },
        inheritDarkTheme: {
            control: "boolean",
            description: "Whether to inherit dark theme"
        }
    }
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    args: {
        content: "Hello! This is a helpful tooltip.",
        placement: "top",
        children: <Button text="Hover me" />
    }
};

export const WithButton: Story = {
    args: {
        content: "This button performs an important action",
        placement: "bottom",
        children: <Button text="Important Button" intent="primary" />
    }
};

export const WithIcon: Story = {
    args: {
        content: "This icon provides additional information",
        placement: "right",
        children: <Icon icon="info-sign" style={{ cursor: "help" }} />
    }
};

export const LongContent: Story = {
    args: {
        content: "This is a much longer tooltip content that demonstrates how tooltips handle longer text. It should wrap appropriately and remain readable.",
        placement: "top",
        children: <Button text="Long tooltip" />
    }
};

export const AllPlacements: Story = {
    render: () => (
        <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: "30px",
            width: "600px",
            height: "400px",
            alignItems: "center",
            justifyItems: "center"
        }}>
            <Tooltip content="Top Start" placement="top-start">
                <Button text="Top Start" />
            </Tooltip>
            <Tooltip content="Top" placement="top">
                <Button text="Top" />
            </Tooltip>
            <Tooltip content="Top End" placement="top-end">
                <Button text="Top End" />
            </Tooltip>
            
            <Tooltip content="Left" placement="left">
                <Button text="Left" />
            </Tooltip>
            <Tooltip content="Auto positioning" placement="auto">
                <Button text="Auto" />
            </Tooltip>
            <Tooltip content="Right" placement="right">
                <Button text="Right" />
            </Tooltip>
            
            <Tooltip content="Bottom Start" placement="bottom-start">
                <Button text="Bottom Start" />
            </Tooltip>
            <Tooltip content="Bottom" placement="bottom">
                <Button text="Bottom" />
            </Tooltip>
            <Tooltip content="Bottom End" placement="bottom-end">
                <Button text="Bottom End" />
            </Tooltip>
        </div>
    )
};

export const DelayedTooltips: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <Tooltip content="Opens quickly" hoverOpenDelay={0}>
                <Button text="No delay" />
            </Tooltip>
            <Tooltip content="Opens after 500ms" hoverOpenDelay={500}>
                <Button text="500ms delay" />
            </Tooltip>
            <Tooltip content="Opens after 1s" hoverOpenDelay={1000}>
                <Button text="1s delay" />
            </Tooltip>
            <Tooltip content="Closes after 1s" hoverCloseDelay={1000}>
                <Button text="1s close delay" />
            </Tooltip>
        </div>
    )
};

export const MinimalTooltip: Story = {
    args: {
        content: "Minimal styled tooltip",
        placement: "top",
        minimal: true,
        children: <Button text="Minimal tooltip" />
    }
};

export const DarkThemeTooltip: Story = {
    args: {
        content: "Dark theme tooltip",
        placement: "top", 
        inheritDarkTheme: true,
        children: <Button text="Dark tooltip" />
    }
};

export const DisabledTooltip: Story = {
    args: {
        content: "This tooltip is disabled",
        placement: "top",
        disabled: true,
        children: <Button text="Disabled tooltip" />
    }
};

export const InteractiveElements: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
            <Tooltip content="Click me to perform an action">
                <Button text="Action Button" intent="primary" />
            </Tooltip>
            
            <Tooltip content="This is informational">
                <Icon icon="info-sign" size={20} style={{ color: "#137cbd", cursor: "help" }} />
            </Tooltip>
            
            <Tooltip content="Warning: This action cannot be undone">
                <Icon icon="warning-sign" size={20} style={{ color: "#d9822b", cursor: "help" }} />
            </Tooltip>
            
            <Tooltip content="Success indicator">
                <Icon icon="tick-circle" size={20} style={{ color: "#0f9960", cursor: "help" }} />
            </Tooltip>
            
            <Tooltip content="Error indicator">
                <Icon icon="error" size={20} style={{ color: "#db3737", cursor: "help" }} />
            </Tooltip>
        </div>
    )
};

export const TextElements: Story = {
    render: () => (
        <div style={{ lineHeight: "2", maxWidth: "400px" }}>
            This is a paragraph with some{" "}
            <Tooltip content="This word has additional context">
                <span style={{ 
                    borderBottom: "1px dotted #137cbd", 
                    cursor: "help",
                    color: "#137cbd"
                }}>
                    tooltipped
                </span>
            </Tooltip>
            {" "}words in it. You can also have{" "}
            <Tooltip content="Multiple tooltips in the same paragraph">
                <strong style={{ cursor: "help" }}>multiple tooltips</strong>
            </Tooltip>
            {" "}within the same block of text.
        </div>
    )
};