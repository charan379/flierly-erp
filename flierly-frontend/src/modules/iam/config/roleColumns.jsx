import TableTransferShuttle from "@/features/TableTransfer/TableTransferShuttle";
import hasOwnProperty from "@/utils/hasOwnProperty";
import { Tag } from "antd";
import privilegeColumns from "./privilegeColumns";

const roleColumns = [
  {
    title: "ID",
    dataIndex: "id",
    width: 2,
    sorter: true,
    align: "center"
  },
  {
    title: "Name",
    dataIndex: "name",
    copyable: false,
    width: 10,
    queryFormConfig: {
      name: "name",
      label: "name",
      rules: [{ type: "string" }],
      transformer: "textWithRegex",
      order: 1,
      input: {
        type: "Text",
      },
    },
  },
  {
    title: "Active",
    dataIndex: "isActive",
    width: 5,
    align: "center",
    render: (text, record, index, action) => {
      return text === false ? (
        <Tag color="red">InActive</Tag>
      ) : (
        <Tag color="green">Active</Tag>
      );
    },
    queryFormConfig: {
      name: "isActive",
      label: "status",
      rules: [{ type: "boolean" }],
      order: 2,
      input: {
        type: "Select",
        select: {
          mode: "single",
          options: [
            { label: "Active", value: true },
            { label: "In Active", value: false },
          ],
        },
      },
    },
  },
  {
    title: "Code",
    dataIndex: "code",
    copyable: true,
    width: 10,
    queryFormConfig: {
      name: "code",
      label: "code",
      rules: [{ type: "string" }],
      transformer: "trimTextValue",
      order: 2,
      input: {
        type: "Text",
      },
    },
  },
  {
    title: "Description",
    dataIndex: "description",
    copyable: false,
    width: 15,
    queryFormConfig: {
      name: "description",
      label: "description",
      rules: [{ type: "string" }],
      transformer: "textWithRegex",
      order: 3,
      input: {
        type: "Text",
      },
    },
  },
  {
    title: "Privileges",
    dataIndex: "privileges",
    width: 7,
    align: "center",
    hideInTable: false,
    render: (text, record, index, action) => {
      if (hasOwnProperty(record, "privileges") && Array.isArray(record.privileges)) {
        return (
          <TableTransferShuttle
            title="role_privileges"
            triggerConfig={{ buttonType: "link", text: "privileges" }}
            requestConfig={{
              recordId: record?.id,
              entityName: "role",
              fieldName: "privileges",
              onSuccess: () => {
                setTimeout(() => {
                  action.reload()
                }, 300);
              },
            }}
            tableConfig={{
              entityName: "privilege",
              columns: privilegeColumns,
              columnsToDisplay: ["name", "access", "entity"],
              targetKeys: record.privileges,
              rowKey: 'id',
              titles: ["available_privileges", "assigned_privileges"]
            }}
          />
        );
      } else {
        return null;
      }
    },
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    width: 10,
    valueType: "dateTime",
    sorter: true,
    defaultSortOrder: "descend",
    queryFormConfig: {
      name: "createdAt",
      label: "created_at",
      rules: [],
      transformer: "dateRange",
      order: 4,
      input: {
        type: "DateRange",
      },
    },
  },
  {
    title: "Updated",
    dataIndex: "updatedAt",
    width: 10,
    valueType: "dateTime",
    sorter: true,
    queryFormConfig: {
      name: "updatedAt",
      label: "updated_at",
      rules: [],
      transformer: "dateRange",
      order: 5,
      input: {
        type: "DateRange",
      },
    },
  },
  {
    title: "Deleted",
    dataIndex: "deletedAt",
    width: 10,
    valueType: "dateTime",
    sorter: true,
    queryFormConfig: {
      name: "deletedAt",
      label: "deleted_at",
      rules: [],
      transformer: "dateRange",
      order: 7,
      input: {
        type: "DateRange",
      },
    },
  },
];

export default roleColumns;
