import React, { Suspense, useRef, useState } from 'react'
import { Badge, Button, Tooltip } from 'antd'
import { ActionType, PageLoading } from '@ant-design/pro-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import useCrudModuleContext from '../../../CrudModule/hooks/useCrudModuleContext'
import ResizableDrawer from '@/modules/core/components/ResizableDrawer'
import QueryBuilder, { QueryBuilderFieldConfig, QueryBuilderRef } from '../../../QueryBuilder/QueryBuilder'


// Define types for the component props
interface SearchProps {
  title?: string // Optional title for the drawer
  render: boolean // A boolean to control the rendering of the component
  actions: ActionType | undefined
  queryBuilderFieldsConfig?: QueryBuilderFieldConfig<any>[]
};

const Search: React.FC<SearchProps> = ({ title = 'filter_data', render, actions, queryBuilderFieldsConfig: queryFieldsConfig }) => {

  const { translate: t } = useLocale()
  const { CrudModuleContextHandler } = useCrudModuleContext()
  const queryBuilderRef = useRef<QueryBuilderRef | null>(null)

  const [drawerOpen, setDrawerOpen] = useState(false)

  if (!render || !actions || !queryFieldsConfig) return null

  const onApplyFilters = () => {
    // Simulate filter application
    if (queryBuilderRef?.current) {
      const query = queryBuilderRef.current.getQuery()
      const currentConditions = queryBuilderRef.current.getConditions()
      CrudModuleContextHandler.conditions.set(currentConditions)
      CrudModuleContextHandler.filters.replace(query)
      actions?.setPageInfo?.({ current: 1, total: 0 })
      actions.reload()
      setDrawerOpen(false) // Close the drawer after applying filters
    }
  };

  const onResetFilters = () => {
    if (queryBuilderRef?.current) {
      queryBuilderRef.current.resetQuery()
      CrudModuleContextHandler.filters.reset()
      actions?.setPageInfo?.({ current: 1, total: 0 })
      actions.reload()
      setDrawerOpen(false) // Close the drawer after reset
    }
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  return (
    <ResizableDrawer
      title={title}
      open={drawerOpen}
      onClose={handleDrawerClose}
      onOpen={handleDrawerOpen}
      trigger={
        <Tooltip title={t('tooltip.apply_filters')}>
          <Badge count={Object.keys(CrudModuleContextHandler.filters.get()).length} overflowCount={99}>
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faFilter} />}
              shape="circle"
              size="small"
              style={{ backgroundColor: '#722ed1' }}
              disabled={queryFieldsConfig?.length > 0 ? false : true}
            />
          </Badge>
        </Tooltip>
      }
      minWidth={400}
      initialWidth={700}
      maxWidth={window.innerWidth * 0.9}
      destroyOnClose={true}
      styles={{
        body: { padding: '0px 10px' },
      }}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 16 }}>
          <Button onClick={onResetFilters} danger>
            {t('button.rest')}
          </Button>
          <Button type="default" onClick={handleDrawerClose} style={{ marginLeft: 8 }}>
            {t('button.cancel')}
          </Button>
          <Button type="primary" onClick={onApplyFilters} style={{ marginLeft: 8 }}>
            {t('button.search')}
          </Button>
        </div>
      }
    >
      <Suspense name="queryBuilder-suspense-wrap" fallback={<PageLoading />}>
        <QueryBuilder config={queryFieldsConfig} ref={queryBuilderRef} initialConditions={CrudModuleContextHandler.conditions.get()} />
      </Suspense>
    </ResizableDrawer>
  )
}

export default Search
