import { CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useState } from 'react'
import genricAssignmentService from '../../service/genricAssignmentService'
import { ActionType } from '@ant-design/pro-components'

interface DeallocateManyProps {
  owningEntity: string
  owningEntityId: number
  inverseField: string
  inverseIdsToDisassociate: number[]
  actionRef?: ActionType
}

const DeallocateMany: React.FC<DeallocateManyProps> = (props) => {
  const { owningEntity, owningEntityId, inverseField, inverseIdsToDisassociate, actionRef } = props

  const [isLoding, setIsLoading] = useState(false)

  const buttonStyle = props.inverseIdsToDisassociate.length <= 0 ? {} : { backgroundColor: '#FF9800', borderColor: '#FF9800' }

  const handleDeallocateMany: React.MouseEventHandler = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsLoading(true)

    const { success } = await genricAssignmentService.udateAssociatedRecords({
      owningEntity,
      owningEntityId,
      inverseField,
      removeMultiple: inverseIdsToDisassociate,
    })

    if (success) {
      actionRef?.reload?.()
      actionRef?.clearSelected?.()
    }

    setIsLoading(false)
  }

  return (
    <Button
      onClick={handleDeallocateMany}
      loading={isLoding}
      disabled={isLoding || inverseIdsToDisassociate.length <= 0}
      icon={<CloseOutlined />}
      style={buttonStyle}
      type="primary"
    >
      Deallocate Selected ({inverseIdsToDisassociate.length})
    </Button>
  )
}

export default DeallocateMany
