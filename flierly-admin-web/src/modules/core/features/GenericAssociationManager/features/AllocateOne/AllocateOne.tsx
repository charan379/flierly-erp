import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React, { useState } from 'react'
import genricAssociationService from '../../service/genricAssociationService'
import { ActionType } from '@ant-design/pro-components'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'

interface AllocateOneProps<E> {
  entity: string
  entityRecordId: number
  entitySideField: keyof E
  idToAssociate: number
  tableActionRef: React.MutableRefObject<ActionType | undefined>
}

const AllocateOne = <E,>(props: AllocateOneProps<E>) => {
  const { entity, entityRecordId, entitySideField, idToAssociate, tableActionRef } = props

  const { translate: t } = useLocale();
  const [isLoding, setIsLoading] = useState(false)

  const handleAllocate: React.MouseEventHandler = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsLoading(true)

    const { success } = await genricAssociationService.updateAssociatedRecords({
      entity,
      entityRecordId,
      entitySideField,
      addOne: idToAssociate,
    })

    if (success) {
      tableActionRef.current?.reload()
    }

    setIsLoading(false)
  }

  return (
    <Tooltip title={t('tooltip.allocate')}>
      <Button
        onClick={handleAllocate}
        loading={isLoding}
        disabled={isLoding}
        icon={<PlusOutlined />}
        type="link" />
    </Tooltip>
  )
}
export default AllocateOne
