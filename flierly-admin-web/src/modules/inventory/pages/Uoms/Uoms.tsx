import PageLoader from "@/modules/core/components/PageLoader";
import CrudModule from "@/modules/core/features/CrudModule";
import { CrudTableProps } from "@/modules/core/features/CrudTable/CrudTable";
import useLocale from "@/modules/core/features/Locale/hooks/useLocale";
import { Form } from "antd";
import React, { ComponentType, LazyExoticComponent, Suspense } from "react";
import UomFormFields from "../../form-fields/UomFormFields";
import createUomTableColumns from "../../config/uom/create-uom-tablecolumns";

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<UOM>>> = React.lazy(() => import("@/modules/core/features/CrudTable"));

const Uoms: React.FC = () => {
    const { translate: t } = useLocale();
    const [addFormInstance] = Form.useForm<UOM>();
    const [editFormInstace] = Form.useForm<UOM>();

    return (
        <CrudModule header title={t('uoms')}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    tableKey="uom-table"
                    rowKey="id"
                    entity="uom"
                    columns={createUomTableColumns(t)}
                    dataSource={[]}
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
                        formFields: <UomFormFields formInstance={addFormInstance} />,
                        formInstance: addFormInstance,
                        title: t('record.add'),
                    }}
                    editFormProps={{
                        formFields: <UomFormFields formInstance={editFormInstace} isEditForm />,
                        formInstance: editFormInstace,
                        title: t("record.update"),
                    }}
                />
            </Suspense>
        </CrudModule>
    )
};

export default Uoms;