import React, { Suspense } from 'react'
import { Col, ColProps, Select, SelectProps, Skeleton } from 'antd'
import { ProFormFieldProps, ProFormItemProps } from '@ant-design/pro-components'
import useLocale from '@/features/Locale/hooks/useLocale'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { pick } from 'lodash'
import { SelectRemoteOptionsProps } from '@/features/SelectRemoteOptions/SelectRemoteOptions'
import { FormInstance } from 'antd/lib'

const ProFormItem = React.lazy(() => import('@ant-design/pro-components').then((module) => ({ default: module.ProFormItem })))
const SelectRemoteOptions = React.lazy(() => import('@/features/SelectRemoteOptions'))
const ProFormDatePicker = React.lazy(() => import('@ant-design/pro-components').then((module) => ({ default: module.ProFormDatePicker })))
const ProFormDateRangePicker = React.lazy(() => import('@ant-design/pro-components').then((module) => ({ default: module.ProFormDateRangePicker })))
const ProFormDigit = React.lazy(() => import('@ant-design/pro-components').then((module) => ({ default: module.ProFormDigit })))
const ProFormSwitch = React.lazy(() => import('@ant-design/pro-components').then((module) => ({ default: module.ProFormSwitch })))
const ProFormText = React.lazy(() => import('@ant-design/pro-components').then((module) => ({ default: module.ProFormText })))
const ProFormTextArea = React.lazy(() => import('@ant-design/pro-components').then((module) => ({ default: module.ProFormTextArea })))
const ProFormDigitRange = React.lazy(() => import('@ant-design/pro-components').then((module) => ({ default: module.ProFormDigitRange })))

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
    asyncOptionsFetcher: SelectRemoteOptionsProps['asyncOptionsFetcher']
    labelRender?: SelectProps['labelRender']
    debounceTimeout?: number
    mode?: SelectProps['mode']
    optionCreatorConfig?: SelectRemoteOptionsProps['optionCreatorConfig']
  }

type AccessConfig = {
  permission?: RegExp
  ifNoAccess?: 'hide' | 'disable'
}

export type FormFieldConfig<T = Record<string, any>> = Omit<ProFormFieldProps<T>, 'name' | 'fieldProps'> & {
  name?: keyof T
  input: InputConfig
  access?: AccessConfig
  onChange?: (value: any) => void
  value?: any
  formInfo?: {
    isFormItem?: boolean
    gridForm?: boolean,
    formInstance?: FormInstance<any>;
  };
}

export type FormFieldProps<T = Record<string, any>> = {
  fieldKey?: string
  config: FormFieldConfig<T>
  showLabel?: boolean
}

