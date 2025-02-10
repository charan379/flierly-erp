import { useAuth } from '@/modules/auth/hooks/useAuth';
import entityExistenceValidator from '@/modules/core/utils/entity-existence.validator';
import vr from '@/modules/core/utils/get-validation-regex.util';
import { ProFormDigit, ProFormItem, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
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
            {/* category - Select input for product category */}
            <ProFormItem
                name={'categoryId'}
                label={t('product.category')}
                rules={[{ required: true, message: t('product.categoryRequired') }]}
            >
                <SelectRemoteOptions<ProductCategory>
                    name={'categoryId'}
                    debounceTimeout={300}
                    allowClear
                    disabled={(isEditForm && !hasPermission(pr('product.manage'))) || disabledFields?.includes('category')}
                    optionCreatorConfig={{
                        entity: "product-category",
                        formFields: <ProductCategoryFormFields />,
                        formInstance: productCategoryFormInstance,
                        permissionCode: pr('productCategory.create'),
                        onCreateSuccess: (pc, appendOptions) => {
                            appendOptions(prev => [...prev, { label: pc.name, value: pc.id }]);
                            formInstance?.setFieldValue('categoryId', pc.id)
                        }
                    }}
                    asyncOptionsFetcher={(v: string) => {
                        const categoryId = formInstance?.getFieldValue('categoryId');
                        let filters;

                        // Filters logic based on input value
                        if (v === "focus") {
                            filters = categoryId
                                ? { id: { $in: [categoryId, ...Array.from({ length: 9 }, (_, i) => i + 1)] } }
                                : { name: { $iContains: `%` } };
                        } else {
                            filters = categoryId && !v
                                ? { id: { $equalTo: categoryId } }
                                : { name: { $iContains: `%${v}%` } };
                        }

                        const getLabel = (e: ProductCategory) => e.name;
                        const getValue = (e: ProductCategory) => e.id;
                        const processCategoriesAsOptions = (categories: ProductCategory[]) => {
                            return categories.map(c => ({ label: getLabel(c), value: getValue(c) }))
                        };

                        return fetchEntityRecordsAsOptions('product-category', filters, 10, processCategoriesAsOptions);
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
        </>
    );
};

export default ProductSubCategoryFormFields;
