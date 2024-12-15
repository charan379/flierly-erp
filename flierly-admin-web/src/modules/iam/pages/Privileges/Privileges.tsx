import CrudTable from "@/features/CrudTable";
import CrudModuleContextProvider from "@/features/CrudModule/context/CrudModuleContextProvider";
import CrudModule from "@/features/CrudModule";
import React from "react";
import privilegeTableColumns from "../../config/privilege/tableColumns";
import privilegeCreateFields from "../../config/privilege/createFormFields";
import privilegeUpdateFields from "../../config/privilege/updateFormFields";
import privilegeQueryFields from "../../config/privilege/queryFormFields";

const Privileges: React.FC = () => {
  return (
    <CrudModule
      header
      title={"privileges"}
      menuKeys={["iam"]}
    >
      <CrudModuleContextProvider>
        <CrudTable<Privilege>
          entity="privilege"
          columns={privilegeTableColumns}
          dataSource={[]}
          tableKey="privilege-table"
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
          createFormFields={privilegeCreateFields}
          updateFormFields={privilegeUpdateFields}
          queryFormFields={privilegeQueryFields}
        />
      </CrudModuleContextProvider>
    </CrudModule>
  );
};

export default Privileges;
