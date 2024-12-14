import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react'
import genricAssignmentService from '../../service/genricAssignmentService';
import { ActionType } from '@ant-design/pro-components';

interface AllocateManyProps {
    owningEntity: string
    owningEntityId: number,
    inverseField: string,
    inverseIdsToAssociate: number[],
    actionRef?: ActionType
}

const AllocateMany: React.FC<AllocateManyProps> = (props) => {

    const { owningEntity, owningEntityId, inverseField, inverseIdsToAssociate, actionRef } = props;

    const [isLoding, setIsLoading] = useState(false);

    const buttonStyle =
        props.inverseIdsToAssociate.length <= 0
            ? {}
            : { backgroundColor: "#009688", borderColor: "#009688" };

    const handleAllocateMany: React.MouseEventHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsLoading(true);

        const { success } = await genricAssignmentService.udateAssociatedRecords({
            owningEntity,
            owningEntityId,
            inverseField,
            addMultiple: inverseIdsToAssociate
        })

        if (success) {
            actionRef?.reload?.();
            actionRef?.clearSelected?.();
        }

        setIsLoading(false);
    }

    return (
        <Button
            onClick={handleAllocateMany}
            loading={isLoding}
            disabled={isLoding || inverseIdsToAssociate.length <= 0}
            icon={<PlusOutlined />}
            style={buttonStyle}
            type='primary'
        >
            Allocate Selected ({inverseIdsToAssociate.length})
        </Button>
    )
}

export default AllocateMany