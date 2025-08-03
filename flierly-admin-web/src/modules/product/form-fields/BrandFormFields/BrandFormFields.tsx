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
                label={t('record.id')}
                hidden={!isEditForm}
                disabled={true}
            />

            {/* name - Input for name */}
            <ProFormText
                name={'name'}
                label={t('record.name')}
                hasFeedback
                rules={[
                    { required: true, message: t('record.name.required') },
                    { pattern: vr('record.name'), message: t('record.name.pattern') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('record.name').test(value)) return Promise.resolve();
                            return entityExistenceValidator(`record-name-validation`, {
                                entity: "brand",
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: { $iContains: value }
                                },
                                rejectionMessage: t('record.name.already_exists')
                            });
                        },
                    })
                ]}
                disabled={(isEditForm && !hasPermission(pr('brand.update'))) || disabledFields?.includes('name')}
            />

            {/* description - Textarea for description */}
            <ProFormTextArea
                name={'description'}
                label={t('record.description')}
                rules={[
                    { required: true, message: t('record.description.required') },
                    { pattern: vr('record.description'), message: t('record.description.pattern') },
                ]}
                disabled={(isEditForm && !hasPermission(pr('brand.update'))) || disabledFields?.includes('description')}
            />
        </>
    )
};

export default BrandFormFields