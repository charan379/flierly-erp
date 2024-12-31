import { Form, Skeleton, Space } from 'antd'
import { ActionType, DrawerForm } from '@ant-design/pro-components'
import useLocale from '@/features/Locale/hooks/useLocale'
import crudService from '../../../CrudModule/service/crud-module.service'
import FormField, { FormFieldConfig } from '@/components/FormField'
import { useState } from 'react'
import './update.css'

// Define types for the component props
interface UpdateProps<T = Record<string, any>> {
  entity: string // Entity name for CRUD operations
  formFields?: FormFieldConfig<T>[] // Form fields configuration
  title?: string // Optional title for the drawer
  data: Record<string, any> // Data to initialize the form
  id: number | string // ID for the record being updated
  isOpen: boolean // Whether the drawer is open
  close: () => void // Function to close the drawer
  render: boolean // A boolean to control the rendering of the component
  actions: ActionType | undefined // Actions for table reload, etc.
}

const Update = <T extends Record<string, any>>({
  entity,
  formFields,
  title = 'update',
  data,
  id,
  isOpen,
  close,
  render,
  actions,
}: UpdateProps<T>): JSX.Element | null => {
  const { translate } = useLocale();
  const [formInstance] = Form.useForm<T>();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(isOpen);

  const onFinish = async (values: T): Promise<boolean | void> => {
    const response = await crudService.update<T>({ entity, data: values, id })

    if (response?.success) {
      actions?.reload()
      close()
      return true
    }
  }

  if (!render || !formFields || !actions) return null

  return (
    <DrawerForm
      form={formInstance}
      id="crud-table-update-form"
      title={title}
      grid={true}
      onFinish={onFinish}
      open={isOpen}
      initialValues={data}
      resize={{
        maxWidth: window.innerWidth * 0.9,
        minWidth: window.innerWidth * 0.5,
      }}
      drawerProps={{
        destroyOnClose: true,
        onClose: close,
        afterOpenChange: (change) => setIsDrawerOpen(change),
        styles: {
          footer: { padding: '15px 15px 15px 15px' },
          header: { padding: '10px 5px 5px 5px' },
        },
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

export default Update
