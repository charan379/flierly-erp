import { ProColumnsWithFormConfig } from "@/features/CrudTable/types/ProColumnsWithFormConfig";
import fetchEntityOptions from "@/features/SelectRemoteOptions/utility/fetchEntityOptions";
import entityExistenceValidator from "@/utils/entityExistenceValidator";
import { Tag } from "antd";
import { Rule, RuleObject } from 'antd/es/form';


const accessOptions = [
  { label: "Create", value: "Create" },
  { label: "Read", value: "Read" },
  { label: "Update", value: "Update" },
  { label: "Delete", value: "Delete" },
  { label: "Manage", value: "Manage" },
];

/**
 * Validator for checking a code pattern (e.g., 'abc-xyz' or 'abc.xyz')
 * @param params Optional parameters for customization
 * @returns A validation rule
 */
const codeRegex = (_params: object = {}): Rule => ({
  validator(_: RuleObject, value: string | undefined) {
    return new Promise<void>((resolve, reject) => {
      // If the value is empty, it is considered valid
      if (!value) {
        resolve();
        return;
      }

      // Regex pattern to validate the code format (letters and hyphens, dot separator)
      const regex = /^[a-z-]+\.[a-z-]+$/;

      // Check if the value matches the regex pattern
      if (regex.test(value)) {
        resolve(); // Validation passes
      } else {
        reject("code_is_not_valid"); // Reject with an error message if validation fails
      }
    });
  },
});

