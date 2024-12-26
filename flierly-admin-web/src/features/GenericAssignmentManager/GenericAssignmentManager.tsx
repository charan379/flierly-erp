import { useEffect, useRef, useState } from 'react'
import { Tabs, Button } from 'antd'
import { ActionType, ProColumns } from '@ant-design/pro-components'
import useLocale from '../Locale/hooks/useLocale'
import genricAssignmentService from './service/genricAssignmentService'
import { ClearOutlined, SettingTwoTone } from '@ant-design/icons'
import AllocateOne from './features/AllocateOne'
import DeallocateOne from './features/DeallocateOne'
import AllocateMany from './features/AllocateMany'
import DeallocateMany from './features/DeallocateMany'
import { FormFieldConfig } from '@/components/FormField'
import DataTable from './features/DataTable'
import Filter from './features/Filter'

interface GenericAssignmentManagerProps<OE extends { id: number }, IE extends { id: number; disabled?: boolean }> {
  owningEntityRow: OE
  owningEntity: string
  associatedEntity: string
  associatedEntityColumns: ProColumns<IE>[]
  associatedSideField: string
  owningSideField: string
  associatedEntityQueryConfig: {
    label: string
    name: keyof IE
    formField: FormFieldConfig<IE>
  }[]
}

const GenericAssignmentManager = <OE extends { id: number }, IE extends { id: number; disabled?: boolean }>({
  owningEntityRow,
  owningEntity,
  associatedEntity,
  associatedEntityColumns,
  associatedSideField,
  owningSideField,
  associatedEntityQueryConfig,
}: GenericAssignmentManagerProps<OE, IE>) => {
  //
  const [tabKey, setTabKey] = useState<'allocatedItems' | 'availableItems'>('allocatedItems')
  const [allocatedItems, setAllocatedItems] = useState<IE[]>([])
  const [availableItems, setAvailableItems] = useState<IE[]>([])
  const [itemsToAllocate, setItemsToAllocate] = useState<IE[]>([])
  const [itemsToDeallocate, setItemsToDeallocate] = useState<IE[]>([])
  const [allocatedItemsFilter, setAllocatedItemsFilter] = useState({})
  const [availableItemsFilter, setAvailableItemsFilter] = useState({})

  const { translate } = useLocale()

  const allocatedTableTableRef = useRef<ActionType>()
  const availableTableRef = useRef<ActionType>()

  const tableColumns: ProColumns<IE>[] = [
    ...associatedEntityColumns,
    {
      key: 'actions',
      fixed: 'right',
      width: '40px',
      title: <SettingTwoTone />,
      align: 'center',
      render: (_, entity) => {
        if (tabKey === 'allocatedItems') {
          return (
            <DeallocateOne
              owningEntity={owningEntity}
              owningEntityId={owningEntityRow.id}
              inverseField={associatedSideField}
              inverseIdToDisassociate={entity.id}
              tableActionRef={allocatedTableTableRef}
            />
          )
        } else if (tabKey === 'availableItems') {
          return (
            <AllocateOne
              owningEntity={owningEntity}
              owningEntityId={owningEntityRow.id}
              inverseField={associatedSideField}
              inverseIdToAssociate={entity.id}
              tableActionRef={availableTableRef}
            />
          )
        } else {
          return null
        }
      },
    },
  ]

  const handleTabChange = (key: 'allocatedItems' | 'availableItems') => {
    setTabKey(key)
  }

  const handleAllocatedItemsCardClick = (clickedItem: IE) => {
    const isAlreadySelectedToDeallocate = itemsToDeallocate.some((item) => item.id === clickedItem.id)
    if (isAlreadySelectedToDeallocate) {
      setItemsToDeallocate((prev) => prev.filter((item) => item.id !== clickedItem.id))
    } else {
      setItemsToDeallocate((prev) => [...prev, clickedItem])
    }
  }

  const handleAvailableItemsCardClick = (clickedItem: IE) => {
    const isAlreadySelectedToAllocate = itemsToAllocate.some((item) => item.id === clickedItem.id)

    if (isAlreadySelectedToAllocate) {
      setItemsToAllocate((prev) => prev.filter((item) => item.id !== clickedItem.id))
    } else {
      setItemsToAllocate((prev) => [...prev, clickedItem])
    }
  }

  const handleFilter = (filter: { queryField: string; query: any }) => {
    if (tabKey === 'allocatedItems') {
      setAllocatedItemsFilter({ [filter.queryField]: filter.query })
      allocatedTableTableRef.current?.setPageInfo?.({ current: 1, total: 0 })
      allocatedTableTableRef.current?.reload?.()
    }

    if (tabKey === 'availableItems') {
      setAvailableItemsFilter({ [filter.queryField]: filter.query })
      availableTableRef.current?.setPageInfo?.({ current: 1, total: 0 })
      availableTableRef.current?.reload?.()
    }
  }

  const handleFilterReset = () => {
    if (tabKey === 'allocatedItems') {
      setAllocatedItemsFilter({})
      allocatedTableTableRef.current?.setPageInfo?.({ current: 1, total: 0 })
      allocatedTableTableRef.current?.reload?.()
    }

    if (tabKey === 'availableItems') {
      setAvailableItemsFilter({})
      availableTableRef.current?.setPageInfo?.({ current: 1, total: 0 })
      availableTableRef.current?.reload?.()
    }
  }

  useEffect(() => {
    // Wait for a short delay after tab change to ensure the content is rendered
    const timeout = setTimeout(() => {
      allocatedTableTableRef.current?.reload()
      availableTableRef.current?.reload()
    }, 10) // Adjust the delay as needed

    return () => clearTimeout(timeout)
  }, [tabKey])

  return (
    <Tabs
      size='small'
      activeKey={tabKey}
      onChange={(activeKey) => handleTabChange(activeKey as 'allocatedItems' | 'availableItems')}
      style={{ width: '100%', height: '100%' }}
      items={[
        {
          key: 'allocatedItems',
          label: `${translate('allocated')} ${associatedEntity}s`,
          children: (
            <DataTable<IE>
              id="allocated-items-table"
              key={'allocated-items-table'}
              actionRef={allocatedTableTableRef}
              dataSource={allocatedItems}
              columns={tableColumns}
              request={async (params, sort, _filter) => {
                const { result, success } = await genricAssignmentService.relatedEntitiespage<PageData<IE>>({
                  owningEntity,
                  owningEntityId: owningEntityRow.id,
                  inverseEntity: associatedEntity,
                  inverseSideField: owningSideField,
                  owningSideField: associatedSideField,
                  pagination: {
                    limit: params?.pageSize ?? 10,
                    page: params?.current ?? 1,
                  },
                  sort,
                  filters: allocatedItemsFilter,
                })

                return {
                  data: result?.data,
                  success,
                  total: result?.totalResults,
                }
              }}
              postData={(data: IE[]) => {
                setAllocatedItems((_prev) => [...data])
              }}
              rowSelection={{
                preserveSelectedRowKeys: true,
                selectedRowKeys: itemsToDeallocate.map((item) => item.id),
                onChange: (_selectedRowKeys, selectedRows) => {
                  setItemsToDeallocate([...selectedRows])
                },
              }}
              onRow={(item) => ({
                onClick: () => handleAllocatedItemsCardClick(item),
              })}
              toolbar={{
                multipleLine: false,
                className: 'genric-assignment-manager-pro-table-toolbar',
                filter: <Filter<IE> filterConfig={associatedEntityQueryConfig} onFilter={handleFilter} onReset={handleFilterReset} />,
              }}
              toolBarRender={(action, rows) => [
                <DeallocateMany
                  actionRef={action}
                  owningEntity={owningEntity}
                  owningEntityId={owningEntityRow.id}
                  inverseField={associatedSideField}
                  inverseIdsToDisassociate={rows.selectedRowKeys ? rows.selectedRowKeys.filter((id) => Number.isInteger(id)).map(Number) : []}
                />,
                <Button
                  type="primary"
                  style={{ backgroundColor: '#722ed1', borderColor: '#722ed1' }}
                  onClick={() => action?.clearSelected?.()}
                  icon={<ClearOutlined />}
                >
                  Clear Selected
                </Button>,
              ]}
            />
          ),
        },
        {
          key: 'availableItems',
          label: `${translate('available')} ${associatedEntity}s`,
          children: (
            <DataTable<IE>
              id="available-items-table"
              key={'available-items-table'}
              actionRef={availableTableRef}
              dataSource={availableItems}
              columns={tableColumns}
              request={async (params, sort, _filter) => {
                const { result, success } = await genricAssignmentService.relatedEntitiespage<PageData<IE>>({
                  owningEntity,
                  owningEntityId: owningEntityRow.id,
                  inverseEntity: associatedEntity,
                  inverseSideField: owningSideField,
                  owningSideField: associatedSideField,
                  pagination: {
                    limit: params?.pageSize ?? 10,
                    page: params?.current ?? 1,
                  },
                  sort,
                  filters: availableItemsFilter,
                  type: 'unallocated',
                })

                return {
                  data: result?.data,
                  success,
                  total: result?.totalResults,
                }
              }}
              postData={(data: IE[]) => {
                setAvailableItems((_prev) => [...data])
              }}
              rowSelection={{
                preserveSelectedRowKeys: true,
                selectedRowKeys: itemsToAllocate.map((item) => item.id),
                getCheckboxProps: (item) => {
                  return {
                    disabled: item?.disabled,
                  }
                },
                onChange: (_selectedRowKeys, selectedRows) => {
                  setItemsToAllocate([...selectedRows])
                },
              }}
              onRow={(item) => ({
                onClick: () => handleAvailableItemsCardClick(item),
              })}
              toolbar={{
                multipleLine: false,
                className: 'genric-assignment-manager-pro-table-toolbar',
                filter: <Filter<IE> filterConfig={associatedEntityQueryConfig} onFilter={handleFilter} onReset={handleFilterReset} />,
              }}
              toolBarRender={(action, rows) => [
                <AllocateMany
                  actionRef={action}
                  owningEntity={owningEntity}
                  owningEntityId={owningEntityRow.id}
                  inverseField={associatedSideField}
                  inverseIdsToAssociate={rows.selectedRowKeys ? rows.selectedRowKeys.filter((id) => Number.isInteger(id)).map(Number) : []}
                />,
                <Button
                  type="primary"
                  style={{ backgroundColor: '#722ed1', borderColor: '#722ed1' }}
                  onClick={() => action?.clearSelected?.()}
                  icon={<ClearOutlined />}
                >
                  Clear Selected
                </Button>,
              ]}
            />
          ),
        },
      ]}
    ></Tabs>
  )
}

export default GenericAssignmentManager
