import { useState, useRef } from "react";
import useElementHeightByClassName from "@/hooks/useElementHeightByClassName";
import useLocale from "@/features/Locale/hooks/useLocale";
import { ProTable, ProColumns, ActionType } from "@ant-design/pro-components";
import Create from "./forms/Create";
import Delete from "./features/Delete";
import Activate from "./features/Activate";
import RowContextMenu from "./features/RowContextMenu";
import Restore from "./features/Restore";
import Clear from "./features/Clear";
import BinModeToggle from "./features/BinModeToggle";
import Update from "./forms/Update";
import useCrudTableContext from "./hooks/useCrudTableContext/useCrudTableContext";
import crudService from "./service/crudService";
import Search from "./forms/Search";
import { FormFieldConfig } from "@/components/FormField";

interface CrudTableProps<T = Record<string, any>> {
  entity: string;
  tableKey: string;
  rowKey?: keyof T;
  rowTitleKey?: keyof T;
  columns: ProColumns<T>[];
  dataSource?: T[];
  createFormFields?: FormFieldConfig<T>[];
  updateFormFields?: FormFieldConfig<T>[];
  searchFormFields?: React.ReactNode;
  rowSelectionColumnWidth?: string;
  render: {
    restore: boolean;
    delete: boolean;
    activate: boolean;
    clear: boolean;
    builtIn: {
      options: {
        density: boolean;
        fullScreen: boolean;
        search: boolean;
        setting: boolean;
        reload: boolean;
      };
    };
    bin: boolean;
    search: boolean;
    create: boolean;
    update: boolean;
    view: boolean;
    menu: boolean;
  };
}

const CrudTable = <T extends Record<string, any>>({
  entity,
  tableKey,
  rowKey = "id" as keyof T,
  rowTitleKey = "name" as keyof T,
  columns,
  dataSource = [],
  createFormFields,
  updateFormFields,
  rowSelectionColumnWidth = "3%",
  render,
}: CrudTableProps<T>) => {
  const tableHeight = useElementHeightByClassName("crud-data-table-flierly-1");
  const tableHeadHeight = useElementHeightByClassName("ant-table-thead");
  const tableToolbarHeight = useElementHeightByClassName("ant-pro-table-list-toolbar");
  const tablePaginationHeight = useElementHeightByClassName("ant-table-pagination");

  const { translate } = useLocale();

  const [data, setData] = useState<T[]>(dataSource);

  const { crudTableContextHandler } = useCrudTableContext();

  const actionRef = useRef<ActionType>();

  const handleRowContextMenu = (record: T, event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default context menu
    crudTableContextHandler.rowMenu.setCurrentRecord(record);
    crudTableContextHandler.rowMenu.setPosition({
      x: event.clientX,
      y: event.clientY,
    });
    crudTableContextHandler.rowMenu.open();
  };

  return (
    <ProTable<T>
      // classname
      className="crud-data-table-flierly-1"
      // table design configuration
      bordered={true}
      style={{
        width: "100%",
        height: "100%",
      }}
      // scroll configuration
      scroll={{
        scrollToFirstRowOnChange: true,
        x: 1300,
        y:
          tableHeight -
          tableToolbarHeight -
          tableHeadHeight -
          tablePaginationHeight -
          25,
      }}
      // columns state configuration
      columnsState={{
        persistenceType: "localStorage",
        persistenceKey: `${tableKey}_columns`,
      }}
      // table search configuration
      search={false}
      // row selection configuration
      rowSelection={{
        columnWidth: rowSelectionColumnWidth,
        fixed: true,
        type: "checkbox",
        preserveSelectedRowKeys: true,
      }}
      rowKey={rowKey as string}
      // Configuration for table alert section
      tableAlertRender={false}
      //  Sorter configuration
      showSorterTooltip={{ target: "sorter-icon" }}
      sortDirections={["ascend", "descend"]}
      // options configuration
      options={{
        ...render.builtIn.options,
      }}
      // action ref to trigger actions
      actionRef={actionRef}
      // pagination configuration
      pagination={{
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 20, 30, 50, 100],
        defaultPageSize: 10,
      }}
      // columns
      columns={columns}
      // datasource
      dataSource={data}
      // data request
      request={async (params, sort) => {
        const { result, success } = await crudService.page({
          entity,
          filters: crudTableContextHandler.filters.get(),
          pagination: { limit: params?.pageSize ?? 10, page: params?.current ?? 1 },
          sort: sort,
          binMode: crudTableContextHandler.binMode.isActive(),
        });

        return {
          data: result?.data,
          success: success,
          total: result?.totalResults,
        };
      }}
      // post data came from request
      postData={(data: T[]) => {
        setData(data);
      }}
      // on row configuration
      onRow={(record) => {
        return {
          onContextMenu: (event: React.MouseEvent) => handleRowContextMenu(record, event),
        };
      }}
      // toolbar controls configuration
      toolBarRender={(action, rows) => [
        <Search
          actions={action}
          render={render.search}
          title="search" />,
        <div></div>,
        <Create<T>
          entity={entity}
          formFields={createFormFields}
          title={translate("add_from")}
          render={render.create}
          actions={action}
        />,
        <div></div>,
        <Update<T>
          entity={entity}
          formFields={updateFormFields}
          data={crudTableContextHandler.updateForm.getData()}
          id={crudTableContextHandler.updateForm.getId()}
          isOpen={crudTableContextHandler.updateForm.isOpen()}
          title={translate("update_form")}
          render={render.update}
          actions={action}
          close={() => crudTableContextHandler.updateForm.close()}
        />,
        <div></div>,
        <Restore
          entity={entity}
          actions={action}
          rows={rows}
          key={"restore_selected"}
          render={render.restore}
        />,
        <div></div>,
        <Delete
          entity={entity}
          actions={action}
          rows={rows}
          key={"delete_selected"}
          render={render.delete}
        />,
        <div></div>,
        <Activate
          entity={entity}
          actions={action}
          rows={rows}
          key={"activate_selected"}
          render={render.activate}
        />,
        <div></div>,
        <Clear
          actions={action}
          rows={rows}
          render={render.clear}
          key={"clear_selected"}
        />,
        <div></div>,
      ]}
      // toolbar
      toolbar={{
        menu: {
          type: "inline",
          items: [
            {
              label: (
                <BinModeToggle
                  render={render.bin}
                  actions={actionRef.current}
                  isActive={crudTableContextHandler.binMode.isActive()}
                  activate={() => crudTableContextHandler.binMode.activate()}
                  deactivate={() =>
                    crudTableContextHandler.binMode.deactivate()
                  }
                />
              ),
              key: "1",
            },
          ],
        },
      }}
      // table extra render components
      tableExtraRender={() => (
        <RowContextMenu
          render={render.menu}
          entity={entity}
          recordTitleKey={rowTitleKey as string}
          actions={actionRef.current}
          record={crudTableContextHandler.rowMenu.getCurrentRecord()}
          open={crudTableContextHandler.rowMenu.isOpen()}
          position={crudTableContextHandler.rowMenu.getPosition()}
          close={() => crudTableContextHandler.rowMenu.close()}
        />
      )}
    />
  );
};

export default CrudTable;
