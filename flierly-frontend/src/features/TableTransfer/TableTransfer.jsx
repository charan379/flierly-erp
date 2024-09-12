import handleResponse from "@/utils/handlers/handleResponse";
import { Table, Transfer } from "antd";
import axios from "axios";
import { difference, uniqBy } from "lodash";
import React, { useEffect, useState } from "react";

const TableTransfer = () => {
  const [targetKeys, setTargetKeys] = useState([]);

  const [dataSource, setDataSource] = useState([]);
  const [totalDataSource, setTotalDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);

  const fetch = async (params = pagination) => {
    setLoading(true);
    const request = axios.get("https://jsonplaceholder.typicode.com/posts", {
      params: {
        _start: (params.current - 1) * params.pageSize,
        _limit: params.pageSize,
      },
    });

    const responseData = await handleResponse({
      promise: request,
      notifyOnFailed: false,
    });
    // const responseData = await request;
    setLoading(false);
    setPagination((prev) => {
      return { ...prev, total: 100 };
    });

    if (responseData && Array.isArray(responseData)) {
      setDataSource(uniqBy(responseData, "id"));
      setTotalDataSource(uniqBy(totalDataSource.concat(responseData), "id"));
    }
  };

  const onChange = (keys) => {
    setTargetKeys(keys);
  };

  useEffect(() => {
    fetch();

    return () => {};
  }, []);

  return (
    <Transfer
      dataSource={dataSource}
      targetKeys={targetKeys}
      onChange={onChange}
      rowKey={(record) => record.id}
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
            disabled: listDisabled || item.disabled,
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
          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
          ],
        };

        const handleTableChange = (paginationObj) => {
          if (direction === "left") {
            const pager = { ...pagination, current: paginationObj.current };
            setPagination(pager);
            fetch(paginationObj);
          }
        };

        const rightDataSource = totalDataSource.filter((item) =>
          targetKeys.includes(item.id)
        );

        const leftDataSource = dataSource.map((item) => ({
          ...item,
          disabled: targetKeys.includes(item.id),
        }));

        return (
          <Table
            rowSelection={{
              ...rowSelection,
              columnWidth: "5px",
              fixed: true,
              type: "checkbox",
            }}
            columns={[
              {
                dataIndex: "id",
                title: "ID",
                width: "10px",
              },
              {
                dataIndex: "title",
                title: "Title",
                width: "10px",
              },
            ]}
            scroll={{
              scrollToFirstRowOnChange: true,
              y: 300,
            }}
            loading={direction === "left" && loading}
            dataSource={direction === "left" ? leftDataSource : rightDataSource}
            size="small"
            rowKey={"id"}
            onRow={({ id, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled) return;
                onItemSelect(id, !listSelectedKeys.includes(id));
              },
            })}
            onChange={handleTableChange}
            pagination={direction === "left" ? pagination : true}
          />
        );
      }}
    </Transfer>
  );
};

export default TableTransfer;
