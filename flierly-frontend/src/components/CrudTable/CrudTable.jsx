import useElementHeight from "@/hooks/useElementHeight";
import useLocale from "@/locale/useLocale";
import { ClearOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import React, { useRef } from "react";
import DrawerForm from "./componenets/DrawerFrom/DrawerForm";

const CrudTable = ({
  tableKey,
  rowKey = "_id",
  columns,
  dataSource,
  addFrom,
}) => {
  const tableHeight = useElementHeight("pro-table-filerly-1");

  const { langDirection, translate } = useLocale();

  const actionRef = useRef();

  return (
    <ProTable
      // classname
      className="pro-table-filerly-1"
      // table design configuration
      bordered={true}
      style={{
        width: "100%",
      }}
      scroll={{
        scrollToFirstRowOnChange: true,
        x: 1300,
        y: tableHeight * 0.7,
      }}
      //   size="large"
      // columns state configuration
      columnsState={{
        persistenceType: "localStorage",
        persistenceKey: tableKey,
      }}
      // table search configuration
      search={false}
      // row selection configuration
      rowSelection={{
        columnWidth: "10px",
        fixed: true,
        type: "checkbox",
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
        search: true,
        setting: true,
      }}
      // action ref to trigger actions
      actionRef={actionRef}
      // pagination configuration
      pagination={{ pageSize: 20 }}
      // datasource
      dataSource={dataSource}
      // columns
      columns={columns}
      // data request
      request={(params, sort, filter) => {
        console.log({ params, sort, filter });
        return {
          data: dataSource.map((row) => {
            return row;
          }),
          success: true,
          total: data.length,
        };
      }}
      // toolbar controls configuration
      toolBarRender={(action, rows) => [
        // add from
        <DrawerForm form={addFrom} title={translate("add_from")} />,
        // delete the selected items
        <Button
          type="primary"
          danger
          key={`delete-selected-rows-trigger`}
          icon={<DeleteOutlined />}
          disabled={rows.selectedRowKeys.length <= 0}
        >
          {`${translate("delete")} ${
            rows.selectedRowKeys.length > 0 ? rows.selectedRowKeys.length : ""
          }`}
        </Button>,
        // clear the selection
        <Button
          type="primary"
          key={`clear-selected-rows-trigger`}
          icon={<ClearOutlined />}
          disabled={rows.selectedRowKeys.length <= 0}
          onClick={() => actionRef.current.clearSelected()}
        >
          {`${translate("clear")} ${
            rows.selectedRowKeys.length > 0 ? rows.selectedRowKeys.length : ""
          }`}
        </Button>,
      ]}
    />
  );
};

export default CrudTable;
