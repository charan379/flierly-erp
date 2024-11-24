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
    mode?: SelectProps["mode"];
  }
  | {
    type: "SelectRemoteOptions";
    asyncOptionsFetcher: (value: string) => Promise<any>;
    labelRender?: SelectProps["labelRender"];
    debounceTimeout?: number;
    mode?: SelectProps["mode"];
  };

type AccessConfig = {
  permission?: RegExp;
  ifNoAccess?: "hide" | "disable";
};

export type FormFieldConfig = ProFormFieldProps & {
  input: InputConfig;
  access?: AccessConfig;
  fieldProps?: ProFormFieldProps["fieldProps"];
};

type FormFieldProps = {
  key?: string;
  config: FormFieldConfig;
  showLabel?: boolean;
};

const FormComponent: React.FC<FormFieldConfig> = (props) => {
  switch (props.input.type) {
    case "Text":
      return <ProFormText {...props} />;
    case "TextArea":
      return <ProFormTextArea {...props} />;
    case "Number":
      return <ProFormDigit {...props} />;
    case "DatePicker":
      return <ProFormDatePicker {...props} />;
    case "DateRange":
      return <ProFormDateRangePicker {...props} />;
    case "Switch":
      return <ProFormSwitch {...props} />;
    case "Decimal":
      return (
        <ProFormDigit
          {...props}
          fieldProps={{
            precision: props.input.precision,
            step: props.input.step,
            min: props.input.min,
            max: props.input.max,
          }}
        />
      );
    case "Select":
      return (
        <ProForm.Item {...props}>
          <Select
            mode={props.input.mode}
            placeholder="Please select"
            options={props.input.options}
            allowClear={props.allowClear}
            disabled={props.hidden || props.disabled}
            style={{
              width: props.width ?? "100%"
            }}
          />
        </ProForm.Item>
      );
    case "SelectRemoteOptions":
      return (
        <ProForm.Item {...props}>
          <SelectRemoteOptions
            asyncOptionsFetcher={props.input.asyncOptionsFetcher}
            debounceTimeout={props.input.debounceTimeout}
            labelRender={props.input.labelRender}
            width={props.width}
            allowClear={props.allowClear}
            disabled={props.hidden || props.disabled}
            fieldProps={props.fieldProps}
            mode={props.input.mode}
          />
        </ProForm.Item>
      );
    default:
      throw new Error(`Invalid input type '${props.input}' in form field configuration.`);
  }
};

// Main FormField component
const FormField: React.FC<FormFieldProps> = ({ key, config, showLabel = true }) => {
  const { translate } = useLocale();
  const { hasPermission } = useAuth();

  const {
    name,
    label,
    hidden,
    disabled,
    access,
  } = config;


  const { permission, ifNoAccess } = access || { permission: /.*/, ifNoAccess: undefined };

  let doNotRender = false;
  let isHidden = hidden;
  let isDisabled = disabled;

  if (permission && !hasPermission(permission)) {
    switch (ifNoAccess) {
      case "hide":
        isHidden = true;
        isDisabled = true;
        break;
      case "disable":
        isDisabled = true;
        break;
      case undefined:
        doNotRender = true;
        break;
      default:
        doNotRender = true;
        break;
    }
  }

  if (doNotRender || !name || !label) return null;

  return (
    <FormComponent
      {...config}
      key={key ?? name}
      label={showLabel ? (typeof label === "string" ? translate(label) : label) : undefined}
      hidden={isHidden}
      disabled={isDisabled}
    />
  );
};

export default FormField;
