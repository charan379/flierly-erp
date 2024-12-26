import useLocale from '@/features/Locale/hooks/useLocale'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Badge, Button, message, Popconfirm, Tooltip } from 'antd'
import React from 'react'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionType } from '@ant-design/pro-components'
import crudService from '../../../CrudModule/service/crudService'

type DeleteProps = {
  entity: string // Name of the entity to be deleted
  actions: ActionType | undefined
  rows: { selectedRowKeys?: (string | number)[] | undefined; selectedRows?: any[] | undefined }
  render: boolean // Whether to render the component
}

const Delete: React.FC<DeleteProps> = ({ entity, actions, rows, render }) => {
  if (!render) return null
  if (!actions) return null
  if (rows.selectedRowKeys === undefined) return null

  const { translate } = useLocale()

  return (
    <Tooltip title={`${translate('delete_selected')}`}>
      <Badge color="blue" count={rows.selectedRowKeys.length} overflowCount={99}>
        <Popconfirm
          title={`${translate('delete_selected')} : ${rows.selectedRowKeys.length}`}
          description={translate('on_confirming_selected_items_will_be_deleted')}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          okButtonProps={{ danger: true }}
          okText={translate('confirm')}
          cancelText={translate('cancel')}
          cancelButtonProps={{ type: 'primary' }}
          onCancel={() => message.warning(translate('request_cancelled'))}
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
            size="middle"
            icon={<FontAwesomeIcon icon={faTrashCan} />}
            disabled={rows.selectedRowKeys.length <= 0}
          />
        </Popconfirm>
      </Badge>
    </Tooltip>
  )
}

export default Delete
