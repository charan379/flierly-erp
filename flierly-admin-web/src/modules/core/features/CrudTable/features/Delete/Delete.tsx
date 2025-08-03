import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Badge, Button, message, Popconfirm, Tooltip } from 'antd'
import React from 'react'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionType } from '@ant-design/pro-components'
import crudService from '../../../CrudModule/service/crud-module.service'

type DeleteProps = {
  entity: string // Name of the entity to be deleted
  actions: ActionType | undefined
  rows: { selectedRowKeys?: (string | number)[] | undefined; selectedRows?: any[] | undefined }
  render: boolean // Whether to render the component
}

const Delete: React.FC<DeleteProps> = ({ entity, actions, rows, render }) => {

  const { translate: t } = useLocale()

  if (!render || !actions || !rows.selectedRowKeys) return null

  return (
    <Tooltip title={`${t('tooltip.delete_selected')}`}>
      <Badge color="blue" count={rows.selectedRowKeys.length} overflowCount={99}>
        <Popconfirm
          title={t('title.delete_selected')}
          description={`${t('message.confirm_delete_selected')}: ${rows.selectedRowKeys.length}`}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          okButtonProps={{ danger: true }}
          okText={t('button.confirm')}
          cancelText={t('button.cancel')}
          cancelButtonProps={{ type: 'primary' }}
          onCancel={() => message.warning(t('message.cancelled'))}
          onConfirm={async () => {
            const { success } = await crudService.delete({
              entity: entity,
              ids: rows.selectedRowKeys as number[],
            })

            if (success) {
              actions.clearSelected?.() // Safely call clearSelected if it exists
              actions.reload?.() // Safely call reload if it exists
            }
          }}
        >
          <Button
            type="primary"
            danger
            key="delete-selected-rows-trigger"
            shape="circle"
            size="small"
            icon={<FontAwesomeIcon icon={faTrashCan} />}
            disabled={rows.selectedRowKeys.length <= 0}
          />
        </Popconfirm>
      </Badge>
    </Tooltip>
  )
}

export default Delete;
