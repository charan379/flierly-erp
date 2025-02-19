import PageLoader from "@/modules/core/components/PageLoader";
import CrudModule from "@/modules/core/features/CrudModule";
import { CrudTableProps } from "@/modules/core/features/CrudTable/CrudTable";
import useLocale from "@/modules/core/features/Locale/hooks/useLocale";
import { Form } from "antd";
import React, { ComponentType, LazyExoticComponent, Suspense } from "react";
import createInventoryTableColumns from "../../config/inventory/create-inventory-tablecolumns";
import InventoryFormFields from "../../form-fields/InventoryFormFields";

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Inventory>>> = React.lazy(() => import("@/modules/core/features/CrudTable"));

const InventoriesPage: React.FC = () => {
    const { translate: t } = useLocale();
    const [addFormInstance] = Form.useForm<Inventory>();
    const [editFormInstace] = Form.useForm<Inventory>();

    return (
        <CrudModule header title={t('inventories')}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    tableKey="inventory-table"
                    rowKey="id"
                    entity="inventory"
                    columns={createInventoryTableColumns(t)}
                    filterRowsWithBranchId
                    dataSource={[]}
                    loadRelations={["branch"]}
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
                        formFields: <InventoryFormFields formInstance={addFormInstance} />,
                        formInstance: addFormInstance,
                        title: t('record.add'),
                    }}
                    editFormProps={{
                        formFields: <InventoryFormFields formInstance={editFormInstace} isEditForm />,
                        formInstance: editFormInstace,
                        title: t("record.update"),
                    }}
                />
            </Suspense>
        </CrudModule>
    )
};

export default InventoriesPage;