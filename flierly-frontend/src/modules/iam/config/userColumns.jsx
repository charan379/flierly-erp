import hasOwnProperty from "@/utils/hasOwnProperty";
import { Tag } from "antd";
import privilegeColumns from "./privilegeColumns";
import TableTransferShuttle from "@/features/TableTransfer/TableTransferShuttle";
import roleColumns from "./roleColumns";

const userColumns = [
  {
    title: "ID",
    dataIndex: "id",
    width: 60, // Updated width
    sorter: true,
    align: "center",
  },
  {
    title: "Deleted",
    dataIndex: "isDeleted",
    hideInTable: true,
    width: 0,
  },
  {
    title: "Username",
    dataIndex: "username",
    copyable: true,
    width: 120, // Updated width
    sorter: true,
    queryFormConfig: {
      name: "username",
      label: "username",
      rules: [{ type: "regexp" }],
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
    width: 100, // Updated width
    align: "center",
    render: (text) => (
      text === false ? (
        <Tag color="red">InActive</Tag>
      ) : (
        <Tag color="green">Active</Tag>
      )
    ),
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
    title: "Email",
    dataIndex: "email",
    copyable: true,
    width: 180, // Updated width
    queryFormConfig: {
      name: "email",
      label: "email",
      rules: [{ type: "email" }],
      transformer: "trimTextValue",
      order: 3,
      input: {
        type: "Text",
      },
    },
  },
  {
    title: "Phone",
    dataIndex: "mobile",
    copyable: true,
    width: 120, // Updated width
    queryFormConfig: {
      name: "mobile",
      label: "Phone",
      rules: [{ type: "string" }],
      transformer: "trimTextValue",
      order: 4,
      input: {
        type: "Text",
      },
    },
  },
  {
    title: "Roles",
    dataIndex: "roles",
    copyable: true,
    width: 100, // Updated width
    align: "center",
    render: (text, record, index, action) => {
      if (hasOwnProperty(record, "roles") && Array.isArray(record.roles)) {
        return (
          <TableTransferShuttle
            title="user_roles"
            triggerConfig={{ buttonType: "link", text: "roles" }}
            requestConfig={{
              recordId: record?.id,
              entityName: "user",
              fieldName: "roles",
              onSuccess: () => {
                setTimeout(() => {
                  action.reload();
                }, 300);
              },
            }}
            tableConfig={{
              entityName: "role",
              columns: roleColumns,
              columnsToDisplay: ["name", "code"],
              targetKeys: record.roles,
              rowKey: 'id',
              titles: ["available_roles", "assigned_roles"],
            }}
          />
        );
      } else {
        return null;
      }
    },
  },
  {
    title: "Additional Access",
    dataIndex: "additionalPrivileges",
    copyable: true,
    width: 180, // Updated width
    align: "center",
    render: (text, record, index, action) => {
      if (hasOwnProperty(record, "additionalPrivileges") && Array.isArray(record.additionalPrivileges)) {
        return (
          <TableTransferShuttle
            title="user_additional_privileges"
            triggerConfig={{ buttonType: "link", text: "additional_privileges" }}
            requestConfig={{
              recordId: record?.id,
              entityName: "user",
              fieldName: "additionalPrivileges",
              onSuccess: () => {
                setTimeout(() => {
                  action.reload();
                }, 300);
              },
            }}
            tableConfig={{
              entityName: "privilege",
              columns: privilegeColumns,
              columnsToDisplay: ["name", "access", "entity"],
              targetKeys: record.additionalPrivileges,
              rowKey: 'id',
              titles: ["available_privileges", "assigned_privileges"],
            }}
          />
        );
      } else {
        return null;
      }
    },
  },
  {
    title: "Restricted Access",
    dataIndex: "restrictedPrivileges",
    copyable: true,
    width: 180, // Updated width
    align: "center",
    render: (text, record, index, action) => {
      if (hasOwnProperty(record, "restrictedPrivileges") && Array.isArray(record.restrictedPrivileges)) {
        return (
          <TableTransferShuttle
            title="user_restricted_privileges"
            triggerConfig={{ buttonType: "link", text: "restricted_privileges" }}
            requestConfig={{
              recordId: record?.id,
              entityName: "user",
              fieldName: "restrictedPrivileges",
              onSuccess: () => {
                setTimeout(() => {
                  action.reload();
                }, 300);
              },
            }}
            tableConfig={{
              entityName: "privilege",
              columns: privilegeColumns,
              columnsToDisplay: ["name", "access", "entity"],
              targetKeys: record.restrictedPrivileges,
              rowKey: 'id',
              titles: ["available_privileges", "restricted_privileges"],
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
    width: 180, // Updated width
    valueType: "dateTime",
    queryFormConfig: {
      name: "createdAt",
      label: "created_at",
      rules: [],
      transformer: "dateRange",
      order: 8,
      input: {
        type: "DateRange",
      },
    },
  },
  {
    title: "Updated",
    dataIndex: "updatedAt",
    width: 180, // Updated width
    valueType: "dateTime",
    queryFormConfig: {
      name: "updatedAt",
      label: "updated_at",
      rules: [],
      transformer: "dateRange",
      order: 9,
      input: {
        type: "DateRange",
      },
    },
  },
  {
    title: "Deleted",
    dataIndex: "deletedAt",
    width: 180, // Updated width
    valueType: "dateTime",
    sorter: true,
    queryFormConfig: {
      name: "deletedAt",
      label: "deleted_at",
      rules: [],
      transformer: "dateRange",
      order: 11,
      input: {
        type: "DateRange",
      },
    },
  },
];

export default userColumns;
