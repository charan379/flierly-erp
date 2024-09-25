import useLocale from "@/features/Language/hooks/useLocale";
import SelectRemoteOptions from "@/features/SelectRemoteOptions";
import hasOwnProperty from "@/utils/hasOwnProperty";
import queryTransformers from "@/utils/queryTransformers";
import {
  ProForm,
  ProFormDateRangePicker,
  ProFormText,
} from "@ant-design/pro-components";
import { Select } from "antd";
import React from "react";

const FormField = ({ key, config, showLabel = true }) => {
  const { translate } = useLocale();
  const { name, label, rules = [], input, dependencies = [], hasFeedback = false } = config;

  // Get transformer if specified
  const transformer = hasOwnProperty(config, "transformer")
    ? queryTransformers[config.transformer]
    : undefined;

  // Ensure 'name' and 'label' are provided
  if (!name || !label) {
    throw new Error(
      "Missing required 'name' or 'label' in form field config:",
      config
    );
  }

  const { type, select } = input;

  // Get the corresponding form component
  const FormComponent = FormItems[type];
  if (!FormComponent) {
    throw new Error(
      `Unknown form input type '${type}' in form field config:`,
      config
    );
  }

  // Render the form component
  return (
    <FormComponent
      key={key ?? name}
      name={name}
      hasFeedback={hasFeedback}
      dependencies={dependencies}
      label={showLabel ? translate(label) : null}
      rules={rules}
      {...(select || {})}
      transformer={transformer}
    />
  );
};

export default FormField;

const FormItems = {
  Text: ({ name, label, rules = [], transformer, hasFeedback = false, dependencies = [] }) => (
    <ProFormText
      name={name}
      label={label}
      rules={rules}
      transform={transformer}
      hasFeedback={hasFeedback}
      validateTrigge={['onChange']}
      dependencies={dependencies}
    />
  ),
  Select: ({
    name,
    label,
    rules = [],
    mode = "single",
    options,
    transformer,
    hasFeedback = false,
    dependencies = []
  }) => (
    <ProForm.Item
      name={name}
      label={label}
      rules={rules}
      style={{ width: "100%" }}
      transform={transformer}
      hasFeedback={hasFeedback}
      dependencies={dependencies}
    >
      <Select
        mode={mode}
        placeholder={"Please enter"}
        maxTagCount='responsive'
        options={options}
        allowClear
      />
    </ProForm.Item>
  ),
  DateRange: ({ name, label, rules = [], transformer, hasFeedback = false, dependencies = [] }) => (
    <ProFormDateRangePicker
      name={name}
      label={label}
      rules={rules}
      transform={transformer}
      hasFeedback={hasFeedback}
      dependencies={dependencies}
    />
  ),
  SelectRemoteOptions: ({
    name,
    label,
    rules = [],
    mode = "single",
    transformer,
    debounceTimeout,
    asyncOptionsFetcher,
    labelRender,
    optionRender,
    tagRender,
    labelInValue = false,
    hasFeedback = false,
    dependencies = []
  }) => {
    return (
      <ProForm.Item
        name={name}
        label={label}
        rules={rules}
        style={{ width: "100%" }}
        transform={transformer}
        hasFeedback={hasFeedback}
        dependencies={dependencies}
      >
        <SelectRemoteOptions
          labelInValue={labelInValue === true ? true : false}
          mode={mode}
          placeholder={"Please enter"}
          asyncOptionsFetcher={asyncOptionsFetcher}
          debounceTimeout={debounceTimeout}
          labelRender={labelRender}
          optionRender={optionRender}
          tagRender={tagRender}
        />
      </ProForm.Item>
    );
  },
};
