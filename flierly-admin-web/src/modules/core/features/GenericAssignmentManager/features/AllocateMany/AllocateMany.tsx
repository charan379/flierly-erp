import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useState } from 'react'
import genricAssignmentService from '../../service/genricAssignmentService'
import { ActionType } from '@ant-design/pro-components'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'

interface AllocateManyProps<E> {
  entity: string
  entityRecordId: number
  entitySideField: keyof E
  idsToAssociate: number[]
  actionRef?: ActionType
}

const AllocateMany = <E,>(props: AllocateManyProps<E>) => {
  const { entity, entityRecordId, entitySideField, idsToAssociate, actionRef } = props

  const { translate: t } = useLocale();

  const [isLoding, setIsLoading] = useState(false)

  const buttonStyle = idsToAssociate.length <= 0 ? {} : { backgroundColor: '#009688', borderColor: '#009688' }

  const handleAllocateMany: React.MouseEventHandler = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsLoading(true)

    const { success } = await genricAssignmentService.updateAssociatedRecords({
      entity,
      entityRecordId,
      entitySideField,
      addMultiple: idsToAssociate,
    })

    if (success) {
      actionRef?.reload?.()
      actionRef?.clearSelected?.()
    }

    setIsLoading(false)
  }

  return (
    <Button
      onClick={handleAllocateMany}
      loading={isLoding}
      disabled={isLoding || idsToAssociate.length <= 0}
      icon={<PlusOutlined />}
      style={buttonStyle}
      type="primary"
    >
      {t('action.button.deallocateSelected')} ({idsToAssociate.length})
    </Button>
  )
}

export default AllocateMany
