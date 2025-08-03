import { useAuth } from '@/modules/auth/hooks/useAuth';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';
import entityExistenceValidator from '@/modules/core/utils/entity-existence.validator';
import vr from '@/modules/core/utils/get-validation-regex.util';
import { ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { FormInstance } from 'antd';
import React from 'react';

export interface ProductCategoryFormFieldsProps {
    formInstance?: FormInstance<ProductCategory>;
    isEditForm?: boolean;
    disabledFields?: Array<keyof ProductCategory>
}

const ProductCategoryFormFields: React.FC<ProductCategoryFormFieldsProps> = ({ formInstance: _, isEditForm, disabledFields }) => {
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

            {/* name - Input for category name */}
            <ProFormText
                name={'name'}
                label={t('record.name')}
                hasFeedback
                rules={[
                    { required: true, message: t('record.name.required') },
                    { pattern: vr('record.name'), message: t('record.name.invalid') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('record.name').test(value)) return Promise.resolve();
                            return entityExistenceValidator(`record-name-validation`, {
                                entity: "product-category",
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: { $iContains: value }
                                },
                                rejectionMessage: t('record.name.already_exists')
                            });
                        },
                    })
                ]}
                disabled={(isEditForm && !hasPermission(pr('productCategory.update'))) || disabledFields?.includes('name')}
            />

            {/* description - Textarea for category description */}
            <ProFormTextArea
                name={'description'}
                label={t('record.description')}
                rules={[
                    { required: true, message: t('record.description.required') },
                    { pattern: vr('record.description'), message: t('record.description.invalid') },
                ]}
                disabled={(isEditForm && !hasPermission(pr('productCategory.update'))) || disabledFields?.includes('description')}
            />
        </>
    );
};

export default ProductCategoryFormFields;
