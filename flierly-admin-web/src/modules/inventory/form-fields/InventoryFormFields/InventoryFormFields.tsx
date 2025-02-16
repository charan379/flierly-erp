import { useAuth } from "@/modules/auth/hooks/useAuth";
import useLocale from "@/modules/core/features/Locale/hooks/useLocale";
import vr from '@/modules/core/utils/get-validation-regex.util';
import entityExistenceValidator from '@/modules/core/utils/entity-existence.validator';
import { ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { FormInstance } from "antd";
import React from "react";
import { inventoryTypeOptions } from "../../constants/inventory-type-oprions.constant";

export interface InventoryFormFieldsProps {
    formInstance?: FormInstance<Inventory>;
    isEditForm?: boolean;
    disabledFields?: Array<keyof Inventory>;
};

const InventoryFormFields: React.FC<InventoryFormFieldsProps> = ({ disabledFields, formInstance: _, isEditForm }) => {

    const { translate: t } = useLocale();  // Hook to get translation functions
    const { hasPermission, getPermissionRegex: pr } = useAuth(); // Hook to check permissions 

    return (
        <>
            {/* id - hidden field for edit form */}
            <ProFormDigit
                name={'id'}
                label={t('record.id')}
                hidden={!isEditForm}
                disabled={true}
            />

            {/* name - required field */}
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
                                entity: "inventory",
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: { "$iContains": value }
                                },
                                rejectionMessage: t('record.name.already_exists')
                            });
                        },
                    })
                ]}
                disabled={(isEditForm && !hasPermission(pr('inventory.update'))) || disabledFields?.includes('name')}
            />

            {/* inventory type */}
            <ProFormSelect
                name="inventoryType"
                label={t('inventory.type')}
                hasFeedback
                showSearch
                options={inventoryTypeOptions.map(option => ({ label: t(option.label), value: option.value }))}
                rules={[{ required: true, message: t('inventory.type.required') }]}
                disabled={(isEditForm && !hasPermission(pr('inventory.manage'))) || disabledFields?.includes('inventoryType')}
            />

            {/* remarks - Textarea for inventory remarks */}
            <ProFormTextArea
                name={'remarks'}
                label={t('record.remarks')}
                rules={[
                    { required: true, message: t('record.remarks.required') },
                    { pattern: vr('record.remarks'), message: t('record.remarks.invalid') },
                ]}
                disabled={disabledFields?.includes('remarks')}
            />
        </>
    )
};

export default InventoryFormFields;