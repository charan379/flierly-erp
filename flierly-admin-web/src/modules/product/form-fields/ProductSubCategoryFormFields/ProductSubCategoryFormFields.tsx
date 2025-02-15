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
                label={t('record.id')}
                hidden={!isEditForm}
                disabled={true}
            />
            {/* name - Input for subcategory name */}
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
                                entity: "product-sub-category",
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: { $iContains: value }
                                },
                                rejectionMessage: t('record.name.already_exists')
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
                rules={[{ required: true, message: t('product.category.required') }]}
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
                        onCreateSuccess: (productCategory, appendOptions) => {
                            appendOptions(prev => [...prev, { label: productCategory.name, value: productCategory.id }]);
                            formInstance?.setFieldValue('categoryId', productCategory.id)
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

                        const getLabel = (record: ProductCategory) => record.name;
                        const getValue = (record: ProductCategory) => record.id;
                        const processCategoriesAsOptions = (categories: ProductCategory[]) => {
                            return categories.map(category => ({ label: getLabel(category), value: getValue(category) }))
                        };

                        return fetchEntityRecordsAsOptions('product-category', filters, 10, processCategoriesAsOptions);
                    }}
                />
            </ProFormItem>
            {/* description - Textarea for subcategory description */}
            <ProFormTextArea
                name={'description'}
                label={t('record.description')}
                rules={[
                    { required: true, message: t('record.description.required') },
                    { pattern: vr('record.description'), message: t('record.description.invalid') },
                ]}
                disabled={(isEditForm && !hasPermission(pr('productSubCategory.update'))) || disabledFields?.includes('description')}
            />
        </>
    );
};

export default ProductSubCategoryFormFields;
