import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { Button } from "../../button";
import { Menu, MenuItem, MenuDivider } from "../../menu";
import { ContextMenu } from "../contextMenu";

const meta: Meta<typeof ContextMenu> = {
    title: "Components/ContextMenu",
    component: ContextMenu,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "ContextMenu displays a menu when users right-click on an element. It provides contextual actions relevant to the clicked element."
            }
        }
    },
    argTypes: {
        disabled: {
            control: "boolean",
            description: "Whether the context menu is disabled"
        }
    }
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

const basicMenu = (
    <Menu>
        <MenuItem icon="new-text-box" text="New Text Box" />
        <MenuItem icon="new-object" text="New Object" />
        <MenuItem icon="new-link" text="New Link" />
        <MenuDivider />
        <MenuItem icon="cog" text="Settings" />
    </Menu>
);

const fileMenu = (
    <Menu>
        <MenuItem icon="document-open" text="Open" />
        <MenuItem icon="floppy-disk" text="Save" />
        <MenuItem icon="duplicate" text="Save As..." />
        <MenuDivider />
        <MenuItem icon="import" text="Import" />
        <MenuItem icon="export" text="Export" />
        <MenuDivider />
        <MenuItem icon="print" text="Print" />
    </Menu>
);

const editMenu = (
    <Menu>
        <MenuItem icon="cut" text="Cut" label="Ctrl+X" />
        <MenuItem icon="duplicate" text="Copy" label="Ctrl+C" />
        <MenuItem icon="clipboard" text="Paste" label="Ctrl+V" />
        <MenuDivider />
        <MenuItem icon="undo" text="Undo" label="Ctrl+Z" />
        <MenuItem icon="redo" text="Redo" label="Ctrl+Y" />
        <MenuDivider />
        <MenuItem icon="select" text="Select All" label="Ctrl+A" />
    </Menu>
);

export const Default: Story = {
    args: {
        content: basicMenu,
        children: (
            <div style={{
                width: "300px",
                height: "200px",
                border: "2px dashed #ccc",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "context-menu",
                userSelect: "none"
            }}>
                Right-click me for context menu
            </div>
        )
    }
};

export const WithButton: Story = {
    args: {
        content: basicMenu,
        children: <Button text="Right-click for menu" />
    }
};

export const FileContextMenu: Story = {
    args: {
        content: fileMenu,
        children: (
            <div style={{
                width: "250px",
                height: "150px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "20px",
                backgroundColor: "#f8f9fa",
                cursor: "context-menu"
            }}>
                <h4>Document.txt</h4>
                <p>This is a file representation. Right-click for file operations.</p>
            </div>
        )
    }
};

export const EditContextMenu: Story = {
    args: {
        content: editMenu,
        children: (
            <textarea
                style={{
                    width: "400px",
                    height: "150px",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontFamily: "monospace"
                }}
                defaultValue="This is some editable text. Right-click for edit operations like cut, copy, paste, etc."
            />
        )
    }
};

export const MultipleContextMenus: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <ContextMenu content={basicMenu}>
                <div style={{
                    width: "150px",
                    height: "100px",
                    border: "2px solid #137cbd",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "context-menu",
                    backgroundColor: "#e1f5fe"
                }}>
                    Basic Menu
                </div>
            </ContextMenu>
            
            <ContextMenu content={fileMenu}>
                <div style={{
                    width: "150px",
                    height: "100px",
                    border: "2px solid #0f9960",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "context-menu",
                    backgroundColor: "#e8f5e8"
                }}>
                    File Menu
                </div>
            </ContextMenu>
            
            <ContextMenu content={editMenu}>
                <div style={{
                    width: "150px",
                    height: "100px",
                    border: "2px solid #d9822b",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "context-menu",
                    backgroundColor: "#fff3e0"
                }}>
                    Edit Menu
                </div>
            </ContextMenu>
        </div>
    )
};

export const DisabledContextMenu: Story = {
    args: {
        content: basicMenu,
        disabled: true,
        children: (
            <div style={{
                width: "300px",
                height: "150px",
                border: "2px dashed #ccc",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
                cursor: "not-allowed"
            }}>
                Context menu is disabled
            </div>
        )
    }
};

function InteractiveExample() {
    const [lastAction, setLastAction] = useState<string>("");
    
    const interactiveMenu = (
        <Menu>
            <MenuItem 
                icon="add" 
                text="Add Item" 
                onClick={() => setLastAction("Added new item")}
            />
            <MenuItem 
                icon="edit" 
                text="Edit Item" 
                onClick={() => setLastAction("Edited item")}
            />
            <MenuItem 
                icon="trash" 
                text="Delete Item" 
                intent="danger"
                onClick={() => setLastAction("Deleted item")}
            />
            <MenuDivider />
            <MenuItem 
                icon="refresh" 
                text="Refresh" 
                onClick={() => setLastAction("Refreshed")}
            />
        </Menu>
    );

    return (
        <div>
            <ContextMenu content={interactiveMenu}>
                <div style={{
                    width: "300px",
                    height: "200px",
                    border: "2px solid #137cbd",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "context-menu",
                    backgroundColor: "#f0f8ff"
                }}>
                    <div>Right-click for interactive menu</div>
                    {lastAction && (
                        <div style={{ 
                            marginTop: "10px", 
                            padding: "5px 10px",
                            backgroundColor: "#137cbd",
                            color: "white",
                            borderRadius: "4px",
                            fontSize: "12px"
                        }}>
                            Last action: {lastAction}
                        </div>
                    )}
                </div>
            </ContextMenu>
        </div>
    );
}

export const InteractiveContextMenu: Story = {
    render: () => <InteractiveExample />
};

function CustomHandlerExample() {
    const [showCustomMenu, setShowCustomMenu] = useState(true);
        
        const handleContextMenu = (e: React.MouseEvent) => {
            console.log("Custom context menu handler called", e);
            // Return false to prevent the context menu from showing
            return showCustomMenu;
        };
        
        return (
            <div>
                <div style={{ marginBottom: "20px" }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={showCustomMenu}
                            onChange={(e) => setShowCustomMenu(e.target.checked)}
                            style={{ marginRight: "8px" }}
                        />
                        Allow context menu
                    </label>
                </div>
                
                <ContextMenu 
                    content={basicMenu}
                    onContextMenu={handleContextMenu}
                >
                    <div style={{
                        width: "300px",
                        height: "150px",
                        border: "2px dashed #d9822b",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "context-menu",
                        backgroundColor: "#fff8e1"
                    }}>
                        Context menu controlled by checkbox
                    </div>
                </ContextMenu>
            </div>
        );
}

export const CustomHandler: Story = {
    render: () => <CustomHandlerExample />
};