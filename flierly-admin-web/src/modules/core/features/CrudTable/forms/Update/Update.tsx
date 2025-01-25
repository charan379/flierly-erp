import { Button, Skeleton, Space } from 'antd'
import { ActionType, DrawerForm } from '@ant-design/pro-components'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import crudService from '../../../CrudModule/service/crud-module.service'
import { useState } from 'react'
import './update.css'
import { FormInstance } from 'antd/lib'

// Define types for the component props
interface UpdateProps<T = Record<string, any>> {
  entity: string // Entity name for CRUD operations
  formFields?: React.ReactNode;
  title: string | React.ReactNode
  data: Record<string, any> // Data to initialize the form
  id: number | string // ID for the record being updated
  isOpen: boolean // Whether the drawer is open
  close: () => void // Function to close the drawer
  render: boolean // A boolean to control the rendering of the component
  actions: ActionType | undefined // Actions for table reload, etc.
  formInstance?: FormInstance<T>
}

const Update = <T extends Record<string, any>>({
  entity,
  formFields,
  title = 'edit-form',
  data,
  id,
  isOpen,
  close,
  render,
  actions,
  formInstance: formInstance
}: UpdateProps<T>): JSX.Element | null => {
  const { translate: t } = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(isOpen);

  const onFinish = async (values: T): Promise<boolean | void> => {
    setIsLoading(true);
    const response = await crudService.update<T>({ entity, data: values, id });
    setIsLoading(false);
    if (response?.success) {
      actions?.reload();
      close();
      return true;
    }
    return false;
  };

  if (!render || !formFields || !actions) return null;

  const renderFormFields =
    isDrawerOpen
      ? formFields
      : (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
          {Array(10).fill(10)?.map((_, index) => (
            <Skeleton.Input active block key={index} />
          ))}
        </Space>
      );

  return (
    <DrawerForm<T>
      form={formInstance}
      id="crud-table-update-form"
      title={title}
      onFinish={onFinish}
      open={isOpen}
      initialValues={data}
      loading={isLoading}
      resize={{
        maxWidth: window.innerWidth * 0.9,
        minWidth: window.innerWidth * 0.5,
      }}
      drawerProps={{
        destroyOnClose: true,
        onClose: close,
        afterOpenChange: (change) => setIsDrawerOpen(change),
        extra: (
          <Space>
            <Button danger type="primary" onClick={close}>
              {t('action.button.close')}
            </Button>
          </Space>
        ),
        styles: {
          footer: { padding: '10px 15px' },
        },
      }}
      submitter={{
        searchConfig: {
          resetText: t('action.button.cancel'),
          submitText: t('action.button.submit'),
        },
      }}
    >
      {renderFormFields}
    </DrawerForm>
  )
}

export default Update
