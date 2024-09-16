import { ProTable } from "@ant-design/pro-components";
import { Transfer } from "antd";
import { difference, uniqBy } from "lodash";
import React, { useEffect, useState } from "react";
import tableTransferService from "./service";
import Search from "./forms/Search";
import hasOwnProperty from "@/utils/hasOwnProperty";

const TableTransfer = ({
  entityName,
  columns,
  columnsToDisplay,
  existingDataSource = [],
  rowKey = '_id',
  targetKeys = [],
  onTargetKeysChange
}) => {
  // State variables for managing data, pagination, and loading state
  const [dataSource, setDataSource] = useState([]);
  const [totalDataSource, setTotalDataSource] = useState(existingDataSource);
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
      entity: entityName,
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
  const leftColumns = columns.filter((column) => columnsToDisplay.includes(column.dataIndex));

  const rightColumns = leftColumns.map((column) => hasOwnProperty(column, 'sorter') ? { ...column, sorter: false } : column);

  return (
    <Transfer
      dataSource={totalDataSource}
      targetKeys={targetKeys}
      onChange={onTargetKeysChange}
      showSearch={false}
      rowKey={(record) => record[rowKey]}
      showSelectAll={false}
      titles={["Available Data", "Selected Data"]}
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
              .map(({ [rowKey]: key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ [rowKey]: key }, selected) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        // Filter the data for the right table (selected items)
        const rightDataSource = totalDataSource.filter((item) =>
          targetKeys.includes(item[rowKey])
        );

        // Disable items in the left table that are already selected
        const leftDataSource = dataSource.map((item) => ({
          ...item,
          disabled: targetKeys.includes(item[rowKey]),
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
            columns={direction === 'left' ? leftColumns : rightColumns}
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
            rowKey={rowKey}
            onRow={({ [rowKey]: key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (direction === "left" && itemDisabled) return;
                onItemSelect(key, !listSelectedKeys.includes(key));
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
