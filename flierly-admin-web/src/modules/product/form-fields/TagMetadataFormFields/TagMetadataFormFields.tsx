import React from 'react';
import { ProFormDigit, ProFormItem, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { FormInstance } from 'antd';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import vr from '@/modules/core/utils/get-validation-regex.util';
import entityExistenceValidator from '@/modules/core/utils/entity-existence.validator';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';
import SelectRemoteOptions from '@/modules/core/features/SelectRemoteOptions';
import fetchEntityOptions from '@/modules/core/features/SelectRemoteOptions/utils/fetch-entity-options';

export interface TagMetadataFormFieldsProps {
    formInstance?: FormInstance<TagMetadata>;
    isEditForm?: boolean;
    disabledFields?: Array<keyof TagMetadata>;
}

const TagMetadataFormFields: React.FC<TagMetadataFormFieldsProps> = ({ disabledFields, formInstance: _, isEditForm }) => {
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

            {/* entity - Input for entity */}
            <ProFormItem
                name={'entity'}
                label={t('tagMetadata.entity')}
                rules={[{ required: true, message: t('tagMetadata.entityRequired') }]}
            >
                <SelectRemoteOptions<EntityDetails>
                    name={'entity'}
                    debounceTimeout={300}
                    allowClear
                    disabled={(isEditForm && !hasPermission(pr('tagMetadata.manage'))) || disabledFields?.includes('entity')}
                    asyncOptionsFetcher={(v: string) => {
                        return fetchEntityOptions(v === "focus" ? '' : v);
                    }}
                />
            </ProFormItem>

            {/* name - Input for name */}
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
                                entity: 'tag-metadata',
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: value,
                                },
                                rejectionMessage: t('entity.nameAlreadyExists'),
                            });
                        },
                    }),
                ]}
                disabled={(isEditForm && !hasPermission(pr('tagMetadata.update'))) || disabledFields?.includes('name')}
            />

            {/* datatype - Select for datatype */}
            <ProFormSelect
                name="datatype"
                label={t('entity.datatype')}
                options={[
                    { label: t('datatype.string'), value: 'string' },
                    { label: t('datatype.number'), value: 'number' },
                    { label: t('datatype.boolean'), value: 'boolean' },
                    { label: t('datatype.enum'), value: 'enum' },
                ]}
                rules={[{ required: true, message: t('entity.datatypeRequired') }]}
                disabled={(isEditForm && !hasPermission(pr('tagMetadata.update'))) || disabledFields?.includes('datatype')}
            />

            {/* options - Textarea for ENUM options */}
            <ProFormTextArea
                name="options"
                label={t('entity.options')}
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            const datatype = getFieldValue('datatype');
                            if (datatype === 'enum' && (!value || value.length === 0)) {
                                return Promise.reject(new Error(t('entity.optionsRequiredForEnum')));
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
                disabled={(isEditForm && !hasPermission(pr('tagMetadata.update'))) || disabledFields?.includes('options')}
            />

            {/* description - Textarea for description */}
            <ProFormTextArea
                name="description"
                label={t('entity.description')}
                rules={[
                    { pattern: vr('description'), message: t('entity.descriptionPattern') },
                ]}
                disabled={(isEditForm && !hasPermission(pr('tagMetadata.update'))) || disabledFields?.includes('description')}
            />
        </>
    );
};

export default TagMetadataFormFields;
