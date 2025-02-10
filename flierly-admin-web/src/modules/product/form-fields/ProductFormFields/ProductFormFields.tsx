import useLocale from '@/modules/core/features/Locale/hooks/useLocale';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import entityExistenceValidator from '@/modules/core/utils/entity-existence.validator';
import vr from '@/modules/core/utils/get-validation-regex.util';
import { ProFormDependency, ProFormDigit, ProFormItem, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Form, FormInstance } from 'antd';
import React from 'react';
import ProductCategoryFormFields from '../ProductCategoryFormFields';
import ProductSubCategoryFormFields from '../ProductSubCategoryFormFields';
import SelectRemoteOptions from '@/modules/core/features/SelectRemoteOptions';
import fetchEntityRecordsAsOptions, { ProcessResultFunction } from '@/modules/core/features/SelectRemoteOptions/utils/fetch-entity-rows-as-options';

export interface ProductFormFieldsProps {
    formInstance?: FormInstance<Product>;
    isEditForm?: boolean;
    disabledFields?: Array<keyof Product>;
}

const ProductFormFields: React.FC<ProductFormFieldsProps> = ({ formInstance, isEditForm, disabledFields }) => {
    const { translate: t } = useLocale();  // Hook to get translation functions
    const { hasPermission, getPermissionRegex: pr } = useAuth(); // Hook to check permissions
    const [productCategoryFormInstance] = Form.useForm<ProductCategory>();
    const [productSubCategoryFormInstance] = Form.useForm<ProductSubCategory>();

    return (
        <>
            {/* id - Hidden field for edit form */}
            <ProFormDigit
                name={'id'}
                label={t('entity.id')}
                hidden={!isEditForm}
                disabled={true}
            />

            {/* name - Input for product name */}
            <ProFormText
                name={'name'}
                label={t('entity.name')}
                rules={[
                    { required: true, message: t('entity.nameRequired') },
                    { pattern: vr('name'), message: t('entity.namePattern') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('name').test(value)) return Promise.resolve();
                            return entityExistenceValidator(`entity-name-validation`, {
                                entity: "product",
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: value
                                },
                                rejectionMessage: t('entity.nameAlreadyExists')
                            });
                        },
                    })
                ]}
                disabled={(isEditForm && !hasPermission(pr('product.update'))) || disabledFields?.includes('name')}
            />

            {/* sku - Input for product SKU */}
            <ProFormText
                name={'sku'}
                label={t('product.sku')}
                rules={[
                    { required: true, message: t('product.skuRequired') },
                    { pattern: vr('sku'), message: t('entity.skuPattern') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('sku').test(value)) return Promise.resolve();
                            return entityExistenceValidator(`product-sku-validation`, {
                                entity: "product",
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    sku: value
                                },
                                rejectionMessage: t('product.skuAlreadyExists')
                            });
                        },
                    })
                ]}
                disabled={(isEditForm && !hasPermission(pr('product.manage'))) || disabledFields?.includes('sku')}
            />

            {/* hsn - Input for HSN code */}
            <ProFormText
                name={'hsn'}
                label={t('product.hsn')}
                rules={[
                    { required: true, message: t('product.hsnRequired') },
                    { pattern: vr('hsn'), message: t('product.hsnPattern') },
                ]}
                disabled={isEditForm && !hasPermission(pr('product.manage'))}
            />

            {/* description - Textarea for product description */}
            <ProFormTextArea
                name={'description'}
                label={t('entity.description')}
                rules={[
                    { required: true, message: t('entity.descriptionRequired') },
                    { pattern: vr('description'), message: t('entity.descriptionPattern') },
                ]}
                disabled={disabledFields?.includes('description')}
            />

            {/* isActive - Switch for active status */}
            <ProFormSwitch
                name={'isActive'}
                label={t('entity.isActive')}
                disabled={(isEditForm && !hasPermission(pr('product.manage'))) || disabledFields?.includes('isActive')}
            />

            {/* isComposite - Switch for composite product status */}
            <ProFormSwitch
                name={'isComposite'}
                label={t('product.isComposite')}
                disabled={(isEditForm && !hasPermission(pr('product.manage'))) || disabledFields?.includes('isComposite')}
            />

            {/* isSerialized - Switch for serialized product status */}
            <ProFormSwitch
                name={'isSerialized'}
                label={t('product.isSerialized')}
                disabled={(isEditForm && !hasPermission(pr('product.manage'))) || disabledFields?.includes('isSerialized')}
            />

            {/* brand - Select input for product brand */}
            <ProFormItem
                name={'brand'}
                label={t('product.brand')}
                rules={[{ required: true, message: t('product.brandRequired') }]}
            >
                <SelectRemoteOptions
                    name={'brand'}
                    debounceTimeout={300}
                    disabled={(isEditForm && !hasPermission(pr('product.manage'))) || disabledFields?.includes('brand')}
                    asyncOptionsFetcher={(v: string) => {
                        const brand = formInstance?.getFieldValue('brand');
                        let filters;

                        // Filters logic based on input value
                        if (v === "focus") {
                            filters = brand
                                ? { id: { $in: [brand, ...Array.from({ length: 9 }, (_, i) => i + 1)] } }
                                : { name: { $iContains: `%` } };
                        } else {
                            filters = brand && !v
                                ? { id: { $equalTo: brand } }
                                : { name: { $iContains: `%${v}%` } };
                        }

                        const getLabel = (e: Brand) => e.name;
                        const getValue = (e: Brand) => String(e.id);
                        const processBrandsAsOptions: ProcessResultFunction<Brand> = (brands: Brand[]) => brands.map((brand) => ({ label: getLabel(brand), value: getValue(brand) }));
                        return fetchEntityRecordsAsOptions<Brand>('brand', filters, 10, processBrandsAsOptions);
                    }}
                />
            </ProFormItem>

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
                                : { name: { $iContains: `%` } };
                        } else {
                            filters = category && !v
                                ? { id: { $equalTo: category } }
                                : { name: { $iContains: `%${v}%` } };
                        }

                        const getLabel = (e: ProductCategory) => e.name;
                        const getValue = (e: ProductCategory) => String(e.id);
                        const processBrandsAsOptions = (categories: ProductCategory[]) => categories.map((cat) => ({ label: getLabel(cat), value: getValue(cat) }));
                        return fetchEntityRecordsAsOptions('product-category', filters, 10, processBrandsAsOptions);
                    }}
                />
            </ProFormItem>

            {/* subCategory - Select input for product subcategory */}
            <ProFormDependency
                name={['category']}
                shouldUpdate={(prevValues, currentValues) => {
                    const update = prevValues?.category !== currentValues?.category;

                    if (update) {
                        formInstance?.setFieldValue('subCategory', undefined);
                        productSubCategoryFormInstance.setFieldValue('category', currentValues?.category)
                    }
                    return update;
                }}
            >
                {({ category }) => {
                    return (
                        <ProFormItem
                            name={'subCategory'}
                            label={t('product.subCategory')}
                            rules={[{ required: true, message: t('product.subCategoryRequired') }]}
                        >
                            <SelectRemoteOptions<ProductSubCategory>
                                name={'subCategory'}
                                debounceTimeout={300}
                                disabled={(isEditForm && !hasPermission(pr('product.manage')) || !category) || disabledFields?.includes('subCategory')}  // Disable if no category selected
                                optionCreatorConfig={{
                                    entity: "product-sub-category",
                                    formFields: <ProductSubCategoryFormFields formInstance={productSubCategoryFormInstance} disabledFields={['category']} />,
                                    formInstance: productSubCategoryFormInstance,
                                    formInitialValues: { category: category },
                                    permissionCode: pr('productSubCategory.create'),
                                    onCreateSuccess: (pc, appendOptions) => {
                                        formInstance?.setFieldValue('subCategory', pc.id)
                                        appendOptions(prev => [...prev, { label: pc.name, value: String(pc.id) }])
                                    }
                                }}
                                asyncOptionsFetcher={(v: string) => {
                                    const subCategory = formInstance?.getFieldValue('subCategory');

                                    const baseFilters = {
                                        category: { $equalTo: category },
                                    };

                                    let filters;

                                    if (v === "focus") {
                                        filters = subCategory
                                            ? { id: { $in: [subCategory, ...Array.from({ length: 9 }, (_, i) => i + 1)] }, ...baseFilters }
                                            : { name: { $iContains: `%` }, ...baseFilters };
                                    } else {
                                        filters = subCategory && !v
                                            ? { id: { $equalTo: subCategory }, ...baseFilters }
                                            : { name: { $iContains: `%${v}%` }, ...baseFilters };
                                    }

                                    const getLabel = (e: ProductSubCategory) => e.name;
                                    const getValue = (e: ProductSubCategory) => String(e.id);

                                    const processBrandsAsOptions: ProcessResultFunction<ProductSubCategory> = (pSubs: ProductSubCategory[]) =>
                                        pSubs.map((pSub) => ({ label: getLabel(pSub), value: getValue(pSub) }));

                                    return fetchEntityRecordsAsOptions<ProductSubCategory>('product-sub-category', filters, 10, processBrandsAsOptions);
                                }}
                            />
                        </ProFormItem>
                    );
                }}
            </ProFormDependency>
        </>
    );
};

export default ProductFormFields;
