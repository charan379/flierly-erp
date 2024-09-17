import { ProForm, ProFormDependency, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Space } from "antd";
import React from "react";
import FormField from "@/components/FormField";
import hasOwnProperty from "@/utils/hasOwnProperty";
import getColumnQueryConfig from "@/utils/getColumnQueryConfig";

const Search = ({ columns }) => {

  const fieldFormItemOptions = columns
    .filter((column) => hasOwnProperty(column, "queryFormConfig"))
    .map((column) => {
      return { label: column.title, value: column.dataIndex }
    });

  return (
    <ProForm
      id="table-transfer-search-form"
      layout="inline"
      onFinish={(values) => {
        console.log(values)
      }}>
      <Space.Compact id="table-transfer-search-form-spc" style={{ maxWidth: "50%", width: "50%" }}>
        <ProFormSelect
          name={["field"]}
          rules={[{ required: true, message: "Search field is required" }]}
          options={fieldFormItemOptions}
        />
        <ProFormDependency name={["field"]}>
          {({ field }) => {

            if (field === undefined) {
              return (<ProFormText
                name={["serach", "value"]}
                rules={[{ required: true, message: "Search value is required" }]}
              />)
            }

            return (
              <FormField showLabel={false} config={getColumnQueryConfig({ field, columns, required: true })} />)
          }}
        </ProFormDependency>
      </Space.Compact>
    </ProForm>
  );
};

export default Search;