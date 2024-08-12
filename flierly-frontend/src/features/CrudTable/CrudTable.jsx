import useElementHeight from "@/hooks/useElementHeight";
import useLocale from "@/locale/useLocale";
import {
  ClearOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { Button, message, Popconfirm } from "antd";
import React, { useRef, useState } from "react";
import Create from "./components/forms/Create";
import Search from "./components/forms/Search";

const CrudTable = ({
  tableKey,
  rowKey = "_id",
  columns,
  dataSource,
  createFormFields,
  searchFormFields,
}) => {
  const tableHeight = useElementHeight("pro-table-filerly-1");

  const { langDirection, translate } = useLocale();

  const [data, setData] = useState(dataSource);

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
        search: false,
        setting: true,
      }}
      // action ref to trigger actions
      actionRef={actionRef}
      // pagination configuration
      pagination={{ pageSize: 20 }}
      // columns
      columns={columns}
      // datasource
      dataSource={data}
      // data request
      request={async (params, sort, filter) => {
        console.log({ params, sort, filter });
        return {
          data: [{
            _id: "1",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
          },
          {
            _id: "2",
            name: "Jim Green",
            age: 42,
            address: "London No. 1 Lake Park",
            tags: ["loser"],
          },],
          success: true,
          total: 2,
        };
      }}
      // post data came from request 
      postData={(data) => setData(data)}
      // toolbar controls configuration
      toolBarRender={(action, rows) => [
        // search from
        <Search formFields={searchFormFields} title={translate("search_from")} />,
        // create from
        <Create formFields={createFormFields} title={translate("add_from")} />,
        // delete the selected items
        <Popconfirm
          title={translate("delete_selected")}
          description={`${translate("delete_selected_items")} ${rows.selectedRowKeys.length}`}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          okButtonProps={{ danger: true, icon: <DeleteOutlined /> }}
          okText={translate("delete")}
          cancelText={translate("cancel")}
          cancelButtonProps={{ type: "primary" }}
          onCancel={() => message.warning(translate("request_cancelled"))}
          onConfirm={() => message.success(`${rows.selectedRowKeys.length} rows ${translate("deleted_sucessfully")}`)}
        >
          <Button
            type="primary"
            danger
            key={`delete-selected-rows-trigger`}
            icon={<DeleteOutlined />}
            disabled={rows.selectedRowKeys.length <= 0}
          >
            {`${translate("delete")} ${rows.selectedRowKeys.length > 0 ? rows.selectedRowKeys.length : ""}`}
          </Button>
        </Popconfirm>,
        // clear the selection
        <Button
          type="primary"
          key={`clear-selected-rows-trigger`}
          icon={<ClearOutlined />}
          disabled={rows.selectedRowKeys.length <= 0}
          onClick={() => actionRef.current.clearSelected()}
        >
          {`${translate("clear")} ${rows.selectedRowKeys.length > 0 ? rows.selectedRowKeys.length : ""}`}
        </Button>,
      ]}
    />
  );
};

export default CrudTable;
