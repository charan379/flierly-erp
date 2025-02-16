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
                label={t('record.id')}
                hidden={!isEditForm}
                disabled
            />

            {/* entity - Input for entity */}
            <ProFormItem
                name={'entity'}
                label={t('tagMetadata.entity')}
                rules={[{ required: true, message: t('tagMetadata.entity.required') }]}
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
                label={t('record.name')}
                hasFeedback
                rules={[
                    { required: true, message: t('record.name.required') },
                    { pattern: vr('record.name'), message: t('record.name.invalid') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || !vr('record.name').test(value)) return Promise.resolve();
                            return entityExistenceValidator('record-name-validation', {
                                entity: 'tag-metadata',
                                filters: {
                                    ...(isEditForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                                    name: value,
                                },
                                rejectionMessage: t('record.name.already_exists'),
                            });
                        },
                    }),
                ]}
                disabled={(isEditForm && !hasPermission(pr('tagMetadata.update'))) || disabledFields?.includes('name')}
            />

            {/* datatype - Select for datatype */}
            <ProFormSelect
                name="datatype"
                showSearch
                label={t('tagMetadata.datatype')}
                options={[
                    { label: t('open.datatype.string'), value: 'string' },
                    { label: t('open.datatype.number'), value: 'number' },
                    { label: t('open.datatype.boolean'), value: 'boolean' },
                    { label: t('open.datatype.enum'), value: 'enum' },
                ]}
                rules={[{ required: true, message: t('tagMetadata.datatype.required') }]}
                disabled={(isEditForm && !hasPermission(pr('tagMetadata.update'))) || disabledFields?.includes('datatype')}
            />

            {/* options - Textarea for ENUM options */}
            <ProFormTextArea
                name="options"
                label={t('tagMetadata.options')}
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            const datatype = getFieldValue('datatype');
                            if (datatype === 'enum' && (!value || value.length === 0)) {
                                return Promise.reject(new Error(t('record.options.required_for_enum')));
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
                label={t('record.description')}
                rules={[
                    { pattern: vr('record.description'), message: t('record.description.invalid') },
                ]}
                disabled={(isEditForm && !hasPermission(pr('tagMetadata.update'))) || disabledFields?.includes('description')}
            />
        </>
    );
};

export default TagMetadataFormFields;
