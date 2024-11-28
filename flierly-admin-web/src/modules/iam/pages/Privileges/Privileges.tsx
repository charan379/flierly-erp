import CrudTable from "@/features/CrudTable";
import CrudTableContextProvider from "@/features/CrudTable/context/CrudTableContextProvider";
import DefaultModuleLayout from "@/layout/DefaultModuleLayout";
import React from "react";
import FormFields from "@/components/FormFields/FormFields";
import privilegeTableColumns from "../../config/tableColumns";
import privilegeCreateFields from "../../config/createFormFields";
import privilegeUpdateFields from "../../config/updateFormFields";


const Privileges: React.FC = () => {
  return (
    <DefaultModuleLayout>
      <CrudTableContextProvider>
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
                search: true,
                setting: true
              }
            }
          }}
          createFormFields={privilegeCreateFields}
          updateFormFields={privilegeUpdateFields}
          searchFormFields={<FormFields columns={privilegeTableColumns} configKey="queryFormConfig" key="Privilege-Search-Form" />}
        />
      </CrudTableContextProvider>
    </DefaultModuleLayout>
  );
};

export default Privileges;
