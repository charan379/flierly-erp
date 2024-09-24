import { ProTable } from "@ant-design/pro-components";
import { Transfer } from "antd";
import { difference, uniqBy } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import tableTransferService from "./service";
import Search from "./forms/Search";
import hasOwnProperty from "@/utils/hasOwnProperty";

const TableTransfer = ({
  entityName,
  columns,
  columnsToDisplay,
  rowKey = "id",
  targetKeys = [],
  onTargetKeysChange,
  titles = []
}) => {
  // State variables for managing data, pagination, and loading state
  const [dataSource, setDataSource] = useState([]);
  const [totalDataSource, setTotalDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [loadingExistingData, setLoadingExistingData] = useState(false);
  const [sorter, setSorter] = useState({});
  const [filters, setFilters] = useState({});
  const actionRef = useRef();

  async function fetchExistingData(entityName, keys) {
    setLoadingExistingData(true);

    const response = await tableTransferService.fetchExistingData({ entity: entityName, keys });

    if (response?.result && Array.isArray(response.result)) {
      setTotalDataSource((prev) =>
        uniqBy(prev.concat(response.result), rowKey)
      );
    }

    setLoadingExistingData(false);

  }
  // Fetch data for the left table
  async function fetchLeftData({ pager, sort, filter } = { pager: pagination, sort: sorter, filter: filters }) {
    setLoading(true);
    // console.log({pager, sort, filter})
    const response = await tableTransferService.entityPage({
      entity: entityName,
      sort: sort,
      filters: filter,
      pagination: {
        page: pager?.current ?? pagination.current,
        limit: pager?.pageSize ?? pagination.pageSize,
      },
    });

    // Update pagination total count and append fetched data to the total data source
    setPagination((prev) => ({
      ...prev,
      total: response?.result?.totalResults ?? 0,
    }));

    if (sort) setSorter(sort);

    if (filter) setFilters(filter);

    if (Array.isArray(response?.result?.data)) {
      setDataSource(response.result.data);
      setTotalDataSource((prev) =>
        uniqBy(prev.concat(response.result.data), rowKey)
      );
    }

    setLoading(false);
  }

  // Initial data fetch on component mount
  useEffect(() => {
    fetchLeftData();
    fetchExistingData(entityName, targetKeys);
  }, [entityName]);

  // Filter columns to include in the ProTable
  const leftColumns = columns.filter((column) =>
    columnsToDisplay.includes(column.dataIndex)
  );

  const rightColumns = leftColumns.map((column) =>
    hasOwnProperty(column, "sorter") ? { ...column, sorter: false } : column
  );

  const handleFiltersChange = (filters) => {
    if (filters?.field !== undefined) fetchLeftData({ filter: { [filters.field]: filters[filters.field] } })
  };

  return (
    <Transfer
      dataSource={totalDataSource}
      targetKeys={targetKeys}
      onChange={onTargetKeysChange}
      showSearch={false}
      rowKey={(record) => record[rowKey]}
      showSelectAll={false}
      titles={titles}
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
            disabled:
              direction === "left" ? listDisabled || item.disabled : false,
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
            actionRef={actionRef}
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
            columns={direction === "left" ? leftColumns : rightColumns}
            scroll={{
              scrollToFirstRowOnChange: true,
              y: direction === "left" ? 250 : 300,
            }}
            showSorterTooltip={{ target: "sorter-icon" }}
            sortDirections={["ascend", "descend"]}
            search={false}
            loading={direction === "left" ? loading : loadingExistingData}
            dataSource={direction === "left" ? leftDataSource : rightDataSource}
            size="small"
            rowKey={rowKey}
            onRow={({ [rowKey]: key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (direction === "left" && itemDisabled) return;
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
            onChange={(pagination, filters, sort, extra) => {
              // Update pagination state and refetch data on page change
              switch (extra.action) {
                case "paginate":
                  setPagination((prev) => ({
                    ...prev,
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                  }));
                  fetchLeftData({ pager: pagination });
                  break;
                case "sort":
                  const srt =
                    sort.order !== undefined && sort.field !== undefined
                      ? { [sort.field]: sort.order }
                      : {};
                  fetchLeftData({ sort: srt });
                  break;
                default:
                  break;
              }
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
              direction === "left"
                ? () => (
                  <Search columns={columns} onSearch={handleFiltersChange} />
                )
                : null
            }
          />
        );
      }}
    </Transfer>
  );
};

export default TableTransfer;
