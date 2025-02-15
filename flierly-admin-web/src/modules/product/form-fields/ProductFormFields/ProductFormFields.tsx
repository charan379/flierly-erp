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
import BrandFormFields from '../BrandFormFields/BrandFormFields';
import UomFormFields from '@/modules/inventory/form-fields/UomFormFields';

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
    const [brandFormInstance] = Form.useForm<Brand>();
    const [baseUomFormInstance] = Form.useForm<UOM>();

    return (
        <>
            {/* id - Hidden field for edit form */}
            <ProFormDigit
                name={'id'}
                label={t('record.id')}
                hidden={!isEditForm}
                disabled={true}
            />

            {/* name - Input for product name */}
            <ProFormText
                name={'name'}
                label={t('record.name')}
                rules={[
                    { required: true, message: t('record.name.required') },
                    { pattern: vr('record.name'), message: t('record.name.invalid') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('record.name').test(value)) return Promise.resolve();
                            return entityExistenceValidator(`record-name-validation`, {
                                entity: "product",
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: { $iContains: value }
                                },
                                rejectionMessage: t('record.name.already_exists')
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
                    { required: true, message: t('product.sku.required') },
                    { pattern: vr('product.sku'), message: t('record.sku.invalid') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('product.sku').test(value)) return Promise.resolve();
                            return entityExistenceValidator(`product-sku-validation`, {
                                entity: "product",
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: { $iContains: value }
                                },
                                rejectionMessage: t('product.sku.already_exists')
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
                    { required: true, message: t('product.hsn.required') },
                    { pattern: vr('product.hsn'), message: t('product.hsn.invalid') },
                ]}
                disabled={isEditForm && !hasPermission(pr('product.manage'))}
            />

            {/* description - Textarea for product description */}
            <ProFormTextArea
                name={'description'}
                label={t('record.description')}
                rules={[
                    { required: true, message: t('record.description.required') },
                    { pattern: vr('record.description'), message: t('record.description.invalid') },
                ]}
                disabled={disabledFields?.includes('description')}
            />

            {/* isActive - Switch for active status */}
            <ProFormSwitch
                name={'isActive'}
                label={t('record.is_active')}
                disabled={(isEditForm && !hasPermission(pr('product.manage'))) || disabledFields?.includes('isActive')}
            />

            {/* isComposite - Switch for composite product status */}
            <ProFormSwitch
                name={'isComposite'}
                label={t('product.is_composite')}
                disabled={(isEditForm && !hasPermission(pr('product.manage'))) || disabledFields?.includes('isComposite')}
            />

            {/* isSerialized - Switch for serialized product status */}
            <ProFormSwitch
                name={'isSerialized'}
                label={t('product.is_serialized')}
                disabled={(isEditForm && !hasPermission(pr('product.manage'))) || disabledFields?.includes('isSerialized')}
            />

            {/* brand - Select input for product brand */}
            <ProFormItem
                name={'brandId'}
                label={t('product.brand')}
                rules={[{ required: true, message: t('product.brand.required') }]}
            >
                <SelectRemoteOptions
                    name={'brandId'}
                    debounceTimeout={300}
                    disabled={(isEditForm && !hasPermission(pr('product.manage'))) || disabledFields?.includes('brand')}
                    optionCreatorConfig={{
                        entity: "brand",
                        formFields: <BrandFormFields />,
                        formInstance: brandFormInstance,
                        permissionCode: pr('brand.create'),
                        onCreateSuccess: (brand, appendOptions) => {
                            formInstance?.setFieldValue('brandId', brand.id)
                            appendOptions(prev => [...prev, { label: brand.name, value: brand.id }])
                        }
                    }}
                    asyncOptionsFetcher={(v: string) => {
                        const brandId = formInstance?.getFieldValue('brandId');
                        let filters;

                        // Filters logic based on input value
                        if (v === "focus") {
                            filters = brandId
                                ? { id: { $in: [brandId, ...Array.from({ length: 9 }, (_, i) => i + 1)] } }
                                : { name: { $iContains: `%` } };
                        } else {
                            filters = brandId && !v
                                ? { id: { $equalTo: brandId } }
                                : { name: { $iContains: `%${v}%` } };
                        }

                        const getLabel = (brand: Brand) => brand.name;
                        const getValue = (brand: Brand) => brand.id;
                        const processBrandsAsOptions: ProcessResultFunction<Brand> = (brands: Brand[]) => brands.map((brand) => ({ label: getLabel(brand), value: getValue(brand) }));
                        return fetchEntityRecordsAsOptions<Brand>('brand', filters, 10, processBrandsAsOptions);
                    }}
                />
            </ProFormItem>

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
                            formInstance?.setFieldValue('categoryId', productCategory.id)
                            appendOptions(prev => [...prev, { label: productCategory.name, value: productCategory.id }])
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

                        const getLabel = (r: ProductCategory) => r.name;
                        const getValue = (r: ProductCategory) => r.id;
                        const processBrandsAsOptions = (categories: ProductCategory[]) => categories.map((category) => ({ label: getLabel(category), value: getValue(category) }));
                        return fetchEntityRecordsAsOptions('product-category', filters, 10, processBrandsAsOptions);
                    }}
                />
            </ProFormItem>

            {/* subCategory - Select input for product subcategory */}
            <ProFormDependency
                name={['categoryId']}
                shouldUpdate={(prevValues, currentValues) => {
                    const update = prevValues?.categoryId !== currentValues?.categoryId;

                    if (update) {
                        formInstance?.setFieldValue('subCategoryId', undefined);
                        productSubCategoryFormInstance.setFieldValue('categoryId', currentValues?.categoryId)
                    }

                    return update;
                }}
            >
                {({ categoryId }) => {
                    return (
                        <ProFormItem
                            name={'subCategoryId'}
                            label={t('product.sub_category')}
                            rules={[{ required: true, message: t('product.sub_category.required') }]}
                        >
                            <SelectRemoteOptions<ProductSubCategory>
                                name={'subCategory'}
                                debounceTimeout={300}
                                disabled={(isEditForm && !hasPermission(pr('product.manage')) || !categoryId) || disabledFields?.includes('subCategory')}  // Disable if no category selected
                                optionCreatorConfig={{
                                    entity: "product-sub-category",
                                    formFields: <ProductSubCategoryFormFields formInstance={productSubCategoryFormInstance} disabledFields={['category']} />,
                                    formInstance: productSubCategoryFormInstance,
                                    formInitialValues: { categoryId },
                                    permissionCode: pr('productSubCategory.create'),
                                    onCreateSuccess: (productSubCategory, appendOptions) => {
                                        formInstance?.setFieldValue('subCategoryId', productSubCategory.id)
                                        appendOptions(prev => [...prev, { label: productSubCategory.name, value: productSubCategory.id }])
                                    }
                                }}
                                asyncOptionsFetcher={(v: string) => {
                                    const subCategoryId = formInstance?.getFieldValue('subCategoryId');

                                    const baseFilters = {
                                        categoryId,
                                    };

                                    let filters;

                                    if (v === "focus") {
                                        filters = subCategoryId
                                            ? { id: { $in: [subCategoryId, ...Array.from({ length: 9 }, (_, i) => i + 1)] }, ...baseFilters }
                                            : { name: { $iContains: `%` }, ...baseFilters };
                                    } else {
                                        filters = subCategoryId && !v
                                            ? { id: subCategoryId, ...baseFilters }
                                            : { name: { $iContains: `%${v}%` }, ...baseFilters };
                                    }

                                    const getLabel = (record: ProductSubCategory) => record.name;
                                    const getValue = (record: ProductSubCategory) => record.id;

                                    const processBrandsAsOptions: ProcessResultFunction<ProductSubCategory> = (productSubCategories: ProductSubCategory[]) =>
                                        productSubCategories.map((productSubCategory) => ({ label: getLabel(productSubCategory), value: getValue(productSubCategory) }));

                                    return fetchEntityRecordsAsOptions<ProductSubCategory>('product-sub-category', filters, 10, processBrandsAsOptions);
                                }}
                            />
                        </ProFormItem>
                    );
                }}
            </ProFormDependency>

            {/* baseUom */}
            {/* brand - Select input for product brand */}
            <ProFormItem
                name={'baseUOMId'}
                label={t('product.base_uom')}
                rules={[{ required: true, message: t('product.baseuom.required') }]}
            >
                <SelectRemoteOptions
                    name={'baseUOMId'}
                    debounceTimeout={300}
                    disabled={(isEditForm && !hasPermission(pr('product.manage'))) || disabledFields?.includes('baseUOM')}
                    optionCreatorConfig={{
                        entity: "uom",
                        formFields: <UomFormFields />,
                        formInstance: baseUomFormInstance,
                        permissionCode: pr('uom.create'),
                        onCreateSuccess: (baseUOM, appendOptions) => {
                            formInstance?.setFieldValue('baseUOMId', baseUOM.id)
                            appendOptions(prev => [...prev, { label: baseUOM.name, value: baseUOM.id }])
                        }
                    }}
                    asyncOptionsFetcher={(v: string) => {
                        const baseUOMId = formInstance?.getFieldValue('baseUOMId');
                        let filters;

                        // Filters logic based on input value
                        if (v === "focus") {
                            filters = baseUOMId
                                ? { id: { $in: [baseUOMId, ...Array.from({ length: 9 }, (_, i) => i + 1)] } }
                                : { name: { $iContains: `%` } };
                        } else {
                            filters = baseUOMId && !v
                                ? { id: { $equalTo: baseUOMId } }
                                : { name: { $iContains: `%${v}%` } };
                        }

                        const getLabel = (r: UOM) => r.name;
                        const getValue = (r: UOM) => r.id;
                        const processBrandsAsOptions: ProcessResultFunction<UOM> = (uom: UOM[]) => uom.map((brand) => ({ label: getLabel(brand), value: getValue(brand) }));
                        return fetchEntityRecordsAsOptions<UOM>('uom', filters, 10, processBrandsAsOptions);
                    }}
                />
            </ProFormItem>
        </>
    );
};

export default ProductFormFields;
