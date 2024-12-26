import { useState, useEffect, useMemo, useCallback } from 'react'
import { Button, Flex, Menu, Popover, Tooltip, Typography } from 'antd'
import { CheckCircleOutlined, StopOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faEye, faPenToSquare, faTrashCan, faTrashCanArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons'
import useTheme from '@/features/Theme/hooks/useTheme'
import useLocale from '@/features/Locale/hooks/useLocale'
import useEscapeKey from '@/hooks/useEscapeKey'
import Loading from '@/components/Loading'
import useCrudModuleContext from '../../../CrudModule/hooks/useCrudModuleContext'
import crudService from '../../../CrudModule/service/crud-module.service'
import useOnOutsideClick from '@/hooks/useOnOutsideClick'
import { ActionType } from '@ant-design/pro-components'

interface RowContextMenuProps {
  entity: string
  actions: ActionType | undefined
  record: Record<string, any>
  recordTitleKey: string
  open: boolean
  position: { x: number; y: number }
  close: () => void
  render: boolean
}

const RowContextMenu: React.FC<RowContextMenuProps> = ({ entity, actions, record, recordTitleKey, open, position, close, render }) => {

  const { theme } = useTheme()
  const { translate } = useLocale()
  const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number }>(position)
  const [countdown, setCountdown] = useState<number>(120) // Start with 120 seconds
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { CrudModuleContextHandler } = useCrudModuleContext()

  const items = useMemo(() => {
    const menuItemStyle = { fontSize: '12px' }
    const baseItems = [
      {
        label: translate('view'),
        key: 'view',
        icon: <FontAwesomeIcon icon={faEye} style={menuItemStyle} />,
        style: { color: '#2196F3', ...menuItemStyle },
      },
      {
        label: translate('edit'),
        key: 'edit',
        icon: <FontAwesomeIcon icon={faPenToSquare} style={menuItemStyle} />,
        style: { color: '#FF9800', ...menuItemStyle },
      },
      record?.isActive
        ? {
          label: translate('inactivate'),
          key: 'inactivate',
          icon: <StopOutlined style={menuItemStyle} />,
          style: { color: '#9E9E9E', ...menuItemStyle },
        }
        : {
          label: translate('activate'),
          key: 'activate',
          icon: <CheckCircleOutlined style={menuItemStyle} />,
          style: { color: '#4CAF50', ...menuItemStyle },
        },
      {
        label: translate('delete'),
        key: 'delete',
        icon: <FontAwesomeIcon icon={faTrashCan} style={menuItemStyle} />,
        danger: true,
      },
      {
        label: translate('restore'),
        key: 'restore',
        icon: <FontAwesomeIcon icon={faTrashCanArrowUp} style={menuItemStyle} />,
        style: { color: '#009688', ...menuItemStyle },
      },
      {
        label: `${translate('close')} (${translate('auto_close_in')} ${countdown}s)`,
        key: 'close',
        icon: <FontAwesomeIcon icon={faCircleXmark} style={menuItemStyle} />,
        danger: true,
      },
    ]
    return baseItems
  }, [record, translate, countdown])

  const onMenuItemClick = useCallback(
    async ({ key }: { key: string }) => {
      setIsLoading(true)
      let result: { success?: boolean } = {}
      switch (key) {
        case 'activate':
          result = await crudService.activate({
            entity,
            ids: [record?.id],
          })
          break
        case 'inactivate':
          result = await crudService.inactivate({
            entity,
            ids: [record?.id],
          })
          break
        case 'edit':
          CrudModuleContextHandler.updateForm.open({ data: record, id: record?.id })
          close()
          break
        case 'delete':
          result = await crudService.delete({
            entity,
            ids: [record?.id],
          })
          break
        case 'restore':
          result = await crudService.restore({
            entity,
            ids: [record?.id],
          })
          break
        case 'close':
          close()
          break
        default:
          result = {}
          break
      }

      if (result?.success) {
        actions?.reload?.()
        close()
      }

      setIsLoading(false)
    },
    [entity, record, actions, close],
  )

  // Use escape key to close the menu
  useEscapeKey(close)

  // Close the menu when clicking outside
  useOnOutsideClick(
    'row-popover-menu',
    useCallback(() => close(), [close]),
  )

  // Timer countdown logic with cleanup
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (open) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            close()
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
        setCountdown(120)
      } // Cleanup the timer
    }
  }, [open, close])

  // Adjust position logic with cleanup
  useEffect(() => {
    const handlePositioning = () => {
      const popoverElement = document.getElementById('row-popover-menu')
      if (popoverElement) {
        const popoverRect = popoverElement.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        let newX = position.x
        let newY = position.y

        // Adjust X position
        if (newX + popoverRect.width > viewportWidth) {
          newX = viewportWidth - popoverRect.width - 25
        }

        // Adjust Y position
        if (newY + popoverRect.height > viewportHeight) {
          newY = viewportHeight - popoverRect.height - 25
        }

        // Set the adjusted position
        setPopoverPosition({ x: newX, y: newY })
      }
    }

    if (open) {
      requestAnimationFrame(handlePositioning)
      window.addEventListener('resize', handlePositioning)
    }

    return () => {
      window.removeEventListener('resize', handlePositioning) // Cleanup the event listener
    }
  }, [open, position])

  if (!render || !actions) return null

  return (
    <Popover
      id="row-popover-menu"
      title={
        <Flex justify="space-between" align="center" wrap="nowrap" gap="large">
          <Typography.Text>{record[recordTitleKey] ?? translate('row_menu')}</Typography.Text>
          <Tooltip title={translate('close_menu')}>
            <Button size='small' shape="default" danger icon={<FontAwesomeIcon icon={faXmark} size="xl" />} onClick={close} />
          </Tooltip>
        </Flex>
      }
      open={open}
      autoAdjustOverflow
      showArrow={false}
      zIndex={1}
      arrow={false}
      destroyTooltipOnHide={true}
      content={
        <Loading isLoading={isLoading}>
          <Menu theme={theme} items={items} onClick={onMenuItemClick} selectable={false} />
        </Loading>
      }
      overlayStyle={{
        position: 'fixed',
        top: popoverPosition?.y,
        left: popoverPosition?.x,
      }}
    />
  )
}

export default RowContextMenu
