import PageLoader from '@/components/PageLoader';
import CrudModule from '@/features/CrudModule';
import { CrudTableProps } from '@/features/CrudTable/CrudTable';
import useLocale from '@/features/Locale/hooks/useLocale';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createBrandTableColumns from '../../config/brand/create-brand-table-columns';
import brandCreateFormFields from '../../config/brand/brand-create-form-fields';
import brandUpdateFormFields from '../../config/brand/brand-update-form-fields';
import createBrandQueryFields from '../../config/brand/create-brand-queryfields';

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Brand>>> = React.lazy(() => import('@/features/CrudTable'))

const Brands: React.FC = () => {
    const { translate } = useLocale();

    return (
        <CrudModule header title={'brands'} menuKeys={['product']}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    entity="brand"
                    columns={createBrandTableColumns(translate)}
                    dataSource={[]}
                    tableKey="brand-table"
                    rowKey="id"
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
                    createFormFields={brandCreateFormFields}
                    updateFormFields={brandUpdateFormFields}
                    queryFormFields={createBrandQueryFields(translate)}
                />
            </Suspense>
        </CrudModule>
    )
}

export default Brands;