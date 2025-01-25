import PageLoader from '@/modules/core/components/PageLoader';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import { Form } from 'antd';
import createTagMetadataTableColumns from '../../config/tag-metadata/create-tag-metadata-tablecolumns';
import TagMetadataFormFields from '../../form-fields/TagMetadataFormFields';
import { CrudTableProps } from '@/modules/core/features/CrudTable/CrudTable';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';
import CrudModule from '@/modules/core/features/CrudModule';

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<TagMetadata>>> = React.lazy(() => import('@/modules/core/features/CrudTable'));

const TagsMetadata: React.FC = () => {
    const { translate: t } = useLocale();
    const [addFormInstance] = Form.useForm<TagMetadata>();
    const [editFormInstance] = Form.useForm<TagMetadata>();

    return (
        <CrudModule header title={'tags-metadata'} menuKeys={['product']}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    entity="tag-metadata"
                    columns={createTagMetadataTableColumns(t)}
                    dataSource={[]}
                    tableKey="brand-table"
                    rowKey="id"
                    loadRelations={[]}
                    render={{
                        activate: true,
                        bin: true,
                        clear: true,
                        create: true,
                        delete: true,
                        menu: true,
                        restore: true,
                        search: true,
                        update: true,
                        view: true,
                        builtIn: {
                            options: {
                                density: true,
                                fullScreen: true,
                                reload: true,
                                search: false,
                                setting: true,
                            },
                        },
                    }}
                    addFormProps={{
                        formFields: <TagMetadataFormFields formInstance={addFormInstance} />,
                        formInstance: addFormInstance,
                        title: t('entity.add')
                    }}
                    editFormProps={{
                        formFields: <TagMetadataFormFields formInstance={editFormInstance} isEditForm />,
                        formInstance: editFormInstance,
                        title: t("entity.update"),
                    }}
                />
            </Suspense>
        </CrudModule>
    )
}

export default TagsMetadata;