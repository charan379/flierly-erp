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
import { QueryFieldConfig } from '@/modules/core/components/QueryField'
import DataTable from './features/DataTable'
import Filter from './features/Filter'

interface AssociatedEntitiesManagerProps<E extends { id: number }, AE extends { id: number; disabled?: boolean }> {
  entityRecord: E
  entity: string
  associatedEntity: string
  associatedEntityColumns: ProColumns<AE>[]
  associatedSideField: keyof AE
  entitySideField: keyof E
  associatedEntityQueryConfig: {
    label: string
    name: keyof AE
    queryField: QueryFieldConfig<AE>
  }[]
}

const GenericAssociationManager = <E extends { id: number }, AE extends { id: number; disabled?: boolean }>({
  entityRecord,
  entity,
  associatedEntity,
  associatedEntityColumns,
  associatedSideField,
  entitySideField,
  associatedEntityQueryConfig,
}: AssociatedEntitiesManagerProps<E, AE>) => {
  //
  const [tabKey, setTabKey] = useState<'allocatedItems' | 'availableItems'>('allocatedItems')
  const [allocatedItems, setAllocatedItems] = useState<AE[]>([])
  const [availableItems, setAvailableItems] = useState<AE[]>([])
  const [itemsToAllocate, setItemsToAllocate] = useState<AE[]>([])
  const [itemsToDeallocate, setItemsToDeallocate] = useState<AE[]>([])
  const [allocatedItemsFilter, setAllocatedItemsFilter] = useState<Partial<Record<keyof AE, any>>>({})
  const [availableItemsFilter, setAvailableItemsFilter] = useState<Partial<Record<keyof AE, any>>>({})

  const { translate: t } = useLocale()

  const allocatedTableTableRef = useRef<ActionType>()
  const availableTableRef = useRef<ActionType>()

  const tableColumns: ProColumns<AE>[] = [
    ...associatedEntityColumns,
    {
      key: 'actions',
      fixed: 'right',
      width: '40px',
      title: <SettingTwoTone />,
      align: 'center',
      render: (_, row) => {
        if (tabKey === 'allocatedItems') {
          return (
            <DeallocateOne<E>
              entity={entity}
              entityRecordId={entityRecord.id}
              entitySideField={entitySideField}
              idToDisassociate={row.id}
              tableActionRef={allocatedTableTableRef}
            />
          )
        } else if (tabKey === 'availableItems') {
          return (
            <AllocateOne<E>
              entity={entity}
              entityRecordId={entityRecord.id}
              entitySideField={entitySideField}
              idToAssociate={row.id}
              tableActionRef={availableTableRef}
            />
          )
        } else {
          return null;
        }
      },
    },
  ]

  const handleTabChange = (key: 'allocatedItems' | 'availableItems') => {
    setTabKey(key);
  }

  const handleAllocatedItemsCardClick = (clickedItem: AE) => {
    const isAlreadySelectedToDeallocate = itemsToDeallocate.some((item) => item.id === clickedItem.id)
    if (isAlreadySelectedToDeallocate) {
      setItemsToDeallocate((prev) => prev.filter((item) => item.id !== clickedItem.id));
    } else {
      setItemsToDeallocate((prev) => [...prev, clickedItem]);
    }
  }

  const handleAvailableItemsCardClick = (clickedItem: AE) => {
    const isAlreadySelectedToAllocate = itemsToAllocate.some((item) => item.id === clickedItem.id)

    if (isAlreadySelectedToAllocate) {
      setItemsToAllocate((prev) => prev.filter((item) => item.id !== clickedItem.id));
    } else {
      setItemsToAllocate((prev) => [...prev, clickedItem]);
    }
  }

  const handleFilter = (filter: { queryField: keyof AE; query: any }) => {
    // console.log('Filter applied:', filter, 'Current tab:', tabKey);

    if (tabKey === 'allocatedItems') {
      setAllocatedItemsFilter((prev) => ({ ...prev, [filter.queryField]: filter.query }));
      allocatedTableTableRef.current?.setPageInfo?.({ current: 1, total: 0 });
      allocatedTableTableRef.current?.reload?.();
    }

    if (tabKey === 'availableItems') {
      setAvailableItemsFilter((prev) => ({ ...prev, [filter.queryField]: filter.query }));
      availableTableRef.current?.setPageInfo?.({ current: 1, total: 0 });
      availableTableRef.current?.reload?.();
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
          label: `${t('title.allocated_records')} ${associatedEntity}s`,
          children: (
            <DataTable<AE>
              id="allocated-items-table"
              key={'allocated-items-table'}
              actionRef={allocatedTableTableRef}
              dataSource={allocatedItems}
              columns={tableColumns}
              request={async (params, sort, _filter) => {
                const { result, success } = await genricAssignmentService.associatedEntityPage<E, AE>({
                  entity,
                  entityRecordId: entityRecord.id,
                  associatedEntity,
                  entitySideField,
                  associatedSideField,
                  limit: params?.pageSize ?? 10,
                  page: params?.current ?? 1,
                  sort: {
                    property: Object.keys(sort)[0],
                    order: Object.values(sort)[0] === 'ascend' ? 'asc' : 'desc',
                  },
                  filters: allocatedItemsFilter,
                })

                return {
                  data: result?.data,
                  success,
                  total: result?.totalResults,
                }
              }}
              postData={(data: AE[]) => {
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
                filter: <Filter<AE> filterConfig={associatedEntityQueryConfig} onFilter={handleFilter} onReset={handleFilterReset} />,
              }}
              toolBarRender={(action, rows) => [
                <DeallocateMany<E>
                  actionRef={action}
                  entity={entity}
                  entityRecordId={entityRecord.id}
                  entitySideField={entitySideField}
                  idsToDisassociate={rows.selectedRowKeys ? rows.selectedRowKeys.filter((id) => Number.isInteger(id)).map(Number) : []}
                />,
                <Button
                  type="primary"
                  style={{ backgroundColor: '#722ed1', borderColor: '#722ed1' }}
                  onClick={() => action?.clearSelected?.()}
                  icon={<ClearOutlined />}
                >
                  {t('button.clear')}
                </Button>,
              ]}
            />
          ),
        },
        {
          key: 'availableItems',
          label: `${t('title.unallocated_records')} ${associatedEntity}s`,
          children: (
            <DataTable<AE>
              id="available-items-table"
              key={'available-items-table'}
              actionRef={availableTableRef}
              dataSource={availableItems}
              columns={tableColumns}
              request={async (params, sort, _filter) => {
                const { result, success } = await genricAssignmentService.associatedEntityPage<E, AE>({
                  entity,
                  entityRecordId: entityRecord.id,
                  associatedEntity,
                  entitySideField,
                  associatedSideField,
                  limit: params?.pageSize ?? 10,
                  page: params?.current ?? 1,
                  sort: {
                    property: Object.keys(sort)[0],
                    order: Object.values(sort)[0] === 'ascend' ? 'asc' : 'desc',
                  },
                  filters: availableItemsFilter,
                  type: 'unallocated',
                })

                return {
                  data: result?.data,
                  success,
                  total: result?.totalResults,
                }
              }}
              postData={(data: AE[]) => {
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
                filter: <Filter<AE> filterConfig={associatedEntityQueryConfig} onFilter={handleFilter} onReset={handleFilterReset} />,
              }}
              toolBarRender={(action, rows) => [
                <AllocateMany<E>
                  actionRef={action}
                  entity={entity}
                  entityRecordId={entityRecord.id}
                  entitySideField={entitySideField}
                  idsToAssociate={rows.selectedRowKeys ? rows.selectedRowKeys.filter((id) => Number.isInteger(id)).map(Number) : []}
                />,
                <Button
                  type="primary"
                  style={{ backgroundColor: '#722ed1', borderColor: '#722ed1' }}
                  onClick={() => action?.clearSelected?.()}
                  icon={<ClearOutlined />}
                >
                  {t("button.clear")}
                </Button>,
              ]}
            />
          ),
        },
      ]}
    ></Tabs>
  )
}

export default GenericAssociationManager
