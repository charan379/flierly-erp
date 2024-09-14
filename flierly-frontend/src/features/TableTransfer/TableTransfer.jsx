import { ProTable } from "@ant-design/pro-components";
import { Transfer } from "antd";
import { difference, uniqBy } from "lodash";
import React, { useEffect, useState } from "react";
import tableTransferService from "./service";
import privilegeColumns from "@/modules/iam/config/privilegeColumns";
import Search from "./forms/Search";
import useTableTransferContext from "./hooks/useTableTransferContext";

const TableTransfer = () => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [totalDataSource, setTotalDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  // const { tableTransferContextHandler: context } = useTableTransferContext();

  // Fetch data from the service
  const fetchleftData = async ({ pager } = { pager: pagination }) => {
    // context.startLoading();
    setLoading(true);
    console.log(pager);
    const response = await tableTransferService.entityPage({
      entity: "privilege",
      pagination: {
        page: pager.current,
        limit: pager.pageSize,
      },
    });

    // context.pagination.setTotal(response?.result?.totalResults);
    setPagination((prev) => ({ ...prev, total: response.result.totalResults }));

    if (Array.isArray(response?.result?.data)) {
      setDataSource(response.result.data);
      setTotalDataSource(
        uniqBy(totalDataSource.concat(response.result.data), "_id")
      );
    }

    // context.stopLoading();
    setLoading(false);
  };

  useEffect(() => {
    fetchleftData();
  }, []);

  const columnsToInclude = ["name", "model", "access"];
  const columns = privilegeColumns.filter((column) =>
    columnsToInclude.includes(column.dataIndex)
  );

  return (
    <Transfer
      dataSource={dataSource}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      showSearch={false}
      rowKey={(record) => record._id}
      showSelectAll={true}
    >
      {({
        direction,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const rowSelection = {
          getCheckboxProps: (item) => ({
            disabled:
              direction === "left" ? listDisabled || item.disabled : false,
          }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter((item) => !item.disabled)
              .map(({ _id }) => _id);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ _id }, selected) {
            onItemSelect(_id, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        const rightDataSource = totalDataSource.filter((item) =>
          targetKeys.includes(item._id)
        );

        const leftDataSource = dataSource.map((item) => ({
          ...item,
          disabled: targetKeys.includes(item._id),
        }));

        return (
          <ProTable
            rowSelection={{
              ...rowSelection,
              columnWidth: "8%",
              fixed: true,
              type: "checkbox",
              alwaysShowAlert: false,
            }}
            options={{
              density: false,
              fullScreen: false,
              reload: false,
              setting: false,
              search: false,
            }}
            tableAlertRender={false}
            columns={columns}
            scroll={{ scrollToFirstRowOnChange: true, y: direction === "left" ? 250 : 300 }}
            showSorterTooltip={{ target: "sorter-icon" }}
            sortDirections={["ascend", "descend"]}
            search={false}
            loading={direction === "left" && loading}
            dataSource={direction === "left" ? leftDataSource : rightDataSource}
            size="small"
            rowKey={"_id"}
            onRow={({ _id, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled) return;
                onItemSelect(_id, !listSelectedKeys.includes(_id));
              },
            })}
            onChange={(pagination, filters, sorter, extra) => {
              // console.log({ pagination, filters, sorter, extra });
              // context.pagination.setCurrent(pagination.current);
              // context.pagination.setSize(pagination.pageSize);
              setPagination((prev) => ({
                ...prev,
                current: pagination.current,
                pageSize: pagination.pageSize,
              }));
              fetchleftData({ pager: pagination });
            }}
            pagination={
              direction === "left"
                ? {
                    ...pagination,
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 20, 30, 50, 100],
                    defaultPageSize: 10,
                  }
                : false
            }
            tableExtraRender={direction === "left" ? () => <Search /> : () => {}}
          />
        );
      }}
    </Transfer>
  );
};

export default TableTransfer;
