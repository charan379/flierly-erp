import React, { useEffect, useRef, useState } from "react";
import { Transfer } from "antd";
import { ProTable } from "@ant-design/pro-components";
import { difference, uniqBy } from "lodash";
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
  // State variables to manage data and UI states
  const [pageData, setPageData] = useState([]); // Data for the left table
  const [allData, setAllData] = useState([]); // Total data including selected items
  const [paginationInfo, setPaginationInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state for left table
  const [isExistingDataLoading, setIsExistingDataLoading] = useState(false); // Loading state for existing data
  const [sortOptions, setSortOptions] = useState({}); // Sorting options
  const [filterOptions, setFilterOptions] = useState({}); // Filter options
  const actionRef = useRef(); // Ref for ProTable actions

  // Function to fetch existing data based on the provided entity name and keys
  const fetchExistingData = async (entityName, keys) => {
    setIsExistingDataLoading(true);
    const response = await tableTransferService.fetchExistingData({ entity: entityName, keys });

    if (response?.result && Array.isArray(response.result)) {
      setAllData(prevData => uniqBy([...prevData, ...response.result], rowKey));
    }
    setIsExistingDataLoading(false);
  };

  // Function to fetch data for the left table
  const fetchAvailableData = async ({ pager = paginationInfo, sort = sortOptions, filter = filterOptions } = {}) => {
    setIsLoading(true);
    const response = await tableTransferService.entityPage({
      entity: entityName,
      sort,
      filters: filter,
      pagination: {
        page: pager.current,
        limit: pager.pageSize,
      },
    });

    // Update pagination total count and append fetched data to all data
    setPaginationInfo(prevInfo => ({
      ...prevInfo,
      total: response?.result?.totalResults ?? 0,
    }));

    if (sort) setSortOptions(sort);
    if (filter) setFilterOptions(filter);

    if (Array.isArray(response?.result?.data)) {
      setPageData(response.result.data);
      setAllData(prevData => uniqBy([...prevData, ...response.result.data], rowKey));
    }
    setIsLoading(false);
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchAvailableData();
    fetchExistingData(entityName, targetKeys);
  }, [entityName]);

  // Filter columns to include in the ProTable
  const leftTableColumns = columns.filter(column => columnsToDisplay.includes(column.dataIndex));
  const rightTableColumns = leftTableColumns.map(column =>
    hasOwnProperty(column, "sorter") ? { ...column, sorter: false } : column
  );

  // Handle filter changes and refetch data
  const handleFilterChange = (filters) => {
    if (filters?.field !== undefined) {
      // Reset pagination to page 1
      setPaginationInfo(prev => ({
        ...prev,
        current: 1,
      }));
      fetchAvailableData({ filter: { [filters.field]: filters[filters.field] }, pager: { current: 1 } });
    } else {
      // Reset pagination to page 1 and clear filters and sort options
      setPaginationInfo(prev => ({
        ...prev,
        current: 1,
      }));
      fetchAvailableData({ pager: { current: 1 }, filter: {}, sort: {} });
    }
  };


  return (
    <Transfer
      dataSource={allData}
      targetKeys={targetKeys}
      onChange={onTargetKeysChange}
      showSearch={false}
      rowKey={(record) => record[rowKey]}
      showSelectAll={false}
      titles={titles}
      selectAllLabels={[
        ({ selectedCount }) => (
          <span>{selectedCount > 0 ? `${selectedCount} items selected` : ""}</span>
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
        const rowSelectionConfig = {
          getCheckboxProps: (item) => ({
            disabled: direction === "left" ? listDisabled || item.disabled : false,
          }),
          onSelectAll(selected, selectedRows) {
            const selectedRowKeys = selectedRows
              .filter((item) => item && !item.disabled)
              .map(({ [rowKey]: key }) => key);
            const diffKeys = selected
              ? difference(selectedRowKeys, listSelectedKeys)
              : difference(listSelectedKeys, selectedRowKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ [rowKey]: key }, selected) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        // Filter data for the right table (selected items)
        const selectedData = allData.filter((item) => targetKeys.includes(item[rowKey]));
        // Disable items in the left table that are already selected
        const leftTableData = pageData.map((item) => ({
          ...item,
          disabled: targetKeys.includes(item[rowKey]),
        }));

        return (
          <ProTable
            actionRef={actionRef}
            className="table-transfer-flierly-1"
            rowSelection={{
              ...rowSelectionConfig,
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
            columns={direction === "left" ? leftTableColumns : rightTableColumns}
            scroll={{
              scrollToFirstRowOnChange: true,
              y: direction === "left" ? 250 : 300,
            }}
            showSorterTooltip={{ target: "sorter-icon" }}
            sortDirections={["ascend", "descend"]}
            search={false}
            loading={direction === "left" ? isLoading : isExistingDataLoading}
            dataSource={direction === "left" ? leftTableData : selectedData}
            size="small"
            rowKey={rowKey}
            onRow={({ [rowKey]: key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (direction === "left" && itemDisabled) return;
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
            onChange={(pagination, filters, sort, extra) => {
              switch (extra.action) {
                case "paginate":
                  setPaginationInfo(prev => ({
                    ...prev,
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                  }));
                  fetchAvailableData({ pager: pagination });
                  break;
                case "sort":
                  const sortConfig = sort.order !== undefined && sort.field !== undefined
                    ? { [sort.field]: sort.order }
                    : {};
                  fetchAvailableData({ sort: sortConfig });
                  break;
                default:
                  break;
              }
            }}
            pagination={
              direction === "left"
                ? {
                  ...paginationInfo,
                  showSizeChanger: true,
                  pageSizeOptions: [5, 10, 20, 30, 50, 100],
                  defaultPageSize: 10,
                }
                : false
            }
            tableExtraRender={direction === "left" ? () => <Search columns={columns} onSearch={handleFilterChange} /> : null}
          />
        );
      }}
    </Transfer>
  );
};

export default TableTransfer;
