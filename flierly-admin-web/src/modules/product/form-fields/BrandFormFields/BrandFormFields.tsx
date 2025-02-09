import { useAuth } from '@/modules/auth/hooks/useAuth';
import { ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { FormInstance } from 'antd';
import React from 'react';
import vr from '@/modules/core/utils/get-validation-regex.util';
import entityExistenceValidator from '@/modules/core/utils/entity-existence.validator';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';

export interface BrandFormFieldsProps {
    formInstance?: FormInstance<Brand>;
    isEditForm?: boolean;
    disabledFields?: Array<keyof Brand>
}
const BrandFormFields: React.FC<BrandFormFieldsProps> = ({ disabledFields, formInstance: _, isEditForm }) => {
    const { translate: t } = useLocale();  // Hook to get translation functions
    const { hasPermission, getPermissionRegex: pr } = useAuth(); // Hook to check permissions 

    return (
        <>
            {/* id - Hidden field for edit form */}
            <ProFormDigit
                name={'id'}
                label={t('entity.id')}
                hidden={!isEditForm}
                disabled={true}
            />

            {/* name - Input for name */}
            <ProFormText
                name={'name'}
                label={t('entity.name')}
                hasFeedback
                rules={[
                    { required: true, message: t('entity.nameRequired') },
                    { pattern: vr('name'), message: t('entity.namePattern') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('name').test(value)) return Promise.resolve();
                            return entityExistenceValidator(`entity-name-validation`, {
                                entity: "brand",
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: value
                                },
                                rejectionMessage: t('entity.nameAlreadyExists')
                            });
                        },
                    })
                ]}
                disabled={(isEditForm && !hasPermission(pr('brand.update'))) || disabledFields?.includes('name')}
            />

            {/* description - Textarea for description */}
            <ProFormTextArea
                name={'description'}
                label={t('entity.description')}
                rules={[
                    { required: true, message: t('entity.descriptionRequired') },
                    { pattern: vr('description'), message: t('entity.descriptionPattern') },
                ]}
                disabled={(isEditForm && !hasPermission(pr('brand.update'))) || disabledFields?.includes('description')}
            />
        </>
    )
}

export default BrandFormFields