const WrapUnderCol: React.FC<{
  colProps?: ColProps
  formInfo?: FormFieldConfig['formInfo']
  children: React.ReactNode
}> = ({ colProps, formInfo, children }) => {
  const { isFormItem = true, gridForm = true } = formInfo || {}
  if (isFormItem && gridForm) {
    return (
      <Col xs={24} {...colProps}>
        {children}
      </Col>
    )
  }
  return <>{children}</>
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

const FormComponent: React.FC<FormFieldConfig<any>> = (props) => {
  const { input, onChange: handleChange, formInfo, colProps, value, ...restProps } = props
  const isStandalone = !formInfo?.isFormItem
  switch (input.type) {
    case 'Text':
      return (
        <Suspense fallback={<Skeleton.Input active block />}>
          <ProFormText
            {...restProps}
            fieldProps={{
              ...(isStandalone && value !== undefined ? { value } : {}),
              ...(isStandalone && handleChange ? { onChange: (e) => handleChange(e.target.value) } : {}),
            }}
          />
        </Suspense>
      )
    case 'TextArea':
      return (
        <Suspense fallback={<Skeleton.Input active block />}>
          <ProFormTextArea
            {...restProps}
            fieldProps={{
              ...(isStandalone && value !== undefined ? { value } : {}),
              ...(isStandalone && handleChange ? { onChange: (e) => handleChange(e.target.value) } : {}),
            }}
          />
        </Suspense>
      )
    case 'Number':
      return (
        <Suspense fallback={<Skeleton.Input active block />}>
          <ProFormDigit
            {...restProps}
            fieldProps={{
              ...(isStandalone && value !== undefined ? { value } : {}),
              ...(isStandalone && handleChange ? { onChange: (v) => handleChange(v) } : {}),
            }}
          />
        </Suspense>
      )
    case 'NumberRange':
      return (
        <Suspense fallback={<Skeleton.Input active block />}>
          <ProFormDigitRange
            {...restProps}
            fieldProps={{
              ...(isStandalone && value !== undefined ? { value } : {}),
              ...(isStandalone && handleChange ? { onChange: (range) => handleChange(range) } : {}),
            }}
          />
        </Suspense>
      )
    case 'DatePicker':
      return (
        <Suspense fallback={<Skeleton.Input active block />}>
          <ProFormDatePicker
            {...restProps}
            fieldProps={{
              ...(isStandalone && value !== undefined ? { value } : {}),
              ...(isStandalone && handleChange ? { onChange: (_dateWithTimeStamp, date) => handleChange(date) } : {}),
            }}
          />
        </Suspense>
      )
    case 'DateRange':
      return (
        <Suspense fallback={<Skeleton.Input active block />}>
          <ProFormDateRangePicker
            {...restProps}
            fieldProps={{
              ...(isStandalone && value !== undefined ? { value } : {}),
              ...(isStandalone && handleChange ? { onChange: (_datesWithTimeStamp, dates) => handleChange(dates) } : {}),
            }}
          />
        </Suspense>
      )
    case 'Switch':
      return (
        <Suspense fallback={<Skeleton.Input active block />}>
          <ProFormSwitch
            {...restProps}
            valuePropName="checked"
            fieldProps={{
              ...(isStandalone && value !== undefined ? { checked: value } : {}),
              ...(isStandalone && handleChange ? { onChange: (checked) => handleChange(checked) } : {}),
            }}
          />
        </Suspense>
      )
    case 'Decimal':
      return (
        <Suspense fallback={<Skeleton.Input active block />}>
          <ProFormDigit
            {...restProps}
            fieldProps={{
              precision: input.precision,
              step: input.step,
              min: input.min,
              max: input.max,
              ...(isStandalone && value !== undefined ? { value } : {}),
              ...(isStandalone && handleChange ? { onChange: (v) => handleChange(v) } : {}),
            }}
          />
        </Suspense>
      )
    case 'Select':
      return (
        <WrapUnderCol formInfo={formInfo} colProps={colProps}>
          <Suspense fallback={<Skeleton.Input active block />}>
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
                {...(isStandalone && value !== undefined ? { value } : {})}
                {...(isStandalone && handleChange ? { onChange: (v) => handleChange(v) } : {})}
              />
            </ProFormItem>
          </Suspense>
        </WrapUnderCol>
      )
    case 'SelectRemoteOptions':
      return (
        <WrapUnderCol formInfo={formInfo} colProps={colProps}>
          <Suspense fallback={<Skeleton.Input active block />}>
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
                formInstance={formInfo?.formInstance}
                {...(isStandalone && value !== undefined ? { value } : {})}
                {...(isStandalone && handleChange ? { onChange: (v: any) => handleChange(v) } : {})}
              />
            </ProFormItem>
          </Suspense>
        </WrapUnderCol>
      )
    default:
      console.warn(`Unsupported input '${JSON.stringify(input)}' in FormField.`)
      return null
  }
}

const FormField = <T extends Record<string, any>>({ fieldKey, config, showLabel = true }: FormFieldProps<T>) => {
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

  const componentProps: FormFieldConfig<T> = {
    ...config,
    label: showLabel ? (typeof label === 'string' ? translate(label) : label) : undefined,
    hidden: isHidden,
    disabled: isDisabled,
    onChange,
    value,
  }

  return <FormComponent key={`${fieldKey}-${String(name)}`} {...componentProps} />
}

export default FormField
