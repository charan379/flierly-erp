import useElementHeight from "@/hooks/useElementHeight";
import useLocale from "@/locale/useLocale";
import {
  ClearOutlined,
} from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import React, { useRef, useState } from "react";
import Create from "./forms/Create";
import Search from "./forms/Search";
import { useTheme } from "@/theme/useTheme";
import crudService from "./service/crud.service";
import DeleteMany from "./actions/DeleteMany";
import ActivateMany from "./actions/ActivateMany";

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
}) => {
  const { isCompactTheme } = useTheme();

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
        columnWidth: "5px",
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
        // console.log({ params, sort, filter });

        const { result, success } = await crudService.page({
          entity,
          pagination: { limit: params.pageSize, page: params.current },
        });

        // console.log({ result, success });

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
      // toolbar controls configuration
      toolBarRender={(action, rows) => [
        // search from
        <Search formFields={searchFormFields} initialValues={searchFormInitialValues} title={translate("search_from")} />,
        // create from
        <Create formFields={createFormFields} initialValues={createFormInitialValues} title={translate("add_from")} />,
        // delete the selected items
        <DeleteMany entity={entity} action={action} rows={rows} key={"delete_selected"} />,
        // activate | inactivate the selected items
        <ActivateMany entity={entity} action={action} rows={rows} key={"activate_selected"} />,
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
