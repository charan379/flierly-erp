import React, { useState } from "react";
import { Drawer, Button, DrawerProps } from "antd";

interface ResizableDrawerProps extends Omit<DrawerProps, "width"> {
    trigger?: React.ReactNode; // Button or trigger element to open the drawer
    initialWidth?: number; // Default width of the drawer
    minWidth?: number; // Minimum width of the drawer
    maxWidth?: number; // Maximum width of the drawer
}

const ResizableDrawer: React.FC<ResizableDrawerProps> = ({
    trigger,
    minWidth = 300,
    maxWidth = window.innerWidth * 0.8,
    children,
    ...drawerProps
}) => {
    const [open, setOpen] = useState(false);
    const [drawerWidth, setDrawerWidth] = useState(minWidth);

    const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
        const newWidth = window.innerWidth - e.clientX;
        setDrawerWidth(Math.min(Math.max(newWidth, minWidth), maxWidth)); // Clamp the width
    };

    const startResizing = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const onMouseMove = (event: MouseEvent) => handleResize(event as unknown as React.MouseEvent<HTMLDivElement>);
        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    return (
        <>
            {trigger ? (
                React.cloneElement(trigger as React.ReactElement, { onClick: () => setOpen(true) })
            ) : (
                <Button type="primary" onClick={() => setOpen(true)}>
                    Open Drawer
                </Button>
            )}
            <Drawer
                {...drawerProps}
                open={open}
                onClose={() => setOpen(false)}
                width={drawerWidth}
            >
                {children}
                {/* Resize Handle */}
                <div
                    style={{
                        position: "absolute",
                        width: "10px",
                        height: "100%",
                        top: 0,
                        left: -5,
                        cursor: "ew-resize",
                        zIndex: 1000,
                    }}
                    onMouseDown={startResizing}
                ></div>
            </Drawer>
        </>
    );
};

export default ResizableDrawer;
