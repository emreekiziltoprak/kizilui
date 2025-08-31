import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { Intent } from "../../../common";
import { Menu, MenuDivider, MenuItem } from "../menu";

const meta: Meta<typeof Menu> = {
    title: "Components/Menu",
    component: Menu,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Menu displays a list of interactive items. It's commonly used in popovers, context menus, and navigation interfaces."
            }
        }
    },
    argTypes: {
        large: {
            control: "boolean",
            description: "Whether to use large menu styling"
        }
    }
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
    args: {
        children: (
            <>
                <MenuItem icon="new-text-box" text="New text box" />
                <MenuItem icon="new-object" text="New object" />
                <MenuItem icon="new-link" text="New link" />
                <MenuDivider />
                <MenuItem icon="cog" text="Settings" />
            </>
        )
    }
};

export const WithIcons: Story = {
    args: {
        children: (
            <>
                <MenuItem icon="document" text="Document" />
                <MenuItem icon="media" text="Media" />
                <MenuItem icon="link" text="Link" />
                <MenuItem icon="th" text="Widget" />
                <MenuDivider />
                <MenuItem icon="cog" text="Preferences" />
            </>
        )
    }
};

export const WithIntents: Story = {
    args: {
        children: (
            <>
                <MenuItem text="Default item" />
                <MenuItem text="Primary item" intent={Intent.PRIMARY} />
                <MenuItem text="Success item" intent={Intent.SUCCESS} />
                <MenuItem text="Warning item" intent={Intent.WARNING} />
                <MenuItem text="Danger item" intent={Intent.DANGER} />
            </>
        )
    }
};

export const WithLabels: Story = {
    args: {
        children: (
            <>
                <MenuItem icon="cut" text="Cut" label="⌘X" />
                <MenuItem icon="duplicate" text="Copy" label="⌘C" />
                <MenuItem icon="clipboard" text="Paste" label="⌘V" />
                <MenuDivider />
                <MenuItem icon="undo" text="Undo" label="⌘Z" />
                <MenuItem icon="redo" text="Redo" label="⇧⌘Z" />
                <MenuDivider />
                <MenuItem icon="select" text="Select all" label="⌘A" />
            </>
        )
    }
};

export const WithStates: Story = {
    args: {
        children: (
            <>
                <MenuItem text="Normal item" />
                <MenuItem text="Active item" active />
                <MenuItem text="Disabled item" disabled />
                <MenuItem text="Active + Disabled" active disabled />
                <MenuDivider />
                <MenuItem icon="star-empty" text="Not selected" />
                <MenuItem icon="star" text="Selected" active />
            </>
        )
    }
};

export const WithDividers: Story = {
    args: {
        children: (
            <>
                <MenuItem icon="new-text-box" text="New" />
                <MenuItem icon="document-open" text="Open" />
                <MenuItem icon="floppy-disk" text="Save" />
                <MenuDivider />
                <MenuItem icon="cut" text="Cut" />
                <MenuItem icon="duplicate" text="Copy" />
                <MenuItem icon="clipboard" text="Paste" />
                <MenuDivider />
                <MenuItem icon="cog" text="Preferences" />
                <MenuItem icon="log-out" text="Sign out" />
            </>
        )
    }
};

export const WithHeaders: Story = {
    args: {
        children: (
            <>
                <MenuDivider title="File" />
                <MenuItem icon="document" text="New document" />
                <MenuItem icon="folder-open" text="Open folder" />
                <MenuItem icon="floppy-disk" text="Save" />
                
                <MenuDivider title="Edit" />
                <MenuItem icon="cut" text="Cut" />
                <MenuItem icon="duplicate" text="Copy" />
                <MenuItem icon="clipboard" text="Paste" />
                
                <MenuDivider title="View" />
                <MenuItem icon="zoom-in" text="Zoom in" />
                <MenuItem icon="zoom-out" text="Zoom out" />
                <MenuItem icon="zoom-to-fit" text="Fit to screen" />
            </>
        )
    }
};

export const LargeMenu: Story = {
    args: {
        large: true,
        children: (
            <>
                <MenuItem icon="home" text="Dashboard" />
                <MenuItem icon="user" text="Profile" />
                <MenuItem icon="envelope" text="Messages" />
                <MenuItem icon="cog" text="Settings" />
                <MenuDivider />
                <MenuItem icon="log-out" text="Sign out" />
            </>
        )
    }
};

function InteractiveExample() {
    const [selectedItem, setSelectedItem] = useState<string>("dashboard");
    const [notifications, setNotifications] = useState(true);
    
    const handleSelect = (item: string) => {
        setSelectedItem(item);
    };
    
    return (
        <div>
            <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f0f8ff", borderRadius: "4px" }}>
                <strong>Selected:</strong> {selectedItem}
                <br />
                <strong>Notifications:</strong> {notifications ? "On" : "Off"}
            </div>
            
            <Menu>
                <MenuDivider title="Navigation" />
                <MenuItem 
                    icon="home" 
                    text="Dashboard" 
                    active={selectedItem === "dashboard"}
                    onClick={() => handleSelect("dashboard")}
                />
                <MenuItem 
                    icon="chart" 
                    text="Analytics" 
                    active={selectedItem === "analytics"}
                    onClick={() => handleSelect("analytics")}
                />
                <MenuItem 
                    icon="user" 
                    text="Profile" 
                    active={selectedItem === "profile"}
                    onClick={() => handleSelect("profile")}
                />
                
                <MenuDivider title="Settings" />
                <MenuItem 
                    icon={notifications ? "notifications" : "notifications-off"} 
                    text={notifications ? "Turn off notifications" : "Turn on notifications"}
                    onClick={() => setNotifications(!notifications)}
                />
                <MenuItem 
                    icon="cog" 
                    text="Preferences" 
                    active={selectedItem === "preferences"}
                    onClick={() => handleSelect("preferences")}
                />
                
                <MenuDivider />
                <MenuItem 
                    icon="log-out" 
                    text="Sign out" 
                    intent={Intent.DANGER}
                    onClick={() => handleSelect("signed-out")}
                />
            </Menu>
        </div>
    );
}

export const Interactive: Story = {
    render: () => <InteractiveExample />
};

export const NavigationMenu: Story = {
    args: {
        children: (
            <>
                <MenuItem icon="home" text="Home" active />
                <MenuItem icon="user" text="Profile" />
                <MenuItem icon="envelope" text="Messages" />
                <MenuItem icon="notifications" text="Notifications" />
                <MenuDivider />
                <MenuItem icon="cog" text="Settings" />
                <MenuItem icon="help" text="Help & Support" />
                <MenuItem icon="log-out" text="Sign out" />
            </>
        )
    }
};

export const ContextualMenu: Story = {
    args: {
        children: (
            <>
                <MenuItem icon="edit" text="Edit" />
                <MenuItem icon="duplicate" text="Duplicate" />
                <MenuItem icon="share" text="Share" />
                <MenuDivider />
                <MenuItem icon="archive" text="Archive" />
                <MenuItem icon="trash" text="Delete" intent={Intent.DANGER} />
            </>
        )
    }
};