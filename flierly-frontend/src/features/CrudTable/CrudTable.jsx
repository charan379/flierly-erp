import useElementHeight from "@/hooks/useElementHeight";
import useLocale from "@/features/Language/hooks/useLocale";
import { ClearOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { Button, Space, Switch } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Create from "./forms/Create";
import Search from "./forms/Search";
import crudService from "./service/crud.service";
import Delete from "./features/Delete";
import Activate from "./features/Activate";
import RowContextMenu from "./features/RowContextMenu";
import Restore from "./features/Restore";
import useTheme from "../Theme/hooks/useTheme";
import useCrudTableContext from "./hooks/useCrudTableContext";
import Clear from "./features/Clear";

const CrudTable = ({
  entity,
  tableKey,
  rowKey = "_id",
  columns,
  dataSource = [],
  createFormFields,
  createFormInitialValues,
  searchFormFields,
  searchFormInitialValues,
  render = {
    restore: true,
    delete: true,
    activate: true,
    clear: true,
    builtIn: true,
    bin: true,
    search: true,
    create: true,
    view: true,
  },
}) => {
  const { isCompactTheme } = useTheme();

  const tableHeight = useElementHeight("pro-table-filerly-1");

  const { langDirection, translate } = useLocale();

  const [data, setData] = useState(dataSource);

  const { crudTableContextHandler } = useCrudTableContext();

  const actionRef = useRef();

  const handleRowContextMenu = (record, event) => {
    event.preventDefault(); // Prevent default context menu
    crudTableContextHandler.rowMenu.setCurrentRecord(record);
    crudTableContextHandler.rowMenu.setPosition({
      x: event.clientX,
      y: event.clientY,
    });
    crudTableContextHandler.rowMenu.open();
  };

  useEffect(() => {
    return () => {
      crudTableContextHandler.reset()
    }
  }, [])

  return (
    <ProTable
      // classname
      className="pro-table-filerly-1"
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
        y: tableHeight * (isCompactTheme ? 0.7 : 0.58),
      }}
      // columns state configuration
      columnsState={{
        persistenceType: "localStorage",
        persistenceKey: tableKey,
      }}
      // table search configuration
      search={false}
      // row selection configuration
      rowSelection={{
        columnWidth: "3%",
        fixed: true,
        type: "checkbox",
        preserveSelectedRowKeys: true,
      }}
      rowKey={rowKey}
      // Configuration for table alert section
      tableAlertRender={false}
      //  Sorter tooltip configuration
      showSorterTooltip={{
        target: "sorter-icon",
      }}
      // options configuration
      options={{
        density: true,
        fullScreen: true,
        search: false,
        setting: true,
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
      request={async (params, sort, filter) => {
        console.log({ params, sort });
        const { result, success } = await crudService.page({
          entity,
          pagination: { limit: params.pageSize, page: params.current },
        });

        return {
          data: result?.data,
          success: success,
          total: result?.totalResults,
        };
      }}
      // post data came from request
      postData={(data) => {
        setData(data);
      }}
      // on row configuration
      onRow={(record, index) => {
        return {
          onContextMenu: (event) => handleRowContextMenu(record, event),
        };
      }}
      // toolbar controls configuration
      toolBarRender={(action, rows) => [
        // search from
        <Search
          formFields={searchFormFields}
          initialValues={searchFormInitialValues}
          title={translate("search_from")}
          render={render.search}
          actions={action}
        />,
        <div></div>,
        // create from
        <Create
          formFields={createFormFields}
          initialValues={createFormInitialValues}
          title={translate("add_from")}
          render={render.create}
        />,
        <div></div>,
        // restore the selected items
        <Restore
          entity={entity}
          actions={action}
          rows={rows}
          key={"restore_selected"}
          render={render.restore}
        />,
        <div></div>,
        // delete the selected items
        <Delete
          entity={entity}
          actions={action}
          rows={rows}
          key={"delete_selected"}
          render={render.delete}
        />,
        <div></div>,
        // activate | inactivate the selected items
        <Activate
          entity={entity}
          actions={action}
          rows={rows}
          key={"activate_selected"}
          render={render.activate}
        />,
        <div></div>,
        // clear the selection
        <Clear
          actions={action}
          rows={rows}
          render={render.clear}
          key={"clear_selected"}
        />,
        <div></div>,
      ]}
      // toobar
      toolbar={{
        // search: true,
        menu: {
          type: "inline",
          items: [
            {
              label: <Switch />,
              key: "1",
            },
          ],
          onChange: (activeKey) => {
            console.log("activeKey", activeKey);
          },
        },
      }}
      // table extra render components
      tableExtraRender={() => {
        return (
          <RowContextMenu
            entity={entity}
            actions={actionRef.current}
            record={crudTableContextHandler.rowMenu.getCurrentRecord()}
            open={crudTableContextHandler.rowMenu.isOpen()}
            position={crudTableContextHandler.rowMenu.getPosition()}
            close={() => crudTableContextHandler.rowMenu.close()}
          />
        );
      }}
    />
  );
};

export default CrudTable;
