import React from "react";
import { Col, ColProps, Select, SelectProps } from "antd";
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
  onChange?: (value: any) => void;
  formInfo?: {
    isFormItem?: boolean
    gridForm?: boolean
  }
};

type FormFieldProps = {
  fieldKey?: string;
  config: FormFieldConfig;
  showLabel?: boolean;
};

const WrapUnderCol: React.FC<{ colProps?: ColProps, formInfo: FormFieldConfig["formInfo"], children: React.ReactNode }> = (props) => {

  const { isFormItem, gridForm } = props?.formInfo || { isFormItem: true, gridForm: true };

  if (isFormItem && gridForm) {
    return (
      <Col xs={24} {...props.colProps}>
        {props.children}
      </Col>
    )
  } else {
    return props.children
  }
};

const FormComponent: React.FC<FormFieldConfig> = (props) => {

  switch (props.input.type) {
    case "Text":
      return <ProFormText {...props} fieldProps={{ onChange: props?.onChange }} />;
    case "TextArea":
      return <ProFormTextArea {...props} fieldProps={{ onChange: props?.onChange }} />;
    case "Number":
      return <ProFormDigit {...props} fieldProps={{ onChange: props?.onChange }} />;
    case "DatePicker":
      return <ProFormDatePicker {...props} fieldProps={{ onChange: props?.onChange }} />;
    case "DateRange":
      return <ProFormDateRangePicker {...props} fieldProps={{ onChange: props?.onChange }} />;
    case "Switch":
      return <ProFormSwitch {...props} valuePropName="checked" fieldProps={{ onChange: props?.onChange }} />;
    case "Decimal":
      return (
        <ProFormDigit
          {...props}
          fieldProps={{
            precision: props.input.precision,
            step: props.input.step,
            min: props.input.min,
            max: props.input.max,
            onChange: props?.onChange
          }}
        />
      );
    case "Select":
      return (
        <WrapUnderCol formInfo={props.formInfo} colProps={props.colProps}>
          <ProForm.Item
            {...props}
            convertValue={(value) => {
              if (value === true) {
                return "true";
              } else if (value === false) {
                return "false";
              } else {
                return value;
              }
            }}
          >
            <Select
              mode={props.input.mode}
              placeholder="Please select"
              options={props.input.options}
              allowClear={props.allowClear}
              disabled={props.hidden || props.disabled}
              style={{ width: props.width ?? "100%" }}
              dropdownStyle={{ textAlign: "left" }}
              onChange={props?.onChange} // Pass onChange to Select component
            />
          </ProForm.Item>
        </WrapUnderCol>
      );
    case "SelectRemoteOptions":
      return (
        <WrapUnderCol formInfo={props.formInfo} colProps={props.colProps}>
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
              onChange={props?.onChange} // Pass onChange to SelectRemoteOptions component
            />
          </ProForm.Item>
        </WrapUnderCol>
      );
    default:
      throw new Error(`Invalid input type '${props.input}' in form field configuration.`);
  }
};

// Main FormField component
const FormField: React.FC<FormFieldProps> = ({ fieldKey, config, showLabel = true }) => {
  const { translate } = useLocale();
  const { hasPermission } = useAuth();

  const {
    name = "fieldName",
    label = "fieldLable",
    hidden,
    disabled,
    access,
    onChange, // Destructure onChange handler
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
      key={fieldKey ?? name}
      {...config}
      label={showLabel ? (typeof label === "string" ? translate(label) : label) : undefined}
      hidden={isHidden}
      disabled={isDisabled}
      onChange={onChange} // Pass the onChange handler to FormComponent
    />
  );
};

export default FormField;
