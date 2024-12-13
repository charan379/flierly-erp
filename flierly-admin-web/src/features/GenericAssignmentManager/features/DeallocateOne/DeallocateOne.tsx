import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react'
import genricAssignmentService from '../../service/genricAssignmentService';
import { ActionType } from '@ant-design/pro-components';

interface DeallocateOneProps {
    owningEntity: string
    owningEntityId: number,
    inverseField: string,
    inverseIdToDisassociate: number,
    tableActionRef: React.MutableRefObject<ActionType | undefined>
}

const DeallocateOne: React.FC<DeallocateOneProps> = (props) => {

    const { owningEntity, owningEntityId, inverseField, inverseIdToDisassociate, tableActionRef } = props;

    const [isLoding, setIsLoading] = useState(false);

    const handleDeallocate: React.MouseEventHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsLoading(true);

        const { success } = await genricAssignmentService.udateAssociatedRecords({
            owningEntity,
            owningEntityId,
            inverseField,
            removeOne: inverseIdToDisassociate
        })

        if (success) {
            tableActionRef.current?.reload();
        }

        setIsLoading(false);
    }

    return (
        <Button
            onClick={handleDeallocate}
            loading={isLoding}
            disabled={isLoding}
            icon={<CloseOutlined />}
            type='link'
        />
    )
}

export default DeallocateOne