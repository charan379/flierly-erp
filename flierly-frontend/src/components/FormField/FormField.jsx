import useLocale from "@/features/Language/hooks/useLocale";
import SelectRemoteOptions from "@/features/SelectRemoteOptions";
import hasOwnProperty from "@/utils/hasOwnProperty";
import queryTransformers from "@/utils/queryTransformers";
import {
  ProForm,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormText,
} from "@ant-design/pro-components";
import { Select } from "antd";
import React from "react";

const FormField = ({ key, config, showLabel = true }) => {
  const { translate } = useLocale();
  const { name, label, rules = [], input, dependencies = [], hasFeedback = false, hidden = false, disabled = false, tooltip, width, allowClear = true } = config;

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
      hidden={hidden}
      disabled={disabled}
      tooltip={tooltip}
      width={width}
      label={showLabel ? translate(label) : null}
      rules={rules}
      transformer={transformer}
      allowClear={allowClear}
      {...(select || {})}
    />
  );
};

export default FormField;

const FormItems = {
  Text: ({ name, label, rules = [], transformer, hasFeedback = false, dependencies = [], hidden, disabled, tooltip, width, allowClear }) => {
    return (
      <ProFormText
        name={name}
        label={label}
        rules={rules}
        width={width}
        hidden={hidden}
        tooltip={tooltip}
        disabled={hidden || disabled}
        allowClear={allowClear}
        transform={transformer}
        hasFeedback={hasFeedback}
        validateTrigge={['onChange']}
        dependencies={dependencies}
      />
    )
  },
  Number: ({ name, label, rules = [], transformer, hasFeedback = false, dependencies = [], hidden, disabled, tooltip, width, allowClear }) => {
    return (
      <ProFormDigit
        name={name}
        label={label}
        rules={rules}
        width={width}
        hidden={hidden}
        tooltip={tooltip}
        disabled={hidden || disabled}
        allowClear={allowClear}
        transform={transformer}
        hasFeedback={hasFeedback}
        validateTrigge={['onChange']}
        dependencies={dependencies}
      />
    )
  },
  Select: ({
    name,
    label,
    rules = [],
    mode = "single",
    options,
    transformer,
    hasFeedback = false,
    dependencies = [],
    hidden, disabled, tooltip, width, allowClear
  }) => {
    return (
      <ProForm.Item
        name={name}
        label={label}
        rules={rules}
        width={width}
        hidden={hidden}
        tooltip={tooltip}
        disabled={hidden || disabled}
        allowClear={allowClear}
        style={{ width: width ?? "100%" }}
        transform={transformer}
        hasFeedback={hasFeedback}
        dependencies={dependencies}
      >
        <Select
          mode={mode}
          placeholder={"Please enter"}
          maxTagCount='responsive'
          options={options}
          allowClear={allowClear}
        />
      </ProForm.Item>
    )
  },
  DateRange: ({ name, label, rules = [], transformer, hasFeedback = false, dependencies = [], hidden, disabled, tooltip, width, allowClear }) => {
    return (
      <ProFormDateRangePicker
        name={name}
        label={label}
        rules={rules}
        width={width}
        hidden={hidden}
        tooltip={tooltip}
        disabled={hidden || disabled}
        allowClear={allowClear}
        transform={transformer}
        hasFeedback={hasFeedback}
        dependencies={dependencies}
      />
    )
  },
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
    dependencies = [],
    width,
    hidden,
    tooltip,
    disabled,
    allowClear,
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
        width={width}
        hidden={hidden}
        tooltip={tooltip}
        disabled={hidden || disabled}
        allowClear={allowClear}
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
          width={width}
          allowClear={allowClear}
        />
      </ProForm.Item>
    );
  },
};
