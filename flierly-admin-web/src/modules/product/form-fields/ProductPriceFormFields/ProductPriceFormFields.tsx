import useLocale from '@/modules/core/features/Locale/hooks/useLocale';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { ProFormDatePicker, ProFormDigit, ProFormItem, ProFormSelect, } from '@ant-design/pro-components';
import { Form, FormInstance } from 'antd';
import React from 'react';
import SelectRemoteOptions from '@/modules/core/features/SelectRemoteOptions';
import fetchEntityRecordsAsOptions, { ProcessResultFunction } from '@/modules/core/features/SelectRemoteOptions/utils/fetch-entity-rows-as-options';
import { productPriceTypeOptions } from '../../constants/product-price-type-options.constant';

export interface ProductPriceFormFieldsProps {
    formInstance?: FormInstance<ProductPrice>;
    isEditForm?: boolean;
    disabledFields?: Array<keyof ProductPrice>;
}

const ProductPriceFormFields: React.FC<ProductPriceFormFieldsProps> = ({ formInstance, isEditForm, disabledFields }) => {
    const { translate: t } = useLocale();  // Hook to get translation functions
    const { hasPermission, getPermissionRegex: pr } = useAuth(); // Hook to check permissions
    const [productFormInstance] = Form.useForm<Product>();

    return (
        <>
            {/* id - Hidden field for edit form */}
            <ProFormDigit
                name={'id'}
                label={t('record.id')}
                hidden={!isEditForm}
                disabled={true}
            />

            {/* product - Select input for product */}
            <ProFormItem
                name={'productId'}
                label={t('product_price.product')}
                rules={[{ required: true, message: t('product_price.product.required') }]}
            >
                <SelectRemoteOptions<Product>
                    name={'productId'}
                    debounceTimeout={300}
                    allowClear
                    disabled={(isEditForm && !hasPermission(pr('productPrice.manage'))) || disabledFields?.includes('product')}
                    optionCreatorConfig={{
                        entity: "product",
                        formFields: <ProductPriceFormFields />,
                        formInstance: productFormInstance,
                        permissionCode: pr('product.create'),
                        onCreateSuccess: (product, appendOptions) => {
                            formInstance?.setFieldValue('productId', product.id)
                            appendOptions(prev => [...prev, { label: product.name, value: product.id }])
                        }
                    }}
                    asyncOptionsFetcher={(v: string) => {
                        const productId = formInstance?.getFieldValue('productId');
                        let filters;

                        // Filters logic based on input value
                        if (v === "focus") {
                            filters = productId
                                ? { id: { $in: [productId, ...Array.from({ length: 9 }, (_, i) => i + 1)] } }
                                : { name: { $iContains: `%` } };
                        } else {
                            filters = productId && !v
                                ? { id: { $equalTo: productId } }
                                : { name: { $iContains: `%${v}%` } };
                        }

                        const getLabel = (r: Product) => r.name;
                        const getValue = (r: Product) => r.id;
                        const processBrandsAsOptions: ProcessResultFunction<Product> = (products: Product[]) => products.map((product) => ({ label: getLabel(product), value: getValue(product) }));
                        return fetchEntityRecordsAsOptions('product', filters, 10, processBrandsAsOptions);
                    }}
                />
            </ProFormItem>

            {/* product price type */}
            <ProFormSelect
                name="type"
                label={t('product_price.type')}
                hasFeedback
                showSearch
                options={productPriceTypeOptions.map(option => ({ label: t(option.label), value: option.value }))}
                rules={[{ required: true, message: t('product_price.type.required') }]}
                disabled={(isEditForm && !hasPermission(pr('productPrice.manage'))) || disabledFields?.includes('type')}
            />

            {/* price - Input for price */}
            <ProFormDigit
                name={'price'}
                label={t('product_price.price')}
                rules={[{ required: true, message: t('product_price.price.required') }]}
                fieldProps={{
                    precision: 2,
                    step: 0.01,
                    min: 0,
                    max: 9999999.99
                }}
                disabled={(isEditForm && !hasPermission(pr('productPrice.manage'))) || disabledFields?.includes('price')} />

            {/* effectiveDate */}
            <ProFormDatePicker
                name={"effectiveDate"}
                label={t('product_price.effective_date')}
                disabled={(isEditForm && !hasPermission(pr('productPrice.manage'))) || disabledFields?.includes('effectiveDate')}
            />
        </>
    );
};

export default ProductPriceFormFields;
