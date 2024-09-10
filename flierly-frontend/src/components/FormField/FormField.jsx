import useLocale from "@/features/Language/hooks/useLocale";
import SelectRemoteOptions from "@/features/SelectRemoteOptions";
import hasOwnProperty from "@/utils/hasOwnProperty";
import queryTransformers from "@/utils/queryTransformers";
import {
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import React from "react";

const FormField = ({ key, config }) => {
  const { translate } = useLocale();
  const { name, label, rules = [], input } = config;

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
      label={translate(label)}
      rules={rules}
      {...(select || {})}
      transformer={transformer}
    />
  );
};

export default FormField;

const FormItems = {
  Text: ({ name, label, rules = [], transformer }) => (
    <ProFormText
      name={name}
      label={label}
      rules={rules}
      transform={transformer}
    />
  ),
  Select: ({
    name,
    label,
    rules = [],
    mode = "single",
    options,
    transformer,
  }) => (
    <ProFormSelect
      name={name}
      label={label}
      mode={mode}
      rules={rules}
      options={options}
      allowClear
      transform={transformer}
    />
  ),
  DateRange: ({ name, label, rules = [], transformer }) => (
    <ProFormDateRangePicker
      name={name}
      label={label}
      rules={rules}
      transform={transformer}
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
  }) => {
    return (
      <ProForm.Item
        name={name}
        label={label}
        rules={rules}
        style={{ width: "100%" }}
        transform={transformer}
      >
        <SelectRemoteOptions
          mode={mode}
          placeholder={"Please enter"}
          asyncOptionsFetcher={asyncOptionsFetcher}
          debounceTimeout={debounceTimeout}
          labelRender={labelRender}
          optionRender={optionRender}
        />
      </ProForm.Item>
    );
  },
};
