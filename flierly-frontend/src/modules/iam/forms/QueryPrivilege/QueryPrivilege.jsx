import useLocale from "@/features/Language/hooks/useLocale";
import queryTransformers from "@/utils/queryTransformers";
import {
  ProForm,
  ProFormDateRangePicker,
  ProFormItem,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Select } from "antd";
import React from "react";

const QueryPrivilege = () => {
  const { translate, langDirection } = useLocale(); // Using the custom hook to get translation function and language direction

  return (
    <div style={{ direction: langDirection, width: "80%" }}>
      <ProForm.Group>
        {/* name */}
        <ProFormText
          name={"name"}
          label={translate("name")}
          rules={[{ type: "string" }]}
          placeholder={translate("name")}
          transform={queryTransformers.textWithRegex}
        />
        {/* access  */}
        <ProFormSelect
          allowClear
          mode="multiple"
          label={translate("access")}
          name="access"
          rules={[{ type: "array" }]}
          placeholder={translate("choose_access")}
          options={[
            {
              label: "Create",
              value: "Create",
            },
            {
              label: "Read",
              value: "Read",
            },
            {
              label: "Update",
              value: "Update",
            },
            {
              label: "Delete",
              value: "Delete",
            },
            {
              label: "Manage",
              value: "Manage",
            },
          ]}
          transform={queryTransformers.inArray}
        />
        <ProFormItem
          rules={[{ type: "array" }]}
          name={"model"}
          style={{ width: "100%" }}
          label={translate("model")}
          transform={queryTransformers.inArray}
        >
          <Select
            placeholder={translate("choose_model")}
            allowClear
            mode="multiple"
            options={[
              {
                label: "Uom",
                value: "Uom",
              },
              {
                label: "TaxIdentity",
                value: "TaxIdentity",
              },
              {
                label: "User",
                value: "User",
              },
              {
                label: "Role",
                value: "Role",
              },
              {
                label: "Customer",
                value: "Customer",
              },
            ]}
          />
        </ProFormItem>
        <ProFormText
          name={"code"}
          label={translate("code")}
          rules={[{ type: "string" }]}
          placeholder={translate("code")}
        />
        <ProForm.Group>
          <ProFormDateRangePicker
            name={"createdAt"}
            label={translate("created_at")}
            transform={queryTransformers.dateRange}
          />
          <ProFormDateRangePicker
            name={"updatedAt"}
            label={translate("updated_at")}
            transform={queryTransformers.dateRange}
          />
        </ProForm.Group>
      </ProForm.Group>
    </div>
  );
};

export default QueryPrivilege;
