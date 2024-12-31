import { Button, Form, Skeleton, Space, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { ActionType, DrawerForm } from '@ant-design/pro-components'
import useLocale from '@/features/Locale/hooks/useLocale'
import crudService from '../../../CrudModule/service/crud-module.service'
import FormField, { FormFieldConfig } from '@/components/FormField'
import { useState } from 'react'
import './create.css'

// Define the types for props
interface CreateProps<T = Record<string, any>> {
  entity: string // Entity name to interact with CRUD service
  formFields?: FormFieldConfig<T>[] // Form fields configuration
  title?: string // Optional title for the drawer
  render: boolean // Whether to render the component
  actions: ActionType | undefined // Actions object for table reload, etc.
}

const Create = <T extends Record<string, any>>({ entity, formFields, title = 'add', render, actions }: CreateProps<T>): JSX.Element | null => {

  const { translate } = useLocale()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  // Properly initialize and connect form instance
  const [form] = Form.useForm<T>()

  const onFinish = async (values: T): Promise<boolean | void> => {
    setIsLoading(true)
    const response = await crudService.create({ entity, data: values })

    if (response?.success) {
      actions?.reload()
      setIsLoading(false)
      return true
    }
    setIsLoading(false)
  }

  if (!render || !formFields || !actions) return null

  return (
    <DrawerForm<T>
      form={form} // Pass the form instance here
      title={title}
      grid={true}
      onFinish={onFinish}
      id="crud-table-create-form"
      trigger={
        <Tooltip title={translate('add_data')}>
          <Button type="primary" icon={<PlusOutlined />} shape="circle" size="small" style={{ backgroundColor: 'teal' }} disabled={formFields.length === 0} />
        </Tooltip>
      }
      loading={isLoading}
      resize={{
        maxWidth: window.innerWidth * 0.9,
        minWidth: window.innerWidth * 0.5,
      }}
      drawerProps={{
        destroyOnClose: true,
        styles: {
          footer: { padding: '15px 15px 15px 15px' },
          header: { padding: '10px 5px 5px 5px' },
        },
        afterOpenChange: (change) => setIsDrawerOpen(change),
      }}
      submitter={{
        searchConfig: {
          resetText: translate('cancel'),
          submitText: translate('save'),
        },
      }}
    >
      {isDrawerOpen ? (
        formFields.map((field) => <FormField key={`${entity}-${String(field.name)}`} config={field} fieldKey={`${entity}-${String(field.name)}`} />)
      ) : (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
          {formFields?.map((_, index) => {
            return <Skeleton.Input active block key={index} />
          })}
        </Space>
      )}
    </DrawerForm>
  )
}

export default Create
