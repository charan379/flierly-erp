import React from "react";
import IamLayout from "../../layout/IamLayout";
import { CrudTable } from "@/features/CrudTable";
import privilegeColumns from "../../config/privilegeColumns";
import QueryPrivilege from "../../forms/QueryPrivilege";
import CrudTableContextProvider from "@/features/CrudTable/components/CrudTableContextProvider";
import FormFields from "@/components/FormFields";

export default function Privileges() {
  return (
    <IamLayout>
      <CrudTableContextProvider>
        <CrudTable
          entity="privilege"
          columns={privilegeColumns}
          dataSource={[]}
          tableKey={"privilege-table"}
          rowKey="id"
          searchFormFields={<FormFields columns={privilegeColumns} configKey={"queryFormConfig"} />}
          createFormFields={<FormFields columns={privilegeColumns} configKey={"createFormConfig"} />}
          updateFormFields={<FormFields columns={privilegeColumns} configKey={"updateFormConfig"} />}
        />
      </CrudTableContextProvider>
    </IamLayout>
  );
}
