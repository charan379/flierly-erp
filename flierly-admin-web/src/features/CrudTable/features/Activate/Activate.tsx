import React, { useMemo } from 'react'
import useLocale from '@/features/Locale/hooks/useLocale'
import { CheckCircleOutlined, QuestionCircleOutlined, StopOutlined } from '@ant-design/icons'
import { Badge, Button, message, Popconfirm, Tooltip } from 'antd'
import crudService from '../../../CrudModule/service/crud-module.service'
import { ActionType } from '@ant-design/pro-components'

type ActivateProps = {
  entity: string
  actions: ActionType | undefined
  rows: { selectedRowKeys?: (string | number)[] | undefined; selectedRows?: any[] | undefined }
  render: boolean
}

const Activate: React.FC<ActivateProps> = ({ entity, actions, rows, render }) => {
  const { translate: t } = useLocale()

  const activate = useMemo(() => checkActiveStatus(rows.selectedRows), [rows.selectedRows])

  if (!render || !actions || !rows.selectedRowKeys || !rows.selectedRows) return null

  const buttonStyle =
    rows.selectedRowKeys.length > 0
      ? {
        backgroundColor: activate ? '#4CAF50' : '#9E9E9E',
        borderColor: activate ? '#4CAF50' : '#9E9E9E',
      }
      : {}

  const handleConfirm = async () => {
    const action = activate ? crudService.activate : crudService.inactivate
    const { success } = await action({
      entity,
      ids: rows.selectedRowKeys as number[],
    })

    if (success) {
      actions.clearSelected?.()
      actions.reload?.()
    }
  }

  return (
    <Tooltip title={t(activate ? 'tooltip.activate.selected' : 'tooltip.inactivate.selected')}>
      <Badge count={rows.selectedRowKeys.length} overflowCount={99}>
        <Popconfirm
          title={t(activate ? 'action.title.activate' : 'action.title.inactivate')}
          description={`${t(activate ? 'confirm.activate.message' : 'confirm.inactivate.message')}: ${rows.selectedRowKeys.length}`}
          icon={<QuestionCircleOutlined style={{ color: activate ? '#4CAF50' : '#9E9E9E' }} />}
          okButtonProps={{ style: { backgroundColor: activate ? '#4CAF50' : '#9E9E9E' } }}
          okText={t('action.button.confirm')}
          cancelText={t('action.button.cancel')}
          cancelButtonProps={{ type: 'primary' }}
          onCancel={() => message.warning(t('action.message.cancelled'))}
          onConfirm={handleConfirm}
        >
          <Button
            type="primary"
            style={buttonStyle}
            shape="circle"
            size="small"
            icon={activate ? <CheckCircleOutlined /> : <StopOutlined />}
            disabled={rows.selectedRowKeys.length === 0}
          />
        </Popconfirm>
      </Badge>
    </Tooltip>
  )
}

const checkActiveStatus = (rows: Array<{ isActive?: boolean }> | undefined): boolean => {
  if (rows === undefined) return false
  const { activeCount, inactiveCount } = rows.reduce(
    (acc, row) => {
      if (row?.isActive) {
        acc.activeCount++
      } else {
        acc.inactiveCount++
      }
      return acc
    },
    { activeCount: 0, inactiveCount: 0 },
  )

  return inactiveCount >= activeCount
}

export default Activate
