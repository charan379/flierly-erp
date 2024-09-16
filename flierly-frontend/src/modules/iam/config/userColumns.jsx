import CustomAntDSelectTag from "@/features/SelectRemoteOptions/components/CustomAntDSelectTag";
import selectRemoteOptionsService from "@/features/SelectRemoteOptions/service";
import hasOwnProperty from "@/utils/hasOwnProperty";
import { Badge, Button, Tag } from "antd";
import privilegeColumns from "./privilegeColumns";
import TableTransferShuttle from "@/features/TableTransfer/TableTransferShuttle";

const userColumns = [
  // {
  //   title: "index",
  //   dataIndex: "index",
  //   valueType: "indexBorder",
  //   width: 15,
  // },
  {
    title: "DocId",
    dataIndex: "_id",
    hideInTable: true,
    width: 0,
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
    width: 10,
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
    title: "Email",
    dataIndex: "email",
    copyable: true,
    width: 15,
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
    width: 10,
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
    width: 7,
    hideInTable: false,
    render: (text, record, index, action) => {
      if (hasOwnProperty(record, "roles") && Array.isArray(record.roles)) {
        return (
          <Badge
            count={record.roles.length}
            showZero
            size="small"
            color="gold"
            overflowCount={99}
          >
            <Button type="link" size="small">
              User Roels
            </Button>
          </Badge>
        );
      } else {
        return null;
      }
    },
    queryFormConfig: {
      name: "roles",
      label: "roles",
      order: 5,
      rules: [{ type: "array" }],
      transformer: "inArray",
      input: {
        type: "SelectRemoteOptions",
        select: {
          mode: "multiple",
          // labelInValue: true,
          asyncOptionsFetcher: async (value) => {
            const response = await selectRemoteOptionsService.entities({
              entity: "role",
              queryField: "name",
              keyword: value,
              limit: 20,
            });

            if (
              response?.success &&
              response?.result &&
              Array.isArray(response.result)
            ) {
              return response.result.map((role) => {
                return { label: role, value: role?._id };
              });
            }
          },
          debounceTimeout: 300,
          optionRender: (option, info) => {
            return `${option?.label?.name} | ${option?.label?.code}`;
          },
          tagRender: (props) => {
            return (
              <CustomAntDSelectTag
                title={props.label.name}
                onClose={props.onClose}
              />
            );
          },
        },
      },
    },
  },
  {
    title: "Additional Access",
    dataIndex: "additionalPrivileges",
    copyable: true,
    width: 10,
    hideInTable: false,
    render: (text, record, index, action) => {
      if (hasOwnProperty(record, "additionalPrivileges") && Array.isArray(record.additionalPrivileges)) {
        return (
          <TableTransferShuttle
            title="user_additional_privileges"
            triggerConfig={{ buttonType: "link", text: "additional_privileges" }}
            requestConfig={{
              recordId: record?._id,
              entityName: "user",
              fieldDataType: "objectId",
              fieldName: "additionalPrivileges",
              onSuccess: () => {
                setTimeout(() => {
                  action.reload()
                }, 300);
              },
            }}
            tableConfig={{
              entityName: "privilege",
              columns: privilegeColumns,
              columnsToDisplay: ["name", "access", "model"],
              targetKeys: record.additionalPrivileges.map((privilege) => privilege?._id),
              existingDataSource: record.additionalPrivileges,
              rowKey: '_id'
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
    width: 10,
    hideInTable: false,
    render: (text, record, index, action) => {
      if (
        hasOwnProperty(record, "restrictedPrivileges") &&
        Array.isArray(record.restrictedPrivileges)
      ) {
        return (
          <Badge count={record.restrictedPrivileges.length}>
            <Button type="link">Restricted Privileges</Button>
          </Badge>
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
    width: 10,
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
];

export default userColumns;
