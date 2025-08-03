import useElementHeightByClassName from '@/modules/core/hooks/useElementHeightByClassName'
import { ProTable, ProTableProps } from '@ant-design/pro-components'

interface DataTableProps<T>
  extends Omit<
    ProTableProps<T, any>,
    'rowKey' | 'size' | 'options' | 'tableAlertRender' | 'style' | 'pagination' | 'search' | 'scroll' | 'showSorterTooltip' | 'bordered'
  > {
  id: string
}

const DataTable = <T extends Record<string, any>>(props: DataTableProps<T>) => {
  const tableHeight = useElementHeightByClassName('generic-assignment-manager-data-table', { fallbackHeight: 300 })
  const tableHeadHeight = useElementHeightByClassName('ant-table-thead')
  const tableToolbarHeight = useElementHeightByClassName('ant-pro-table-list-toolbar')
  const tablePaginationHeight = useElementHeightByClassName('ant-table-pagination')

  return (
    <ProTable<T>
      rowKey={'id'}
      key={props.id}
      className="generic-assignment-manager-data-table"
      bordered
      size="middle"
      options={{ density: false, fullScreen: false, reload: false, setting: false, search: false }}
      tableAlertRender={false}
      style={{
        width: '100%',
        height: '80dvh',
      }}
      // pagination configuration
      pagination={{
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 20, 25, 50],
        defaultPageSize: 10,
        responsive: true,
        size: 'small',
      }}
      search={false}
      // scroll configuration
      scroll={{
        scrollToFirstRowOnChange: true,
        x: 800,
        y: tableHeight - tableToolbarHeight - tableHeadHeight - tablePaginationHeight - 60,
      }}
      showSorterTooltip={false}
      {...props}
    />
  )
}

export default DataTable
