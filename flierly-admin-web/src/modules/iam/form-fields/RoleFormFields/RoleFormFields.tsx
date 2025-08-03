import React from 'react';
import { ProFormDigit, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { FormInstance } from 'antd';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import vr from '@/modules/core/utils/get-validation-regex.util';
import entityExistenceValidator from '@/modules/core/utils/entity-existence.validator';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';

export interface RoleFormFieldsProps {
    formInstance?: FormInstance<Role>;
    isEditForm?: boolean;
    disabledFields?: Array<keyof Role>;
}

const RoleFormFields: React.FC<RoleFormFieldsProps> = ({ disabledFields, formInstance: _, isEditForm }) => {
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
                disabled={(isEditForm && !hasPermission(pr('role.manage'))) || disabledFields?.includes('isActive')}
            />

            {/* name - Input for role name */}
            <ProFormText
                name="name"
                label={t('record.name')}
                hasFeedback
                rules={[
                    { required: true, message: t('record.name.required') },
                    { pattern: vr('record.name'), message: t('record.name.invalid') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('record.name').test(value)) return Promise.resolve();
                            return entityExistenceValidator('record-name-validation', {
                                entity: 'role',
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: value,
                                },
                                rejectionMessage: t('record.name.already_exists'),
                            });
                        },
                    }),
                ]}
                disabled={(isEditForm && !hasPermission(pr('role.update'))) || disabledFields?.includes('name')}
            />

            {/* code - Input for role code */}
            <ProFormText
                name="code"
                label={t('record.code')}
                hasFeedback
                rules={[
                    { required: true, message: t('record.code.required') },
                    { pattern: vr('code'), message: t('record.code.invalid') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('code').test(value)) return Promise.resolve();
                            return entityExistenceValidator('entity-code-validation', {
                                entity: 'role',
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    code: value,
                                },
                                rejectionMessage: t('record.code.already_exists'),
                            });
                        },
                    }),
                ]}
                disabled={(isEditForm && !hasPermission(pr('role.manage'))) || disabledFields?.includes('code')}
            />

            {/* description - Textarea for description */}
            <ProFormTextArea
                name="description"
                label={t('record.description')}
                rules={[
                    { required: true, message: t('record.description.required') },
                    { pattern: vr('record.description'), message: t('record.description.invalid') },
                ]}
                disabled={(isEditForm && !hasPermission(pr('role.update'))) || disabledFields?.includes('description')}
            />
        </>
    );
};

export default RoleFormFields;
