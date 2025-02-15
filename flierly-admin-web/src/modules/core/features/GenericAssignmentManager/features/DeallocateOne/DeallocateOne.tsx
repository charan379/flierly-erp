import { CloseOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React, { useState } from 'react'
import genricAssignmentService from '../../service/genricAssignmentService'
import { ActionType } from '@ant-design/pro-components'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'

interface DeallocateOneProps<E> {
  entity: string
  entityRecordId: number
  entitySideField: keyof E
  idToDisassociate: number
  tableActionRef: React.MutableRefObject<ActionType | undefined>
}

const DeallocateOne = <E,>(props: DeallocateOneProps<E>) => {
  const { entity, entityRecordId, entitySideField, idToDisassociate, tableActionRef } = props

  const { translate: t } = useLocale();

  const [isLoding, setIsLoading] = useState(false)

  const handleDeallocate: React.MouseEventHandler = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsLoading(true)

    const { success } = await genricAssignmentService.updateAssociatedRecords({
      entity: entity,
      entityRecordId,
      entitySideField,
      removeOne: idToDisassociate,
    })

    if (success) {
      tableActionRef.current?.reload()
    }

    setIsLoading(false)
  }

  return (
    <Tooltip title={t('tooltip.deallocate')}>
      <Button
        onClick={handleDeallocate}
        loading={isLoding}
        disabled={isLoding}
        icon={<CloseOutlined />}
        type="link" />
    </Tooltip>)
}

export default DeallocateOne