// Define columns
const privilegeColumns: ProColumnsWithFormConfig<Privilege>[] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    valueType: "text",
    search: false,
    width: 80,
    sorter: true,
    defaultSortOrder: "ascend",
    createFormConfig: {
      name: "id",
      label: "id",
      hidden: false,
      disabled: true,
      hasFeedback: false,
      allowClear: false,
      input: {
        type: "Text",
      },
    },
    updateFormConfig: {
      name: "id",
      label: "id",
      hidden: true,
      disabled: true,
      hasFeedback: false,
      allowClear: false,
      input: {
        type: "Text",
      },
    },
    queryFormConfig: {
      name: "id",
      label: "id",
      allowClear: true,
      width: "sm",
      input: {
        type: "Number",
      },
      rules: [{ type: "integer", required: false }],
    },
  },
  {
    title: "Privilege Name",
    dataIndex: "name",
    key: "name",
    valueType: "text",
    sorter: true,
    createFormConfig: {
      name: "name",
      label: "name",
      hasFeedback: true,
      allowClear: true,
      rules: [
        { type: "string", min: 5, max: 30, required: true },
        ({ }) => ({
          validator(_, value) {
            if (value === undefined) return Promise.resolve();
            return entityExistenceValidator("privilege-name-validation-c-1", {
              entity: "privilege",
              filters: { name: { $ilike: value } },
            });
          },
        }),
      ],
      input: {
        type: "Text",
      },
    },
    updateFormConfig: {
      name: "name",
      label: "name",
      hasFeedback: true,
      allowClear: true,
      rules: [
        { type: "string", min: 5, max: 30, required: true },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (value === undefined) return Promise.resolve();
            return entityExistenceValidator("privilege-name-validation-u-1", {
              entity: "privilege",
              filters: {
                id: { $notEqualTo: getFieldValue("id") },
                name: { $ilike: value },
              },
            });
          },
        }),
      ],
      input: {
        type: "Text",
      },
    },
    queryFormConfig: {
      name: "name",
      label: "name",
      rules: [{ type: "regexp" }],
      width: "sm",
      transformer: "ilike",
      input: {
        type: "Text",
      },
    },
  },
  {
    title: "Access Type",
    dataIndex: "access",
    key: "access",
    render: (_dom, entity) => {
      switch (entity.access) {
        case "Create":
          return <Tag color="#50C878">{entity.access}</Tag>;
        case "Read":
          return <Tag color="#008080">{entity.access}</Tag>;
        case "Update":
          return <Tag color="#FF7F50">{entity.access}</Tag>;
        case "Manage":
          return <Tag color="#191970">{entity.access}</Tag>;
        case "Delete":
          return <Tag color="#DC143C">{entity.access}</Tag>;
        default:
          return <Tag>{entity.access}</Tag>;
      }
    },
    createFormConfig: {
      name: "access",
      label: "access",
      allowClear: false,
      access: { permission: /^privilege\.update$/, ifNoAccess: "disable" },
      rules: [
        {
          type: "enum",
          required: true,
          enum: ["Create", "Read", "Update", "Delete", "Manage"],
        },
      ],
      input: {
        type: "Select",
        mode: "single",
        options: accessOptions
      },
    },
    updateFormConfig: {
      name: "access",
      label: "access",
      allowClear: false,
      access: { permission: /^privilege\.manage$/, ifNoAccess: "disable" },
      rules: [
        {
          type: "enum",
          required: true,
          enum: ["Create", "Read", "Update", "Delete", "Manage"],
        },
      ],
      input: {
        type: "Select",
        mode: "single",
        options: accessOptions
      },
    },
    queryFormConfig: {
      name: "access",
      label: "access",
      width: 120,
      rules: [{ type: "array" }],
      transformer: "inArray",
      input: {
        type: "Select",
        mode: "multiple",
        options: accessOptions
      },
    },
  },
  {
    title: "Entity",
    dataIndex: "entity",
    key: "entity",
    valueType: "text",
    sorter: true,
    createFormConfig: {
      name: "entity",
      label: "entity",
      allowClear: false,
      hasFeedback: false,
      access: { permission: /^privilege\.update$/, ifNoAccess: "disable" },
      rules: [{ required: true }],
      input: {
        type: "SelectRemoteOptions",
        asyncOptionsFetcher: fetchEntityOptions,
        debounceTimeout: 300,
      },
    },
    updateFormConfig: {
      name: "entity",
      label: "entity",
      allowClear: false,
      hasFeedback: false,
      access: { permission: /^privilege\.manage$/, ifNoAccess: "disable" },
      rules: [{ required: true }],
      input: {
        type: "SelectRemoteOptions",
        asyncOptionsFetcher: fetchEntityOptions,
        debounceTimeout: 300,
      },
    },
    queryFormConfig: {
      name: "entity",
      label: "entity",
      rules: [{ type: "array" }],
      transformer: "inArray",
      input: {
        type: "SelectRemoteOptions",
        asyncOptionsFetcher: fetchEntityOptions,
        mode: "multiple",
        debounceTimeout: 300,
      },
    },
  },
  {
    title: "Privilege Code",
    dataIndex: "code",
    key: "code",
    valueType: "text",
    createFormConfig: {
      name: "code",
      label: "code",
      hasFeedback: true,
      allowClear: true,
      access: { permission: /^privilege\.update$/, ifNoAccess: "disable" },
      rules: [
        { type: "string", min: 5, max: 25, required: true },
        ({ }) => ({
          validator(_, value) {
            if (value === undefined) return Promise.resolve();
            return entityExistenceValidator("privilege-code-validation-1", {
              entity: "privilege",
              filters: { code: value },
              rejectionMessage: "privilege_with_same_code_already_exists",
            });
          },
        }),
        codeRegex(),
      ],
      input: {
        type: "Text",
      },
    },
    updateFormConfig: {
      name: "code",
      label: "code",
      hasFeedback: true,
      allowClear: true,
      access: { permission: /^privilege\.manage$/, ifNoAccess: "disable" },
      rules: [
        { type: "string", min: 5, max: 25, required: true },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (value === undefined) return Promise.resolve();
            return entityExistenceValidator("privilege-code-validation-1", {
              entity: "privilege",
              filters: { id: { $notEqualTo: getFieldValue("id") }, code: value },
              rejectionMessage: "privilege_with_same_code_already_exists",
            });
          },
        }),
        codeRegex(),
      ],
      input: {
        type: "Text",
      },
    },
    queryFormConfig: {
      name: "code",
      label: "code",
      width: "sm",
      rules: [{ type: "string", min: 5, max: 25 }, codeRegex()],
      transformer: "trimTextValue",
      input: {
        type: "Text",
      },
    },
  },
  {
    title: "Active",
    dataIndex: "isActive",
    key: "isActive",
    valueType: "switch",
    filters: true,
    onFilter: true,
    align: "center",
    width: "80px",
    render: (_text, entity) => {
      return !entity.isActive ? (
        <Tag color="red">InActive</Tag>
      ) : (
        <Tag color="green">Active</Tag>
      );
    },
    createFormConfig: {
      name: "isActive",
      label: "status",
      access: { permission: /^privilege\.manage$/, ifNoAccess: "disable" },
      allowClear: false,
      rules: [],
      input: {
        type: "Select",
        options: [{}],
      },
    },
    updateFormConfig: {
      name: "isActive",
      label: "status",
      access: { permission: /^privilege\.manage$/, ifNoAccess: "disable" },
      allowClear: false,
      rules: [],
      input: {
        type: "Switch"
      },
    },
    queryFormConfig: {
      name: "isActive",
      label: "status",
      width: 120,
      rules: [{ type: "boolean" }],
      input: {
        type: "Switch",
      },
    },
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    valueType: "dateTime",
    sorter: true,
    queryFormConfig: {
      name: "createdAt",
      label: "created_at",
      rules: [],
      transformer: "dateRange",
      input: {
        type: "DateRange",
      },
    },
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    valueType: "dateTime",
    sorter: true,
    search: false,
    queryFormConfig: {
      name: "updatedAt",
      label: "updated_at",
      rules: [],
      transformer: "dateRange",
      input: {
        type: "DateRange",
      },
    },
  },
  {
    title: "Deleted At",
    dataIndex: "deletedAt",
    key: "deletedAt",
    valueType: "dateTime",
    search: false,
    hideInTable: true, // Optionally hide in the table but keep for filters or exports
    queryFormConfig: {
      name: "deletedAt",
      label: "deleted_at",
      rules: [],
      transformer: "dateRange",
      input: {
        type: "DateRange",
      },
    },
  },
];

export default privilegeColumns;
