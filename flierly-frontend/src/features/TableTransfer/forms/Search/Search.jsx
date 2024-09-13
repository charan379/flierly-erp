import { ProForm, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Flex, Space } from "antd";
import React from "react";

const Search = () => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        paddingTop: "5px",
        paddingBottom: "-15px",
        marginBottom: "-10px",
      }}
    >
      <ProForm layout="inline">
        <ProForm.Item>
          <Space.Compact>
            <ProFormSelect
              name={["serach", "field"]}
              rules={[{ required: true, message: "Search field is required" }]}
              options={[
                { label: "Option1", value: "option-1" },
                { label: "Option2", value: "option-2" },
                { label: "Option3", value: "option-3" },
              ]}
            />
            <ProFormText
              name={["serach", "value"]}
              rules={[{ required: true, message: "Search value is required" }]}
            />
          </Space.Compact>
        </ProForm.Item>
      </ProForm>
    </Flex>
  );
};

export default Search;
