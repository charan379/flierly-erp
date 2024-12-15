import CrudTable from "@/features/CrudTable";
import CrudTableContextProvider from "@/features/CrudTable/context/CrudTableContextProvider";
import DefaultModuleLayout from "@/layout/DefaultModuleLayout";
import React from "react";
import privilegeTableColumns from "../../config/privilege/tableColumns";
import privilegeCreateFields from "../../config/privilege/createFormFields";
import privilegeUpdateFields from "../../config/privilege/updateFormFields";
import privilegeQueryFields from "../../config/privilege/queryFormFields";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Privileges: React.FC = () => {
  return (
    <DefaultModuleLayout
      header
      title={"privileges"}
      extra={[
        <UserOutlined />,
        <Button>Test</Button>
      ]}
    >
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
                search: false,
                setting: true
              }
            }
          }}
          createFormFields={privilegeCreateFields}
          updateFormFields={privilegeUpdateFields}
          queryFormFields={privilegeQueryFields}
        />
      </CrudTableContextProvider>
    </DefaultModuleLayout>
  );
};

export default Privileges;
