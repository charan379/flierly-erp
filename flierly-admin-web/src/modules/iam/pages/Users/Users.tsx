import CrudModule from "@/features/CrudModule";
import React, { ComponentType, LazyExoticComponent, Suspense } from "react";
import PageLoader from "@/components/PageLoader";
import { CrudTableProps } from "@/features/CrudTable/CrudTable";
import userCreateFields from "../../config/user/createFormFields";
import userUpdateFields from "../../config/user/updateFormFields";
import userQueryFields from "../../config/user/queryFormFields";
import userTableColumns from "../../config/user/tableColumns";

// Lazy load CrudTable
const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<User>>> = React.lazy(() => import("@/features/CrudTable"));

const Users: React.FC = () => {
    return (
        <CrudModule header
            title={"users"}
            menuKeys={["iam"]}
        >
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    entity="user"
                    columns={userTableColumns}
                    dataSource={[]}
                    tableKey="user-table"
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
                                setting: true
                            }
                        }
                    }}
                    createFormFields={userCreateFields}
                    updateFormFields={userUpdateFields}
                    queryFormFields={userQueryFields}
                />
            </Suspense>
        </CrudModule>
    );
};

export default Users;
