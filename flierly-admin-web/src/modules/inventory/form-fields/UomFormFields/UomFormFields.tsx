import { useAuth } from "@/modules/auth/hooks/useAuth";
import useLocale from "@/modules/core/features/Locale/hooks/useLocale";
import vr from '@/modules/core/utils/get-validation-regex.util';
import entityExistenceValidator from '@/modules/core/utils/entity-existence.validator';
import { ProFormDigit, ProFormText } from "@ant-design/pro-components";
import { FormInstance } from "antd";
import React from "react";

export interface UomFormFieldsProps {
    formInstance?: FormInstance<UOM>;
    isEditForm?: boolean;
    disabledFields?: Array<keyof UOM>;
};

const UomFormFields: React.FC<UomFormFieldsProps> = ({ disabledFields, formInstance: _, isEditForm }) => {

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
                            if (!value || !vr('name').test(value)) return Promise.resolve();
                            return entityExistenceValidator(`record-name-validation`, {
                                entity: "uom",
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: { "$iContains": value }
                                },
                                rejectionMessage: t('record.name.alreadyExists')
                            });
                        },
                    })
                ]}
                disabled={(isEditForm && !hasPermission(pr('uom.update'))) || disabledFields?.includes('name')}
            />

            {/* short name - required field */}
            <ProFormText
                name={'shortName'}
                label={t('uom.shortName')}
                hasFeedback
                rules={[
                    { required: true, message: t('uom.shortName.required') },
                    { pattern: vr('uom.shortName'), message: t('uom.shortName.pattern') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('shortName').test(value)) return Promise.resolve();
                            return entityExistenceValidator(`record-shortName-validation`, {
                                entity: "uom",
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    shortName: { "$iContains": value }
                                },
                                rejectionMessage: t('record.name.alreadyExists')
                            });
                        },
                    })
                ]}
                disabled={(isEditForm && !hasPermission(pr('uom.update'))) || disabledFields?.includes('name')}
            />
        </>
    )
};

export default UomFormFields;