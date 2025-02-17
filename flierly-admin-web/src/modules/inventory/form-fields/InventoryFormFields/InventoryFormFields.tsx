import { useAuth } from "@/modules/auth/hooks/useAuth";
import useLocale from "@/modules/core/features/Locale/hooks/useLocale";
import vr from '@/modules/core/utils/get-validation-regex.util';
import entityExistenceValidator from '@/modules/core/utils/entity-existence.validator';
import { ProFormDigit, ProFormItem, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Form, FormInstance } from "antd";
import React from "react";
import { inventoryTypeOptions } from "../../constants/inventory-type-options.constant";
import SelectRemoteOptions from "@/modules/core/features/SelectRemoteOptions";
import BranchFormFields from "@/modules/organization/form-fields/BranchFormFields";
import fetchEntityRecordsAsOptions, { ProcessResultFunction } from "@/modules/core/features/SelectRemoteOptions/utils/fetch-entity-rows-as-options";

export interface InventoryFormFieldsProps {
    formInstance?: FormInstance<Inventory>;
    isEditForm?: boolean;
    disabledFields?: Array<keyof Inventory>;
};

const InventoryFormFields: React.FC<InventoryFormFieldsProps> = ({ disabledFields, formInstance, isEditForm }) => {

    const { translate: t } = useLocale();  // Hook to get translation functions
    const { hasPermission, getPermissionRegex: pr } = useAuth(); // Hook to check permissions 
    const [branchFormInstance] = Form.useForm<Branch>();

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


            {/* branch - Select input for inventory branch */}
            <ProFormItem
                name={'branchId'}
                label={t('inventory.branch')}
                rules={[{ required: true, message: t('inventory.branch.required') }]}
            >
                <SelectRemoteOptions
                    name={'branchId'}
                    debounceTimeout={300}
                    disabled={(isEditForm && !hasPermission(pr('inventory.manage'))) || disabledFields?.includes('branch')}
                    optionCreatorConfig={{
                        entity: "branch",
                        formFields: <BranchFormFields />,
                        formInstance: branchFormInstance,
                        permissionCode: pr('branch.create'),
                        onCreateSuccess: (branch, appendOptions) => {
                            formInstance?.setFieldValue('branchId', branch.id)
                            appendOptions(prev => [...prev, { label: branch.name, value: branch.id }])
                        }
                    }}
                    asyncOptionsFetcher={(v: string) => {
                        const branchId = formInstance?.getFieldValue('branchId');
                        let filters;

                        // Filters logic based on input value
                        if (v === "focus") {
                            filters = branchId
                                ? { id: { $in: [branchId, ...Array.from({ length: 9 }, (_, i) => i + 1)] } }
                                : { name: { $iContains: `%` } };
                        } else {
                            filters = branchId && !v
                                ? { id: { $equalTo: branchId } }
                                : { name: { $iContains: `%${v}%` } };
                        }

                        const getLabel = (branch: Branch) => branch.name;
                        const getValue = (branch: Branch) => branch.id;
                        const processBranchesAsOptions: ProcessResultFunction<Branch> = (branchs: Branch[]) => branchs.map((branch) => ({ label: getLabel(branch), value: getValue(branch) }));
                        return fetchEntityRecordsAsOptions<Branch>('branch', filters, 10, processBranchesAsOptions);
                    }}
                />
            </ProFormItem>

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