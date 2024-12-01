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
  ProFormDigitRange,
} from "@ant-design/pro-components";
import useLocale from "@/features/Locale/hooks/useLocale";
import SelectRemoteOptions from "@/features/SelectRemoteOptions";
import { useAuth } from "@/modules/auth/hooks/useAuth";

type InputConfig =
  | { type: "Text" | "TextArea" | "Number" | "NumberRange" | "DatePicker" | "DateRange" | "Switch" }
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
  value?: any;
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
    return (
      <Col xs={24} {...colProps}>
        {children}
      </Col>
    );
  }
  return <>{children}</>;
};

const FormComponent: React.FC<FormFieldConfig<any>> = (props) => {
  const { input, onChange: handleChange, formInfo, colProps, value, fieldProps, ...restProps } = props;
  const isStandalone = !formInfo?.isFormItem;

  switch (input.type) {
    case "Text":
      return (
        <ProFormText
          {...restProps}
          fieldProps={{
            ...fieldProps,
            ...(isStandalone && value !== undefined ? { value } : {}),
            ...(isStandalone && handleChange ? { onChange: (e) => handleChange(e.target.value) } : {}),
          }}
        />
      );
    case "TextArea":
      return (
        <ProFormTextArea
          {...restProps}
          fieldProps={{
            ...fieldProps,
            ...(isStandalone && value !== undefined ? { value } : {}),
            ...(isStandalone && handleChange ? { onChange: (e) => handleChange(e.target.value) } : {}),
          }}
        />
      );
    case "Number":
      return (
        <ProFormDigit
          {...restProps}
          fieldProps={{
            ...fieldProps,
            ...(isStandalone && value !== undefined ? { value } : {}),
            ...(isStandalone && handleChange ? { onChange: (v) => handleChange(v) } : {}),
          }}
        />
      );
    case "NumberRange":
      return (
        <ProFormDigitRange
          {...restProps}
          fieldProps={{
            ...fieldProps,
            ...(isStandalone && value !== undefined ? { value } : {}),
            ...(isStandalone && handleChange ? { onChange: (range) => handleChange(range) } : {}),
          }}
        />
      );
    case "DatePicker":
      return (
        <ProFormDatePicker
          {...restProps}
          fieldProps={{
            ...fieldProps,
            ...(isStandalone && value !== undefined ? { value } : {}),
            ...(isStandalone && handleChange ? { onChange: (_dateWithTimeStamp, date) => handleChange(date) } : {}),
          }}
        />
      );
    case "DateRange":
      return (
        <ProFormDateRangePicker
          {...restProps}
          fieldProps={{
            ...fieldProps,
            ...(isStandalone && value !== undefined ? { value } : {}),
            ...(isStandalone && handleChange ? { onChange: (_datesWithTimeStamp, dates) => handleChange(dates) } : {}),
          }}
        />
      );
    case "Switch":
      return (
        <ProFormSwitch
          {...restProps}
          valuePropName="checked"
          fieldProps={{
            ...fieldProps,
            ...(isStandalone && value !== undefined ? { checked: value } : {}),
            ...(isStandalone && handleChange ? { onChange: (checked) => handleChange(checked) } : {}),
          }}
        />
      );
    case "Decimal":
      return (
        <ProFormDigit
          {...restProps}
          fieldProps={{
            ...fieldProps,
            precision: input.precision,
            step: input.step,
            min: input.min,
            max: input.max,
            ...(isStandalone && value !== undefined ? { value } : {}),
            ...(isStandalone && handleChange ? { onChange: (v) => handleChange(v) } : {}),
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
              maxTagCount={"responsive"}
              allowClear={restProps.allowClear}
              disabled={restProps.hidden || restProps.disabled}
              style={{ width: restProps.width ?? "100%", textAlign: "left" }}
              dropdownStyle={{ textAlign: "left" }}
              {...(isStandalone && value !== undefined ? { value } : {})}
              {...(isStandalone && handleChange ? { onChange: (v) => handleChange(v) } : {})}
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
              mode={input.mode}
              width={restProps.width}
              allowClear={restProps.allowClear}
              disabled={restProps.hidden || restProps.disabled}
              fieldProps={fieldProps}
              {...(isStandalone && value !== undefined ? { value } : {})}
              {...(isStandalone && handleChange ? { onChange: (v) => handleChange(v) } : {})}
            />
          </ProForm.Item>
        </WrapUnderCol>
      );
    default:
      console.warn(`Unsupported input '${JSON.stringify(input)}' in FormField.`);
      return null;
  }
};

const FormField = <T extends Record<string, any>>({
  fieldKey,
  config,
  showLabel = true,
}: FormFieldProps<T>) => {
  const { translate } = useLocale();
  const { hasPermission } = useAuth();
  const { name = "fieldName", label = "fieldLabel", hidden, disabled, access, onChange, value } = config;

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

  const componentProps: FormFieldConfig<T> = {
    ...config,
    label: showLabel ? (typeof label === "string" ? translate(label) : label) : undefined,
    hidden: isHidden,
    disabled: isDisabled,
    onChange,
    value,
  };

  return <FormComponent key={`${fieldKey}-${String(name)}`} {...componentProps} />;
};

export default FormField;
