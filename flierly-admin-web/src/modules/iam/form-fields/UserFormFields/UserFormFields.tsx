import React from 'react';
import { ProFormDigit, ProFormSwitch, ProFormText } from '@ant-design/pro-components';
import { FormInstance } from 'antd';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import vr from '@/modules/core/utils/get-validation-regex.util';
import entityExistenceValidator from '@/modules/core/utils/entity-existence.validator';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';

export interface UserFormFieldsProps {
    formInstance?: FormInstance<User>;
    isEditForm?: boolean;
    disabledFields?: Array<keyof User>;
}

const UserFormFields: React.FC<UserFormFieldsProps> = ({ disabledFields, formInstance: _, isEditForm }) => {
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

            {/* username - Input for username */}
            <ProFormText
                name="username"
                label={t('user.username')}
                hasFeedback
                rules={[
                    { required: true, message: t('user.usernameRequired') },
                    { pattern: vr('username'), message: t('user.usernamePattern') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('username').test(value)) return Promise.resolve();
                            return entityExistenceValidator('user-username-validation', {
                                entity: 'user',
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    username: value,
                                },
                                rejectionMessage: t('user.usernameAlreadyExists'),
                            });
                        },
                    }),
                ]}
                disabled={(isEditForm && !hasPermission(pr('user.manage'))) || disabledFields?.includes('username')}
            />

            {/* email - Input for email */}
            <ProFormText
                name="email"
                label={t('user.email')}
                hasFeedback
                rules={[
                    { required: true, message: t('user.emailRequired') },
                    { pattern: vr('email'), message: t('user.emialPattern') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value) return Promise.resolve();
                            return entityExistenceValidator('user-email-validation', {
                                entity: 'user',
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    email: value,
                                },
                                rejectionMessage: t('user.emailAlreadyExists'),
                            });
                        },
                    }),
                ]}
                disabled={(isEditForm && !hasPermission(pr('user.manage'))) || disabledFields?.includes('email')}
            />

            {/* mobile - Input for mobile */}
            <ProFormText
                name="mobile"
                label={t('user.mobile')}
                hasFeedback
                rules={[
                    { required: true, message: t('user.mobileRequired') },
                    { pattern: vr('mobile'), message: t('user.mobilePattern') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('mobile').test(value)) return Promise.resolve();
                            return entityExistenceValidator('user-mobile-validation', {
                                entity: 'user',
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    mobile: value,
                                },
                                rejectionMessage: t('user.mobileAlreadyExists'),
                            });
                        },
                    }),
                ]}
                disabled={(isEditForm && !hasPermission(pr('user.manage'))) || disabledFields?.includes('mobile')}
            />

            {/* isActive - Switch for active status */}
            <ProFormSwitch
                name="isActive"
                label={t('entity.isActive')}
                hasFeedback
                disabled={(isEditForm && !hasPermission(pr('user.manage'))) || disabledFields?.includes('isActive')}
            />
        </>
    );
};

export default UserFormFields;
