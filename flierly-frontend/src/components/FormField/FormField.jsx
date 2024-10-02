import useLocale from "@/features/Language/hooks/useLocale";
import SelectRemoteOptions from "@/features/SelectRemoteOptions";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import hasOwnProperty from "@/utils/hasOwnProperty";
import queryTransformers from "@/utils/queryTransformers";
import {
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Select } from "antd";
import React from "react";

// FormField component to render different form fields based on config
const FormField = ({ key, config, showLabel = true }) => {
  const { translate } = useLocale();
  const { hasPermission } = useAuth();
  const {
    name,
    label,
    rules = [],
    input,
    dependencies = [],
    hasFeedback = false,
    hidden = false,
    disabled = false,
    tooltip,
    width,
    allowClear = true,
    access = { permission: "", ifNoAccess: "" },
    fieldProps,
  } = config;

  let isHidden = hidden;
  let isDisabled = disabled;
  let doNotRender = false;

  const { permission, ifNoAccess } = access;

  // Access check
  if (permission && !hasPermission(permission)) {
    switch (ifNoAccess) {
      case "hide":
        isHidden = true;
        isDisabled = true;
        break;
      case "disable":
        isDisabled = true;
        break;
      default:
        doNotRender = true;
        break;
    }
  }

  if (doNotRender) return null;

  // Get transformer if specified
  const transformer = hasOwnProperty(config, "transformer")
    ? queryTransformers[config.transformer]
    : undefined;

  // Ensure 'name' and 'label' are provided
  if (!name || !label) {
    throw new Error(
      `Missing required 'name' or 'label' in form field config: ${JSON.stringify(
        config
      )}`
    );
  }

  const { type, select } = input;
  const FormComponent = formItems[type];

  if (!FormComponent) {
    throw new Error(
      `Unknown form input type '${type}' in form field config: ${JSON.stringify(
        config
      )}`
    );
  }

  // Render the form component
  return (
    <FormComponent
      key={key ?? name}
      name={name}
      hasFeedback={hasFeedback}
      dependencies={dependencies}
      hidden={isHidden}
      disabled={isDisabled}
      readOnly={isDisabled}
      tooltip={tooltip}
      width={width}
      label={showLabel ? translate(label) : null}
      rules={rules}
      transformer={transformer}
      allowClear={allowClear}
      fieldProps={fieldProps}
      {...(select || {})}
    />
  );
};

export default FormField;

// Common ProForm component to handle shared props
const ProFormComponent = ({ Component, ...props }) => {
  return <Component {...proFormProps(props)} />;
};

// Function to extract common props for ProForm components
const proFormProps = ({
  name,
  label,
  rules = [],
  transformer,
  hasFeedback = false,
  dependencies = [],
  hidden,
  disabled,
  tooltip,
  width,
  allowClear,
  fieldProps,
  readOnly,
}) => ({
  name,
  label,
  rules,
  width,
  hidden,
  tooltip,
  disabled: hidden || disabled,
  allowClear,
  transform: transformer,
  hasFeedback,
  validateTrigger: ["onChange"],
  dependencies,
  fieldProps,
  readOnly,
});

// Form items mapping
const formItems = {
  Text: (props) => <ProFormComponent {...props} Component={ProFormText} />,
  Number: (props) => <ProFormComponent {...props} Component={ProFormDigit} />,
  TextArea: (props) => (
    <ProFormComponent {...props} Component={ProFormTextArea} />
  ),
  Select: (props) => (
    <ProForm.Item
      {...proFormProps(props)}
      style={{ width: props.width ?? "100%" }}
    >
      <Select
        mode={props.mode || "single"}
        placeholder="Please enter"
        maxTagCount="responsive"
        options={props.options}
        allowClear={props.allowClear}
        disabled={props.hidden || props.disabled}
        hidden={props.hidden}
      />
    </ProForm.Item>
  ),
  DateRange: (props) => (
    <ProFormComponent {...props} Component={ProFormDateRangePicker} />
  ),
  DatePicker: (props) => (
    <ProFormComponent {...props} Component={ProFormDatePicker} />
  ),
  SelectRemoteOptions: (props) => (
    <ProForm.Item
      {...proFormProps(props)}
      style={{ width: props.width ?? "100%" }}
    >
      <SelectRemoteOptions
        labelInValue={props.labelInValue}
        mode={props.mode || "single"}
        placeholder="Please enter"
        asyncOptionsFetcher={props.asyncOptionsFetcher}
        debounceTimeout={props.debounceTimeout}
        labelRender={props.labelRender}
        optionRender={props.optionRender}
        tagRender={props.tagRender}
        width={props.width}
        allowClear={props.allowClear}
        disabled={props.hidden || props.disabled}
        hidden={props.hidden}
      />
    </ProForm.Item>
  ),
  Switch: (props) => <ProFormComponent {...props} Component={ProFormSwitch} />, // Add the Switch component here
};
