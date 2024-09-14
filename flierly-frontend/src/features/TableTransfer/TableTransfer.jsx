import { ProTable } from "@ant-design/pro-components";
import { Transfer } from "antd";
import { difference, uniqBy } from "lodash";
import React, { useEffect, useState } from "react";
import tableTransferService from "./service";
import Search from "./forms/Search";

const TableTransfer = ({
  entity,
  entityColumns,
  columnsToInclude,
  existingRightDataSource,
  targetKeys,
  onTargetKeysChange
}) => {
  // State variables for managing data, pagination, and loading state
  const [dataSource, setDataSource] = useState([]);
  const [totalDataSource, setTotalDataSource] = useState(existingRightDataSource);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  // Fetch data for the left table
  const fetchLeftData = async ({ pager } = { pager: pagination }) => {
    setLoading(true);
    
    const response = await tableTransferService.entityPage({
      entity,
      pagination: {
        page: pager.current,
        limit: pager.pageSize,
      },
    });

    // Update pagination total count and append fetched data to the total data source
    setPagination((prev) => ({ ...prev, total: response?.result?.totalResults ?? 0 }));

    if (Array.isArray(response?.result?.data)) {
      setDataSource(response.result.data);
      setTotalDataSource((prev) => uniqBy(prev.concat(response.result.data), "_id"));
    }

    setLoading(false);
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchLeftData();
  }, []);

  // Filter columns to include in the ProTable
  const columns = entityColumns.filter((column) =>
    columnsToInclude.includes(column.dataIndex)
  );

  return (
    <Transfer
      dataSource={totalDataSource}
      targetKeys={targetKeys}
      onChange={onTargetKeysChange}
      showSearch={false}
      rowKey={(record) => record._id}
      showSelectAll={false}
      titles={["Left Data", "Right Data"]}
      selectAllLabels={[
        ({ selectedCount }) => (
          <span>
            {selectedCount > 0 ? `${selectedCount} items selected` : ""}
          </span>
        ),
      ]}
    >
      {({
        direction,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        // Row selection configuration for the ProTable
        const rowSelection = {
          getCheckboxProps: (item) => ({
            disabled: direction === "left" ? listDisabled || item.disabled : false,
          }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter((item) => item && !item.disabled)
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

        // Filter the data for the right table (selected items)
        const rightDataSource = totalDataSource.filter((item) =>
          targetKeys.includes(item._id)
        );

        // Disable items in the left table that are already selected
        const leftDataSource = dataSource.map((item) => ({
          ...item,
          disabled: targetKeys.includes(item._id),
        }));

        return (
          <ProTable
            className="table-transfer-flierly-1"
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
            scroll={{
              scrollToFirstRowOnChange: true,
              y: direction === "left" ? 250 : 300,
            }}
            showSorterTooltip={{ target: "sorter-icon" }}
            sortDirections={["ascend", "descend"]}
            search={false}
            loading={direction === "left" && loading}
            dataSource={direction === "left" ? leftDataSource : rightDataSource}
            size="small"
            rowKey={"_id"}
            onRow={({ _id, disabled: itemDisabled }) => ({
              onClick: () => {
                if (direction === "left" && itemDisabled) return;
                onItemSelect(_id, !listSelectedKeys.includes(_id));
              },
            })}
            onChange={(pagination) => {
              // Update pagination state and refetch data on page change
              setPagination((prev) => ({
                ...prev,
                current: pagination.current,
                pageSize: pagination.pageSize,
              }));
              fetchLeftData({ pager: pagination });
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
            tableExtraRender={
              direction === "left" ? () => <Search /> : null
            }
          />
        );
      }}
    </Transfer>
  );
};

export default TableTransfer;
