import React, { useState } from 'react'
import { Drawer, Button, DrawerProps, Space } from 'antd'
import useLocale from '../../features/Locale/hooks/useLocale'

interface ResizableDrawerProps extends Omit<DrawerProps, 'width' | 'open' | 'onClose'> {
  trigger?: React.ReactNode // Button or trigger element to open the drawer
  initialWidth?: number // Default width of the drawer
  minWidth?: number // Minimum width of the drawer
  maxWidth?: number // Maximum width of the drawer
  open?: boolean // Controlled open state
  onClose?: () => void // Controlled close handler
  onOpen?: () => void // Controlled open handler
}

const ResizableDrawer: React.FC<ResizableDrawerProps> = ({
  trigger,
  minWidth = 400,
  maxWidth = window.innerWidth * 0.8,
  open: controlledOpen,
  onClose: controlledOnClose,
  onOpen: controlledOnOpen,
  children,
  initialWidth = 400,
  ...drawerProps
}) => {
  const { translate: t } = useLocale();
  const [defaultOpen, setDefaultOpen] = useState(false)
  const [drawerWidth, setDrawerWidth] = useState(initialWidth)

  const isControlled = controlledOpen !== undefined

  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    const newWidth = window.innerWidth - e.clientX
    setDrawerWidth(Math.min(Math.max(newWidth, minWidth), maxWidth)) // Clamp the width
  }

  // Prevent context menu propagation
  const handleContextMenu = (e: React.MouseEvent) => {
    e.stopPropagation() // Stop the event from propagating
  }

  const startResizing = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const onMouseMove = (event: MouseEvent) => handleResize(event as unknown as React.MouseEvent<HTMLDivElement>)
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const open = isControlled ? controlledOpen : defaultOpen
  const onClose = isControlled ? controlledOnClose : () => setDefaultOpen(false)
  const onOpen = isControlled ? controlledOnOpen : () => setDefaultOpen(true)

  return (
    <div onContextMenu={handleContextMenu}>
      {trigger ? (
        React.cloneElement(trigger as React.ReactElement, { onClick: onOpen })
      ) : (
        <Button type="primary" onClick={onOpen}>
          {t('action.button.open')}
        </Button>
      )}
      <Drawer
        {...drawerProps}
        open={open}
        onClose={onClose}
        width={drawerWidth}
        extra={
          <Space>
            <Button danger type="primary" onClick={onClose}>
              {t('action.button.close')}
            </Button>
          </Space>
        }
      >
        {children}
        {/* Resize Handle */}
        <div
          style={{
            position: 'absolute',
            width: '10px',
            height: '100%',
            top: 0,
            left: -5,
            cursor: 'ew-resize',
            zIndex: 1000,
          }}
          onMouseDown={startResizing}
        ></div>
      </Drawer>
    </div>
  )
}

export default ResizableDrawer
