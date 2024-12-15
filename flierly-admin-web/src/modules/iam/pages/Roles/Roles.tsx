import CrudTable from "@/features/CrudTable";
import CrudModule from "@/features/CrudModule";
import React from "react";
import roleTableColumns from "../../config/role/tableColumns";

const Roles: React.FC = () => {
    return (
        <CrudModule header
            title={"roles"}
            menuKeys={["iam"]}
        >
            <CrudTable<Role>
                entity="role"
                columns={roleTableColumns}
                dataSource={[]}
                tableKey="role-table"
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
            />
        </CrudModule>
    );
};

export default Roles;
