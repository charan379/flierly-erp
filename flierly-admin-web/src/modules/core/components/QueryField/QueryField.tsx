import React from 'react'
import { Col, ColProps, Select, SelectProps } from 'antd'
import { ProFormDatePicker, ProFormDateRangePicker, ProFormDigit, ProFormDigitRange, ProFormFieldProps, ProFormItem, ProFormItemProps, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { pick } from 'lodash'
import SelectRemoteOptions, { SelectRemoteOptionsProps } from '../../features/SelectRemoteOptions/SelectRemoteOptions'

type InputConfig =
  | { type: 'Text' | 'TextArea' | 'Number' | 'NumberRange' | 'DatePicker' | 'DateRange' | 'Switch' }
  | {
    type: 'Decimal'
    precision?: number
    step?: number
    min?: number
    max?: number
  }
  | {
    type: 'Select'
    options?: SelectProps['options']
    mode?: SelectProps['mode']
  }
  | {
    type: 'SelectRemoteOptions'
    asyncOptionsFetcher: SelectRemoteOptionsProps<any>['asyncOptionsFetcher']
    labelRender?: SelectProps['labelRender']
    debounceTimeout?: number
    mode?: SelectProps['mode']
    optionCreatorConfig?: SelectRemoteOptionsProps<any>['optionCreatorConfig']
  }

type AccessConfig = {
  permission?: RegExp
  ifNoAccess?: 'hide' | 'disable'
}

export type QueryFieldConfig<T = Record<string, any>> = Omit<ProFormFieldProps<T>, 'name' | 'fieldProps'> & {
  name?: keyof T
  input: InputConfig
  access?: AccessConfig
  onChange?: (value: any) => void
  value?: any
}

export type QueryFieldProps<T = Record<string, any>> = {
  fieldKey?: string
  config: QueryFieldConfig<T>
  showLabel?: boolean
}

const WrapUnderCol: React.FC<{
  colProps?: ColProps
  children: React.ReactNode
}> = ({ colProps, children }) => {
  return (
    <Col xs={24} {...colProps}>
      {children}
    </Col>
  )
}

const allowedProFormItemProps: (keyof ProFormItemProps)[] = [
  'name',
  'label',
  'valuePropName',
  'rules',
  'dependencies',
  'hidden',
  'shouldUpdate',
  'initialValue',
  'tooltip',
  'validateTrigger',
  'getValueProps',
  'normalize',
  'preserve',
  'convertValue',
  'transform',
]

const FormComponent: React.FC<QueryFieldConfig<any>> = (props) => {
  const { input, onChange: handleChange, colProps, value, ...restProps } = props
  switch (input.type) {
    case 'Text':
      return (
        <ProFormText
          {...restProps}
          fieldProps={{
            ...(value !== undefined ? { value } : {}),
            ...(handleChange ? { onChange: (e) => handleChange(e.target.value) } : {}),
          }}
        />
      )
    case 'TextArea':
      return (
        <ProFormTextArea
          {...restProps}
          fieldProps={{
            ...(value !== undefined ? { value } : {}),
            ...(handleChange ? { onChange: (e) => handleChange(e.target.value) } : {}),
          }}
        />
      )
    case 'Number':
      return (
        <ProFormDigit
          {...restProps}
          fieldProps={{
            ...(value !== undefined ? { value } : {}),
            ...(handleChange ? { onChange: (v) => handleChange(v) } : {}),
          }}
        />
      )
    case 'NumberRange':
      return (
        <ProFormDigitRange
          {...restProps}
          fieldProps={{
            ...(value !== undefined ? { value } : {}),
            ...(handleChange ? { onChange: (range) => handleChange(range) } : {}),
          }}
        />
      )
    case 'DatePicker':
      return (
        <ProFormDatePicker
          {...restProps}
          fieldProps={{
            ...(value !== undefined ? { value } : {}),
            ...(handleChange ? { onChange: (_dateWithTimeStamp, date) => handleChange(date) } : {}),
          }}
        />
      )
    case 'DateRange':
      return (
        <ProFormDateRangePicker
          {...restProps}
          fieldProps={{
            ...(value !== undefined ? { value } : {}),
            ...(handleChange ? { onChange: (_datesWithTimeStamp, dates) => handleChange(dates) } : {}),
          }}
        />
      )
    case 'Switch':
      return (
        <ProFormSwitch
          {...restProps}
          valuePropName="checked"
          fieldProps={{
            ...(value !== undefined ? { checked: value } : {}),
            ...(handleChange ? { onChange: (checked) => handleChange(checked) } : {}),
          }}
        />
      )
    case 'Decimal':
      return (
        <ProFormDigit
          {...restProps}
          fieldProps={{
            precision: input.precision,
            step: input.step,
            min: input.min,
            max: input.max,
            ...(value !== undefined ? { value } : {}),
            ...(handleChange ? { onChange: (v) => handleChange(v) } : {}),
          }}
        />
      )
    case 'Select':
      return (
        <WrapUnderCol colProps={colProps}>
          <ProFormItem {...pick(restProps, allowedProFormItemProps)}>
            <Select
              mode={input.mode}
              placeholder="Please select"
              options={input.options}
              maxTagCount={'responsive'}
              allowClear={restProps.allowClear}
              disabled={restProps.hidden || restProps.disabled}
              style={{ width: restProps.width ?? '100%', textAlign: 'left' }}
              dropdownStyle={{ textAlign: 'left' }}
              {...(value !== undefined ? { value } : {})}
              {...(handleChange ? { onChange: (v) => handleChange(v) } : {})}
            />
          </ProFormItem>
        </WrapUnderCol>
      )
    case 'SelectRemoteOptions':
      return (
        <WrapUnderCol colProps={colProps}>
          <ProFormItem {...pick(restProps, allowedProFormItemProps)}>
            <SelectRemoteOptions
              name={restProps.name}
              asyncOptionsFetcher={input.asyncOptionsFetcher}
              debounceTimeout={input.debounceTimeout}
              labelRender={input.labelRender}
              mode={input.mode}
              width={restProps.width}
              allowClear={restProps.allowClear}
              disabled={restProps.hidden || restProps.disabled}
              optionCreatorConfig={input.optionCreatorConfig}
              maxTagCount={'responsive'}
              rules={restProps.rules}
              {...(value !== undefined ? { value } : {})}
              {...(handleChange ? { onChange: (v: any) => handleChange(v) } : {})}
            />
          </ProFormItem>
        </WrapUnderCol>
      )
    default:
      console.warn(`Unsupported input '${JSON.stringify(input)}' in FormField.`)
      return null
  }
}

const QueryField = <T,>({ fieldKey, config, showLabel = true }: QueryFieldProps<T>) => {
  const { translate } = useLocale()
  const { hasPermission } = useAuth()
  const { name = 'fieldName', label = 'fieldLabel', hidden, disabled, access, onChange, value } = config

  const { permission, ifNoAccess } = access || {}
  let doNotRender = false
  let isHidden = hidden
  let isDisabled = disabled

  if (permission && !hasPermission(permission)) {
    switch (ifNoAccess) {
      case 'hide':
        isHidden = true
        break
      case 'disable':
        isDisabled = true
        break
      default:
        doNotRender = true
    }
  }

  if (doNotRender || !name || !label) return null

  const componentProps: QueryFieldConfig<T> = {
    ...config,
    label: showLabel ? (typeof label === 'string' ? translate(label) : label) : undefined,
    hidden: isHidden,
    disabled: isDisabled,
    onChange,
    value,
  }
  return <FormComponent key={`${fieldKey}-${String(name)}`} {...componentProps} />
}

export default QueryField;
