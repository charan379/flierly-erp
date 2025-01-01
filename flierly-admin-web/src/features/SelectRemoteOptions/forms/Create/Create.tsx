import React, { useState } from 'react';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { PlusOutlined } from '@ant-design/icons';
import { DrawerForm } from '@ant-design/pro-components';
import { Button, Empty, Form, Skeleton, Space } from 'antd';
import crudService from '@/features/CrudModule/service/crud-module.service';
import './create.css';
import FormField, { FormFieldConfig } from '@/components/FormField';
import useLocale from '@/features/Locale/hooks/useLocale';

interface CreateProps {
  entity: string;
  formFields?: FormFieldConfig[]; // Form fields configuration
  title?: string;
  initialValues?: Record<string, any>;
  permissionCode?: RegExp;
  onCreateSuccess: (result: Record<string, any> | null) => void;
}

const Create: React.FC<CreateProps> = ({ entity, formFields, title = 'add', initialValues, permissionCode, onCreateSuccess }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const { hasPermission } = useAuth();
  const { translate } = useLocale();
  const [formInstance] = Form.useForm();

  // If the user lacks permission, render an empty state
  if (permissionCode && !hasPermission(permissionCode)) return <Empty />;

  const onFinish = async (values: Record<string, any>): Promise<boolean | void> => {
    setIsLoading(true); // Show loading indicator
    const response = await crudService.create({ entity, data: values });

    if (response?.success) {
      setIsLoading(false); // Stop loading
      setIsDrawerOpen(false); // Close the drawer
      onCreateSuccess(response?.result)
      return true;
    }
    setIsLoading(false); // Stop loading even if the request fails
  };

  // If no form fields are provided, render nothing
  if (!formFields) return null;

  return (
    <DrawerForm
      form={formInstance}
      initialValues={initialValues}
      title={title}
      grid={true}
      onFinish={onFinish}
      loading={isLoading}
      id="select-remote-options-create-form"
      trigger={
        <Button type="primary" icon={<PlusOutlined />} size="middle" style={{ backgroundColor: 'teal', width: "100%", marginTop: "2px" }} disabled={formFields.length === 0}>
          {title}
        </Button>
      }
      resize={{
        maxWidth: window.innerWidth * 0.9,
        minWidth: window.innerWidth * 0.5,
      }}
      drawerProps={{
        destroyOnClose: true, // Destroy the drawer on close
        styles: {
          footer: { padding: '15px 15px 15px 15px' },
          header: { padding: '10px 5px 5px 5px' },
        },
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        afterOpenChange: (change) => setIsDrawerOpen(change), // Update drawer open state
      }}
      submitter={{
        searchConfig: {
          resetText: translate('cancel'),
          submitText: translate('save'),
        },
      }}
    >
      {isDrawerOpen ? (
        formFields.map((field) => (
          <FormField
            key={`${entity}-${String(field.name)}`}
            config={field}
            fieldKey={`${entity}-${String(field.name)}`}
          />
        ))
      ) : (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
          {formFields?.map((_, index) => (
            <Skeleton.Input active block key={index} />
          ))}
        </Space>
      )}
    </DrawerForm>
  );
};

export default Create;
