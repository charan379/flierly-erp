import React, { useState } from 'react';
import { Button, Skeleton, Space, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, DrawerForm } from '@ant-design/pro-components';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';
import crudService from '../../../CrudModule/service/crud-module.service';
import { FormInstance } from 'antd/lib';
import './create.css';

interface CreateProps<T = Record<string, any>> {
  entity: string;
  formFields?: React.ReactNode;
  title: string | React.ReactNode
  render: boolean;
  actions?: ActionType;
  handleValuesChange?: (changedValues: Record<string, any>, allValues: Record<string, any>) => void;
  formInstance?: FormInstance<T>;
}

const Create = <T extends Record<string, any>>({
  entity,
  formFields = [],
  title = 'add-form',
  render,
  actions,
  handleValuesChange,
  formInstance: addFormInstance,
}: CreateProps<T>): JSX.Element | null => {
  const { translate: t } = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!render || !formFields || !actions) return null;

  const onFinish = async (values: T): Promise<boolean> => {
    setIsLoading(true);
    const response = await crudService.create({ entity, data: values });
    setIsLoading(false);
    if (response?.success) {
      actions.reload();
      setIsDrawerOpen(false)
      return true;
    }
    return false;
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
      form={addFormInstance}
      title={title}
      onValuesChange={handleValuesChange}
      onFinish={onFinish}
      id="crud-table-create-form"
      loading={isLoading}
      open={isDrawerOpen}
      trigger={
        <Tooltip title={`${t('tooltip.create_record')} ${entity}`}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            shape="circle"
            size="small"
            style={{ backgroundColor: 'teal' }}
            disabled={!formFields}
          />
        </Tooltip>
      }
      resize={{
        maxWidth: window.innerWidth * 0.9,
        minWidth: window.innerWidth * 0.5,
      }}
      drawerProps={{
        destroyOnClose: true,
        onClose: handleOnClose,
        afterOpenChange: setIsDrawerOpen,
        extra: (
          <Space>
            <Button danger type="primary" onClick={handleOnClose}>
              {t('button.close')}
            </Button>
          </Space>
        ),
        styles: {
          footer: { padding: '10px 15px' },
        },
      }}
      submitter={{
        searchConfig: {
          resetText: t('button.cancel'),
          submitText: t('button.submit'),
        },
      }}
    >
      {renderFormFields}
    </DrawerForm >
  );
};

export default Create;
