import { useAuth } from '@/modules/auth/hooks/useAuth';
import entityExistenceValidator from '@/modules/core/utils/entity-existence.validator';
import vr from '@/modules/core/utils/get-validation-regex.util';
import { ProFormDigit, ProFormItem, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Form, FormInstance } from 'antd';
import React from 'react';
import ProductCategoryFormFields from '../ProductCategoryFormFields';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';
import SelectRemoteOptions from '@/modules/core/features/SelectRemoteOptions';
import fetchEntityRecordsAsOptions from '@/modules/core/features/SelectRemoteOptions/utils/fetch-entity-rows-as-options';

export interface ProductSubCategoryFormFieldsProps {
    formInstance?: FormInstance<ProductSubCategory>;
    isEditForm?: boolean;
    disabledFields?: Array<keyof ProductSubCategory>
}

const ProductSubCategoryFormFields: React.FC<ProductSubCategoryFormFieldsProps> = ({ formInstance, isEditForm, disabledFields }) => {
    const { translate: t } = useLocale();  // Hook to get translation functions
    const { hasPermission, getPermissionRegex: pr } = useAuth(); // Hook to check permissions 

    const [productCategoryFormInstance] = Form.useForm<ProductCategory>();

    return (
        <>
            {/* id - Hidden field for edit form */}
            <ProFormDigit
                name={'id'}
                label={t('entity.id')}
                hidden={!isEditForm}
                disabled={true}
            />
            {/* name - Input for subcategory name */}
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
                                entity: "product-sub-category",
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: value
                                },
                                rejectionMessage: t('entity.nameAlreadyExists')
                            });
                        },
                    })
                ]}
                disabled={(isEditForm && !hasPermission(pr('productSubCategory.update'))) || disabledFields?.includes('name')}
            />
            {/* code - Input for subcategory code */}
            <ProFormText
                name={'code'}
                label={t('entity.code')}
                hasFeedback
                rules={[
                    { required: true, message: t('entity.codeRequired') },
                    { pattern: vr('code'), message: t('entity.codePattern') },
                ]}
                disabled={(isEditForm && !hasPermission(pr('productSubCategory.manage'))) || disabledFields?.includes('code')}
            />
            {/* category - Select input for product category */}
            <ProFormItem
                name={'category'}
                label={t('product.category')}
                rules={[{ required: true, message: t('product.categoryRequired') }]}
            >
                <SelectRemoteOptions<ProductCategory>
                    name={'category'}
                    debounceTimeout={300}
                    allowClear
                    disabled={(isEditForm && !hasPermission(pr('product.manage'))) || disabledFields?.includes('category')}
                    optionCreatorConfig={{
                        entity: "product-category",
                        formFields: <ProductCategoryFormFields />,
                        formInstance: productCategoryFormInstance,
                        permissionCode: pr('productCategory.create'),
                        onCreateSuccess: (pc, appendOptions) => {
                            formInstance?.setFieldValue('category', pc.id)
                            appendOptions(prev => [...prev, { label: pc.name, value: String(pc.id) }])
                        }
                    }}
                    asyncOptionsFetcher={(v: string) => {
                        const category = formInstance?.getFieldValue('category');
                        let filters;

                        // Filters logic based on input value
                        if (v === "focus") {
                            filters = category
                                ? { id: { $in: [category, ...Array.from({ length: 9 }, (_, i) => i + 1)] } }
                                : { name: { $ilike: `%` } };
                        } else {
                            filters = category && !v
                                ? { id: { $equalTo: category } }
                                : { name: { $ilike: `%${v}%` } };
                        }

                        const getLabel = (e: ProductCategory) => e.name;
                        const getValue = (e: ProductCategory) => String(e.id);
                        const processBrandsAsOptions = (categories: ProductCategory[]) => categories.map((cat) => ({ label: getLabel(cat), value: getValue(cat) }));
                        return fetchEntityRecordsAsOptions('product-category', filters, 10, processBrandsAsOptions);
                    }}
                />
            </ProFormItem>
            {/* description - Textarea for subcategory description */}
            <ProFormTextArea
                name={'description'}
                label={t('entity.description')}
                rules={[
                    { required: true, message: t('entity.descriptionRequired') },
                    { pattern: vr('description'), message: t('entity.descriptionPattern') },
                ]}
                disabled={(isEditForm && !hasPermission(pr('productSubCategory.update'))) || disabledFields?.includes('description')}
            />
            {/* isActive - Switch for active status */}
            <ProFormSwitch
                name={'isActive'}
                label={t('entity.isActive')}
                hasFeedback
                disabled={(isEditForm && !hasPermission(pr('productSubCategory.manage'))) || disabledFields?.includes('isActive')}
            />
        </>
    );
};

export default ProductSubCategoryFormFields;
