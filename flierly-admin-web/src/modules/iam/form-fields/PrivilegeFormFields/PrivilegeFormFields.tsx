import React from 'react';
import { ProFormDigit, ProFormItem, ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-components';
import { FormInstance } from 'antd';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import vr from '@/modules/core/utils/get-validation-regex.util';
import entityExistenceValidator from '@/modules/core/utils/entity-existence.validator';
import SelectRemoteOptions from '@/modules/core/features/SelectRemoteOptions';
import fetchEntityOptions from '@/modules/core/features/SelectRemoteOptions/utils/fetch-entity-options';
import { accessOptions } from '@/modules/iam/constants/access-type-options.constant';

export interface PrivilegeFormFieldsProps {
    formInstance?: FormInstance<Privilege>;
    isEditForm?: boolean;
    disabledFields?: Array<keyof Privilege>;
}

const PrivilegeFormFields: React.FC<PrivilegeFormFieldsProps> = ({ disabledFields, formInstance: _, isEditForm }) => {
    const { translate: t } = useLocale(); // Translation hook
    const { hasPermission, getPermissionRegex: pr } = useAuth(); // Permission check hook

    return (
        <>
            {/* id - Hidden field for edit form */}
            <ProFormDigit
                name="id"
                label={t('record.id')}
                hidden={!isEditForm}
                disabled
            />

            {/* isActive - Switch for active status */}
            <ProFormSwitch
                name="isActive"
                label={t('record.is_active')}
                hasFeedback
                disabled={(isEditForm && !hasPermission(pr('privilege.manage'))) || disabledFields?.includes('isActive')}
            />

            {/* name - Input for privilege name */}
            <ProFormText
                name="name"
                label={t('record.name')}
                hasFeedback
                rules={[
                    { required: true, message: t('record.name.required') },
                    { pattern: vr("record.name"), message: t('record.name.invalid') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('record.name').test(value)) return Promise.resolve();
                            return entityExistenceValidator('entity-name-validation', {
                                entity: 'privilege',
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: value,
                                },
                                rejectionMessage: t('record.name.already_exists'),
                            });
                        },
                    }),
                ]}
                disabled={(isEditForm && !hasPermission(pr('privilege.update'))) || disabledFields?.includes('name')}
            />

            {/* access - Select for access level */}
            <ProFormSelect
                name="access"
                label={t('privilege.access')}
                hasFeedback
                showSearch
                options={accessOptions.map(option => ({ label: t(option.label), value: option.value }))}
                rules={[{ required: true, message: t('record.access.required') }]}
                disabled={(isEditForm && !hasPermission(pr('privilege.manage'))) || disabledFields?.includes('access')}
            />

            {/* entity - Input for entity */}
            <ProFormItem
                name={'entity'}
                label={t('privilege.entity')}
                rules={[{ required: true, message: t('privilege.entity.required') }]}
            >
                <SelectRemoteOptions<EntityDetails>
                    name={'entity'}
                    debounceTimeout={300}
                    allowClear
                    disabled={(isEditForm && !hasPermission(pr('privilege.manage'))) || disabledFields?.includes('entity')}
                    asyncOptionsFetcher={(v: string) => {
                        return fetchEntityOptions(v === "focus" ? '' : v);
                    }}
                />
            </ProFormItem>

            {/* code - Input for privilege code */}
            <ProFormText
                name="code"
                label={t('record.code')}
                hasFeedback
                rules={[
                    { required: true, message: t('record.code.required') },
                    { pattern: vr('code'), message: t('record.code.invalid') },
                ]}
                disabled={(isEditForm && !hasPermission(pr('privilege.manage'))) || disabledFields?.includes('code')}
            />
        </>
    );
};

export default PrivilegeFormFields;
