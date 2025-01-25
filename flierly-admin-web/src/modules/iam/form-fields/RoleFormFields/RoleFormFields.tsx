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
                label={t('entity.id')}
                hidden={!isEditForm}
                disabled
            />

            {/* name - Input for role name */}
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
                                entity: 'role',
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: value,
                                },
                                rejectionMessage: t('entity.nameAlreadyExists'),
                            });
                        },
                    }),
                ]}
                disabled={(isEditForm && !hasPermission(pr('role.update'))) || disabledFields?.includes('name')}
            />

            {/* code - Input for role code */}
            <ProFormText
                name="code"
                label={t('entity.code')}
                hasFeedback
                rules={[
                    { required: true, message: t('entity.codeRequired') },
                    { pattern: vr('code'), message: t('entity.codePattern') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('code').test(value)) return Promise.resolve();
                            return entityExistenceValidator('entity-code-validation', {
                                entity: 'role',
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    code: value,
                                },
                                rejectionMessage: t('entity.codeAlreadyExists'),
                            });
                        },
                    }),
                ]}
                disabled={(isEditForm && !hasPermission(pr('role.manage'))) || disabledFields?.includes('code')}
            />

            {/* description - Textarea for description */}
            <ProFormTextArea
                name="description"
                label={t('entity.description')}
                rules={[
                    { required: true, message: t('entity.descriptionRequired') },
                    { pattern: vr('description'), message: t('entity.descriptionPattern') },
                ]}
                disabled={(isEditForm && !hasPermission(pr('role.update'))) || disabledFields?.includes('description')}
            />

            {/* isActive - Switch for active status */}
            <ProFormSwitch
                name="isActive"
                label={t('entity.isActive')}
                hasFeedback
                disabled={(isEditForm && !hasPermission(pr('role.manage'))) || disabledFields?.includes('isActive')}
            />
        </>
    );
};

export default RoleFormFields;
