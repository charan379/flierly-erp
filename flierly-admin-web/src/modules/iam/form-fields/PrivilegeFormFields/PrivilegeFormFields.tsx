import React from 'react';
import { ProFormDigit, ProFormItem, ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-components';
import { FormInstance } from 'antd';
import useLocale from '@/features/Locale/hooks/useLocale';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import vr from '@/utils/get-validation-regex.util';
import entityExistenceValidator from '@/utils/entity-existence.validator';
import SelectRemoteOptions from '@/features/SelectRemoteOptions';
import fetchEntityOptions from '@/features/SelectRemoteOptions/utils/fetch-entity-options';

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
                label={t('entity.id')}
                hidden={!isEditForm}
                disabled
            />

            {/* name - Input for privilege name */}
            <ProFormText
                name="name"
                label={t('entity.name')}
                hasFeedback
                rules={[
                    { required: true, message: t('entity.nameRequired') },
                    { pattern: vr('name'), message: t('entity.namePattern') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('name').test(value)) return Promise.resolve();
                            return entityExistenceValidator('entity-name-validation', {
                                entity: 'privilege',
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: value,
                                },
                                rejectionMessage: t('entity.nameAlreadyExists'),
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
                options={[
                    { label: t('privilege.access.create'), value: 'create' },
                    { label: t('privilege.access.read'), value: 'read' },
                    { label: t('privilege.access.update'), value: 'update' },
                    { label: t('privilege.access.delete'), value: 'delete' },
                    { label: t('privilege.access.manage'), value: 'manage' },
                ]}
                rules={[{ required: true, message: t('entity.accessRequired') }]}
                disabled={(isEditForm && !hasPermission(pr('privilege.manage'))) || disabledFields?.includes('access')}
            />

            {/* entity - Input for entity */}
            <ProFormItem
                name={'entity'}
                label={t('privilege.entity')}
                rules={[{ required: true, message: t('privilege.entityRequired') }]}
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
                label={t('entity.code')}
                hasFeedback
                rules={[
                    { required: true, message: t('entity.codeRequired') },
                    { pattern: vr('code'), message: t('entity.codePattern') },
                ]}
                disabled={(isEditForm && !hasPermission(pr('privilege.manage'))) || disabledFields?.includes('code')}
            />

            {/* isActive - Switch for active status */}
            <ProFormSwitch
                name="isActive"
                label={t('entity.isActive')}
                hasFeedback
                disabled={(isEditForm && !hasPermission(pr('privilege.manage'))) || disabledFields?.includes('isActive')}
            />
        </>
    );
};

export default PrivilegeFormFields;
