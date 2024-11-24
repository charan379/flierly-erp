import React from "react";
import { Select, SelectProps } from "antd";
import {
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormFieldProps,
} from "@ant-design/pro-components";
import useLocale from "@/features/Locale/hooks/useLocale";
import SelectRemoteOptions from "@/features/SelectRemoteOptions";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import queryTransformers, { TransformerKey } from "@/utils/queryTransformers";
import hasOwnProperty from "@/utils/hasOwnProperty";

// Define types for input config
type InputConfig =
  | { type: "Text" | "TextArea" | "Number" | "DatePicker" | "DateRange" | "Switch" }
  | {
    type: "Decimal";
    precision?: number;
    step?: number;
    min?: number;
    max?: number;
  }
  | {
    type: "Select";
    options?: SelectProps["options"];
    mode?: "single" | "multiple";
  }
  | {
    type: "SelectRemoteOptions";
    asyncOptionsFetcher: (value: string) => Promise<any>;
    labelRender?: (value: any) => React.ReactNode;
    debounceTimeout?: number;
    mode?: "multiple" | "tags";
  };

// Refine the structure of the form field configuration
export type FormFieldConfig = {
  name: string;
  label: string;
  rules?: ProFormFieldProps["rules"];
  input: InputConfig;
  dependencies?: ProFormFieldProps["dependencies"];
  hasFeedback?: ProFormFieldProps["hasFeedback"];
  hidden?: boolean;
  disabled?: boolean;
  tooltip?: ProFormFieldProps["tooltip"];
  width?: ProFormFieldProps["width"];
  allowClear?: boolean;
  access?: AccessConfig;
  fieldProps?: ProFormFieldProps;
  transformer?: TransformerKey;
}

interface AccessConfig {
  permission: RegExp;
  ifNoAccess: "hide" | "disable" | "";
}

export type FormFieldProps = {
  key?: string;
  config: FormFieldConfig;
  showLabel?: boolean;
}

// Utility to extract shared props for ProForm components
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
}: FormFieldConfig & { readOnly?: boolean }) => {

  return {
    name,
    label,
    rules,
    width,
    hidden,
    tooltip,
    disabled: hidden || disabled,
    allowClear,
    transform: transformer ? queryTransformers[transformer] : undefined,
    hasFeedback,
    validateTrigger: ["onChange"],
    dependencies,
    fieldProps,
    readOnly,
  }
};

// General-purpose wrapper for ProForm components
const ProFormComponent: React.FC<{
  Component: React.ComponentType<any>;
  props: any;
}> = ({ Component, props }) => <Component {...proFormProps(props)} />;

// Mapping of input types to corresponding ProForm components
const formItems: Record<string, React.FC<any>> = {
  Text: (props) => <ProFormComponent Component={ProFormText} props={props} />,
  Number: (props) => <ProFormComponent Component={ProFormDigit} props={props} />,
  Decimal: (props) => (
    <ProFormDigit
      {...proFormProps(props)}
      fieldProps={{
        precision: props?.precision,
        step: props?.step,
        min: props?.min,
        max: props?.max,
      }}
    />
  ),
  TextArea: (props) => <ProFormComponent Component={ProFormTextArea} props={props} />,
  Select: (props) => (
    <ProForm.Item {...proFormProps(props)} style={{ width: props.width ?? "100%" }}>
      <Select
        mode={props.mode}
        placeholder="Please select"
        options={props.options}
        allowClear={props.allowClear}
        disabled={props.hidden || props.disabled}
      />
    </ProForm.Item>
  ),
  DatePicker: (props) => <ProFormComponent Component={ProFormDatePicker} props={props} />,
  DateRange: (props) => <ProFormComponent Component={ProFormDateRangePicker} props={props} />,
  SelectRemoteOptions: (props) => (
    <ProForm.Item {...proFormProps(props)} style={{ width: props.width ?? "100%" }}>
      <SelectRemoteOptions
        asyncOptionsFetcher={props.asyncOptionsFetcher}
        debounceTimeout={props.debounceTimeout}
        labelRender={props.labelRender}
        width={props.width}
        allowClear={props.allowClear}
        disabled={props.hidden || props.disabled}
        hidden={props.hidden}
        fieldProps={props.fieldProps} // Ensure fieldProps are passed correctly
        mode={props?.mode}

      />
    </ProForm.Item>
  ),
  Switch: (props) => <ProFormComponent Component={ProFormSwitch} props={props} />,
};

// Main FormField component
const FormField: React.FC<FormFieldProps> = ({ key, config, showLabel = true }) => {
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
    access = { permission: /.*/, ifNoAccess: "" },
    fieldProps,
  } = config;

  // Determine if the field should be hidden or disabled based on access permissions
  let isHidden = hidden;
  let isDisabled = disabled;
  let doNotRender = false;

  const { permission, ifNoAccess } = access;
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

  // Get transformer function if specified
  const transformer = hasOwnProperty(config, "transformer")
    ? config?.transformer ? queryTransformers[config.transformer] : undefined
    : undefined;

  // Ensure required fields are provided
  if (!name || !label) {
    throw new Error(
      `Missing required 'name' or 'label' in form field config: ${JSON.stringify(config)}`
    );
  }

  // Find the appropriate form component based on the input type
  const FormComponent = formItems[input.type];

  if (!FormComponent) {
    throw new Error(
      `Unknown form input type '${input.type}' in form field config: ${JSON.stringify(config)}`
    );
  }

  // Render the selected form component
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
      {...input}
    />
  );
};

export default FormField;
