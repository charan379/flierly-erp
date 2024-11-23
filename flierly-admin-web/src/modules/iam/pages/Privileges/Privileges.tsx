import CrudTable from "@/features/CrudTable";
import CrudTableContextProvider from "@/features/CrudTable/context/CrudTableContextProvider";
import DefaultModuleLayout from "@/layout/DefaultModuleLayout";
import React from "react";
import privilegeColumns from "../../config/privilegeColumns";
import FormFields from "@/components/FormFields/FormFields";


const Privileges: React.FC = () => {
  return (
    <DefaultModuleLayout>
      <CrudTableContextProvider>
        <CrudTable<Privilege>
          entity="privilege"
          columns={privilegeColumns}
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
          createFormFields={<FormFields columns={privilegeColumns} configKey="createFormConfig" key="Privilege-Create-Form"/>}
          updateFormFields={<FormFields columns={privilegeColumns} configKey="updateFormConfig" key="Privilege-Update-Form"/>}
        />
      </CrudTableContextProvider>
    </DefaultModuleLayout>
  );
};

export default Privileges;
