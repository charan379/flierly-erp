import FormField, { FormFieldConfig } from '@/components/FormField'
import useLocale from '@/features/Locale/hooks/useLocale'
import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { ProForm, ProFormDependency, ProFormItem, ProFormSelect } from '@ant-design/pro-components'
import { Button, Flex, Input, Tooltip } from 'antd'
import { useRef } from 'react'

interface FilterProps<T = Record<string, any>> {
  filterConfig: {
    label: string
    name: keyof T
    formField: FormFieldConfig<T>
  }[]
  onFilter: (filter: { queryField: string; query: any }) => void
  onReset: () => void
}

const Filter = <T extends Record<string, any>>({ filterConfig, onFilter, onReset }: FilterProps<T>) => {
  const { translate } = useLocale()

  const formRef = useRef<any>()

  return (
    <ProForm
      id="genric-assignment-manager-query-from"
      formRef={formRef}
      onFinish={onFilter}
      onReset={onReset}
      style={{ justifyContent: 'end', display: 'flex', gap: '5px', flexWrap: 'nowrap' }}
      onValuesChange={(changedValues, _values) => {
        if ('queryField' in changedValues) {
          formRef?.current?.setFieldValue?.('query', undefined)
        }
      }}
      submitter={{
        render(props, _dom) {
          return (
            <Flex gap={0} wrap={'nowrap'} align="end">
              <Tooltip title={translate('search')}>
                <Button
                  key={'submit'}
                  onClick={props.submit}
                  style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px', border: 'none' }}
                  icon={<SearchOutlined />}
                  type="primary"
                />
              </Tooltip>
              <Tooltip title={translate('clear_filter')}>
                <Button
                  key={'reset'}
                  onClick={props.reset}
                  style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', border: 'none' }}
                  icon={<CloseOutlined />}
                  type="primary"
                  danger
                />
              </Tooltip>
            </Flex>
          )
        },
      }}
    >
      <Flex style={{ width: '100%' }} align="end" gap={0} id="from-fields" wrap={'nowrap'}>
        {/* Prefix Field */}
        <div className="query-form-item" style={{ maxWidth: '120px', width: '120px' }}>
          <ProFormSelect
            name="queryField"
            placeholder={'Select field'}
            style={{ textAlign: 'left' }}
            fieldProps={{ dropdownStyle: { textAlign: 'left' } }}
            rules={[{ required: true, message: '' }]}
            options={filterConfig.map((c) => ({
              label: c.label,
              value: c.name as string,
            }))}
          />
        </div>
        {/* Dependent Field */}
        <ProFormDependency name={['queryField']}>
          {({ queryField }) => {
            const selectedField = filterConfig.find((config) => config.name === queryField)
            if (selectedField) {
              return (
                <div className="query-form-item" style={{ width: '180px', maxWidth: '180px' }}>
                  <FormField config={{ ...selectedField.formField, formInfo: { gridForm: false }, name: 'query' }} showLabel={false} />
                </div>
              )
            }
            return (
              <div className="query-form-item" style={{ width: '150px' }}>
                <ProFormItem>
                  <Input placeholder="Please enter" />
                </ProFormItem>
              </div>
            )
          }}
        </ProFormDependency>
      </Flex>
    </ProForm>
  )
}

export default Filter
