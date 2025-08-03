import { createDescriptionColumn, createEntityColumn, createIdColumn, createNameColumn, createTimeStampColumn } from '@/modules/core/utils/create-tablecolumn'
import { ProColumns } from '@ant-design/pro-components'
import { Tag } from 'antd'

const createTagMetadataTableColumns = (t: (value: string) => string): ProColumns<TagMetadata>[] => {
    return [
        // id
        createIdColumn(t),
        // name
        createNameColumn(t, { width: 200 }),
        // entity
        createEntityColumn(t),
        // access
        {
            title: t('TagMetadata.datatype'),
            dataIndex: 'datatype',
            key: 'datatype',
            width: 100,
            align: 'center',
            render: (_dom, record) => {
                switch (record.datatype) {
                    case 'string':
                        return <Tag color="#50C878">{record.datatype}</Tag>
                    case 'boolean':
                        return <Tag color="#008080">{record.datatype}</Tag>
                    case 'enum':
                        return <Tag color="#FF7F50">{record.datatype}</Tag>
                    case 'number':
                        return <Tag color="#191970">{record.datatype}</Tag>
                    default:
                        return <Tag>{record.datatype}</Tag>
                }
            },
        },
        // description
        createDescriptionColumn(t, { width: 250 }),
        // updatedAt
        createTimeStampColumn(t,
            {
                dataIndex: 'updatedAt',
                title: t('record.updated_at')
            }
        ),
        // createdAt
        createTimeStampColumn(t,
            {
                dataIndex: 'createdAt',
                title: t('record.created_at')
            }
        ),
        // deletedAt
        createTimeStampColumn(t,
            {
                dataIndex: 'deletedAt',
                title: t('record.deleted_at')
            }
        ),
    ]
}

export default createTagMetadataTableColumns
