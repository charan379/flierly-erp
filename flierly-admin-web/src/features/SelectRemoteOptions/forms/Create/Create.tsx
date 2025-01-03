import React, { useState } from 'react';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { PlusOutlined } from '@ant-design/icons';
import { DrawerForm } from '@ant-design/pro-components';
import { Button, FormInstance, Skeleton, Space } from 'antd';
import crudService from '@/features/CrudModule/service/crud-module.service';
import './create.css';
import useLocale from '@/features/Locale/hooks/useLocale';


interface CreateProps<T> {
  entity: string;
  formFields: React.ReactNode; // Form fields configuration
  title?: string | React.ReactNode;
  initialValues?: Partial<Record<keyof T, any>>;
  permissionCode: RegExp;
  formInstance?: FormInstance<T>;
  onCreate: (result: T | null) => void;
}

const Create = <T,>({ entity, formFields, title = 'add', initialValues, permissionCode, onCreate, formInstance }: CreateProps<T>) => {
  const { translate: t } = useLocale();
  const { hasPermission } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // If no form fields are provided, render nothing
  if (!formFields) return null;

  const onFinish = async (values: T): Promise<boolean | void> => {
    setIsLoading(true); // Show loading indicator
    const response = await crudService.create({ entity, data: values });

    if (response?.success) {
      setIsLoading(false); // Stop loading
      setIsDrawerOpen(false); // Close the drawer
      onCreate(response?.result)
      return true;
    }
    setIsLoading(false); // Stop loading even if the request fails
  };

  const handleOnClose = () => {
    setIsDrawerOpen(false);
  };

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
      initialValues={initialValues}
      form={formInstance}
      title={title}
      onFinish={onFinish}
      loading={isLoading}
      open={isDrawerOpen}
      id="select-remote-options-create-form"
      trigger={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="middle"
          style={{ backgroundColor: 'teal', width: "100%", marginTop: "2px" }}
          disabled={permissionCode && !hasPermission(permissionCode)}
        >
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
          footer: { padding: '10px 15px' },
        },
        extra: (
          <Space>
            <Button danger type="primary" onClick={handleOnClose}>
              {t('action.button.close')}
            </Button>
          </Space>
        ),
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        onKeyDown: (e) => {
          e.stopPropagation();
        },
        onKeyUp: (e) => {
          e.stopPropagation();
        },
        onMouseOver: (e) => {
          e.stopPropagation()
        },
        onMouseEnter: (e) => {
          e.stopPropagation()
        },
        onMouseLeave: (e) => {
          e.stopPropagation()
        },
        onClose: handleOnClose,
        afterOpenChange: (change) => setIsDrawerOpen(change), // Update drawer open state
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
  );
};

export default Create;
