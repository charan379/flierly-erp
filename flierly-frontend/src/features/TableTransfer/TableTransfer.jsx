import { ProTable } from "@ant-design/pro-components";
import { Transfer } from "antd";
import { difference, uniqBy } from "lodash";
import React, { useEffect, useState } from "react";
import tableTransferService from "./service";
import privilegeColumns from "@/modules/iam/config/privilegeColumns";
import Search from "./forms/Search";

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

  useEffect(() => {
    fetchData(
      pagination,
      setLoading,
      setDataSource,
      setTotalDataSource,
      totalDataSource
    );
  }, []);

  const columnsToInclude = ["name", "code", "model", "access"];
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
      showSelectAll={false}
    >
      {({
        direction,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const rowSelection = getRowSelection(
          direction,
          listDisabled,
          listSelectedKeys,
          onItemSelectAll,
          onItemSelect
        );

        const rightDataSource = totalDataSource.filter((item) =>
          targetKeys.includes(item.id)
        );

        const leftDataSource = dataSource.map((item) => ({
          ...item,
          disabled: targetKeys.includes(item.id),
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
            scroll={{ scrollToFirstRowOnChange: true, y: 250 }}
            showSorterTooltip={{ target: "sorter-icon" }}
            sortDirections={["ascend", "descend"]}
            search={false}
            loading={direction === "left" && loading}
            dataSource={direction === "left" ? leftDataSource : rightDataSource}
            size="small"
            rowKey={"_id"}
            onRow={({ id, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled) return;
                onItemSelect(id, !listSelectedKeys.includes(id));
              },
            })}
            onChange={(paginationObj) =>
              handleTableChange(
                paginationObj,
                direction,
                pagination,
                setPagination,
                fetchData
              )
            }
            pagination={
              direction === "left"
                ? {
                    ...pagination,
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 20, 30, 50, 100],
                    defaultPageSize: 10,
                  }
                : {
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 20, 30, 50, 100],
                    defaultPageSize: 10,
                  }
            }
            tableExtraRender={() => <Search />}
          />
        );
      }}
    </Transfer>
  );
};

export default TableTransfer;

// Fetch data from the service
const fetchData = async (
  params,
  setLoading,
  setPagination,
  setDataSource,
  setTotalDataSource,
  totalDataSource
) => {
  setLoading(true);
  const response = await tableTransferService.entityPage({
    entity: "privilege",
    pagination: {
      page: params.current,
      limit: params.pageSize,
    },
  });

  if (Array.isArray(response?.result?.data)) {
    setDataSource(uniqBy(response.result.data, "_id"));
    setTotalDataSource(
      uniqBy(totalDataSource.concat(response.result.data), "_id")
    );
  }


  setLoading(false);
};

// Handle row selection logic
const getRowSelection = (
  direction,
  listDisabled,
  listSelectedKeys,
  onItemSelectAll,
  onItemSelect
) => ({
  getCheckboxProps: (item) => ({
    disabled: direction === "left" ? listDisabled || item.disabled : false,
  }),
  onSelectAll(selected, selectedRows) {
    const treeSelectedKeys = selectedRows
      .filter((item) => !item.disabled)
      .map(({ id }) => id);
    const diffKeys = selected
      ? difference(treeSelectedKeys, listSelectedKeys)
      : difference(listSelectedKeys, treeSelectedKeys);
    onItemSelectAll(diffKeys, selected);
  },
  onSelect({ id }, selected) {
    onItemSelect(id, selected);
  },
  selectedRowKeys: listSelectedKeys,
});

// Handle table pagination and re-fetch data
const handleTableChange = (
  paginationObj,
  direction,
  pagination,
  setPagination,
  fetch
) => {
  if (direction === "left") {
    const pager = { ...pagination, current: paginationObj.current };
    setPagination(pager);
    fetch(paginationObj);
  }
};
