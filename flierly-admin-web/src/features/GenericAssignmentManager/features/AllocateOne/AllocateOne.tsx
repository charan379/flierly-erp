import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useState } from 'react'
import genricAssignmentService from '../../service/genricAssignmentService'
import { ActionType } from '@ant-design/pro-components'

interface AllocateOneProps {
  owningEntity: string
  owningEntityId: number
  inverseField: string
  inverseIdToAssociate: number
  tableActionRef: React.MutableRefObject<ActionType | undefined>
}

const AllocateOne: React.FC<AllocateOneProps> = (props) => {
  const { owningEntity, owningEntityId, inverseField, inverseIdToAssociate, tableActionRef } = props

  const [isLoding, setIsLoading] = useState(false)

  const handleAllocate: React.MouseEventHandler = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsLoading(true)

    const { success } = await genricAssignmentService.udateAssociatedRecords({
      owningEntity,
      owningEntityId,
      inverseField,
      addOne: inverseIdToAssociate,
    })

    if (success) {
      tableActionRef.current?.reload()
    }

    setIsLoading(false)
  }

  return <Button onClick={handleAllocate} loading={isLoding} disabled={isLoding} icon={<PlusOutlined />} type="link" />
}

export default AllocateOne
