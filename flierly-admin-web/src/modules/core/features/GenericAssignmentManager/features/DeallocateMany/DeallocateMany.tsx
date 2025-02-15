import { CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useState } from 'react'
import genricAssignmentService from '../../service/genricAssignmentService'
import { ActionType } from '@ant-design/pro-components'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'

interface DeallocateManyProps<E> {
  entity: string
  entityRecordId: number
  entitySideField: keyof E
  idsToDisassociate: number[]
  actionRef?: ActionType
}

const DeallocateMany = <E,>(props: DeallocateManyProps<E>) => {
  const { entity, entityRecordId, entitySideField, idsToDisassociate, actionRef } = props

  const { translate: t } = useLocale();
  const [isLoding, setIsLoading] = useState(false);

  const buttonStyle = idsToDisassociate.length <= 0 ? {} : { backgroundColor: '#FF9800', borderColor: '#FF9800' }

  const handleDeallocateMany: React.MouseEventHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);

    const { success } = await genricAssignmentService.updateAssociatedRecords({
      entity,
      entityRecordId,
      entitySideField,
      removeMultiple: idsToDisassociate,
    })

    if (success) {
      actionRef?.reload?.();
      actionRef?.clearSelected?.();
    }

    setIsLoading(false);
  }

  return (
    <Button
      onClick={handleDeallocateMany}
      loading={isLoding}
      disabled={isLoding || idsToDisassociate.length <= 0}
      icon={<CloseOutlined />}
      style={buttonStyle}
      type="primary"
    >
      {t('button.allocate_selected')} ({idsToDisassociate.length})
    </Button>
  )
}

export default DeallocateMany
