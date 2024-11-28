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

// Define types for input configuration
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

export type FormFieldConfig<T = Record<string, any>> = Omit<ProFormFieldProps<T>, "name"> & {
  name?: keyof T;
  input: InputConfig;
  access?: AccessConfig;
  fieldProps?: ProFormFieldProps<T>["fieldProps"];
  onChange?: (value: any) => void;
  formInfo?: {
    isFormItem?: boolean;
    gridForm?: boolean;
  };
};

type FormFieldProps<T = Record<string, any>> = {
  fieldKey?: string;
  config: FormFieldConfig<T>;
  showLabel?: boolean;
};

const WrapUnderCol: React.FC<{
  colProps?: ColProps;
  formInfo?: FormFieldConfig["formInfo"];
  children: React.ReactNode;
}> = ({ colProps, formInfo, children }) => {
  const { isFormItem = true, gridForm = true } = formInfo || {};

  if (isFormItem && gridForm) {
    return <Col xs={24} {...colProps}>{children}</Col>;
  }
  return <>{children}</>;
};

const FormComponent: React.FC<FormFieldConfig<any>> = (props) => {
  const { input, onChange, formInfo, colProps, ...restProps } = props;

  switch (input.type) {
    case "Text":
      return <ProFormText {...restProps} fieldProps={{ ...props.fieldProps, onChange }} />;
    case "TextArea":
      return <ProFormTextArea {...restProps} fieldProps={{ ...props.fieldProps, onChange }} />;
    case "Number":
      return <ProFormDigit {...restProps} fieldProps={{ ...props.fieldProps, onChange }} />;
    case "DatePicker":
      return <ProFormDatePicker {...restProps} fieldProps={{ ...props.fieldProps, onChange }} />;
    case "DateRange":
      return <ProFormDateRangePicker {...restProps} fieldProps={{ ...props.fieldProps, onChange }} />;
    case "Switch":
      return <ProFormSwitch {...restProps} valuePropName="checked" fieldProps={{ ...props.fieldProps, onChange }} />;
    case "Decimal":
      return (
        <ProFormDigit
          {...restProps}
          fieldProps={{
            ...props.fieldProps,
            precision: input.precision,
            step: input.step,
            min: input.min,
            max: input.max,
            onChange,
          }}
        />
      );
    case "Select":
      return (
        <WrapUnderCol formInfo={formInfo} colProps={colProps}>
          <ProForm.Item {...restProps}>
            <Select
              mode={input.mode}
              placeholder="Please select"
              options={input.options}
              allowClear={props.allowClear}
              disabled={props.hidden || props.disabled}
              style={{ width: props.width ?? "100%", textAlign: "left" }}
              dropdownStyle={{ textAlign: "left" }}
              onChange={onChange}
            />
          </ProForm.Item>
        </WrapUnderCol>
      );
    case "SelectRemoteOptions":
      return (
        <WrapUnderCol formInfo={formInfo} colProps={colProps}>
          <ProForm.Item {...restProps}>
            <SelectRemoteOptions
              asyncOptionsFetcher={input.asyncOptionsFetcher}
              debounceTimeout={input.debounceTimeout}
              labelRender={input.labelRender}
              width={props.width}
              allowClear={props.allowClear}
              disabled={props.hidden || props.disabled}
              fieldProps={props.fieldProps}
              mode={input.mode}
              onChange={onChange}
            />
          </ProForm.Item>
        </WrapUnderCol>
      );
    default:
      throw new Error(`Unsupported input type '${JSON.stringify(input)}'`);
  }
};

const FormField = <T extends Record<string, any>>({
  fieldKey,
  config,
  showLabel = true,
}: FormFieldProps<T>) => {
  const { translate } = useLocale();
  const { hasPermission } = useAuth();
  const {
    name = "fieldName",
    label = "fieldLabel",
    hidden,
    disabled,
    access,
    onChange,
  } = config;

  const { permission, ifNoAccess } = access || {};
  let doNotRender = false;
  let isHidden = hidden;
  let isDisabled = disabled;

  if (permission && !hasPermission(permission)) {
    switch (ifNoAccess) {
      case "hide":
        isHidden = true;
        break;
      case "disable":
        isDisabled = true;
        break;
      default:
        doNotRender = true;
    }
  }

  if (doNotRender || !name || !label) return null;

  return (
    <FormComponent
      key={fieldKey ?? String(name)}
      {...config}
      label={showLabel ? (typeof label === "string" ? translate(label) : label) : undefined}
      hidden={isHidden}
      disabled={isDisabled}
      onChange={onChange}
    />
  );
};

export default FormField;
