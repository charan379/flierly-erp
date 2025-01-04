import { createDescriptionColumn, createEntityColumn, createIdColumn, createNameColumn, createTimeStampColumn } from '@/utils/create-tablecolumn'
import { ProColumns } from '@ant-design/pro-components'
import { Tag } from 'antd'

const createTagMetadataTableColumns = (translate: (value: string) => string): ProColumns<TagMetadata>[] => {
    return [
        // id
        createIdColumn(translate),
        // name
        createNameColumn(translate, { width: 200 }),
        // entity
        createEntityColumn(translate),
        // access
        {
            title: translate('TagMetadata.datatype'),
            dataIndex: 'datatype',
            key: 'datatype',
            width: 100,
            align: 'center',
            render: (_dom, entity) => {
                switch (entity.datatype) {
                    case 'string':
                        return <Tag color="#50C878">{entity.datatype}</Tag>
                    case 'boolean':
                        return <Tag color="#008080">{entity.datatype}</Tag>
                    case 'enum':
                        return <Tag color="#FF7F50">{entity.datatype}</Tag>
                    case 'number':
                        return <Tag color="#191970">{entity.datatype}</Tag>
                    default:
                        return <Tag>{entity.datatype}</Tag>
                }
            },
        },
        // description
        createDescriptionColumn(translate, { width: 250 }),
        // updatedAt
        createTimeStampColumn(translate,
            {
                dataIndex: 'updatedAt',
                title: translate('updated_at')
            }
        ),
        // createdAt
        createTimeStampColumn(translate,
            {
                dataIndex: 'createdAt',
                title: translate('created_at')
            }
        ),
        // deletedAt
        createTimeStampColumn(translate,
            {
                dataIndex: 'deletedAt',
                title: translate('deleted_at')
            }
        ),
    ]
}

export default createTagMetadataTableColumns
