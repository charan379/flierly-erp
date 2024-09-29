import React from "react";
import IamLayout from "../../layout/IamLayout";
import { CrudTable } from "@/features/CrudTable";
import userColumns from "../../config/userColumns";
import CrudTableContextProvider from "@/features/CrudTable/components/CrudTableContextProvider";
import FormFields from "@/components/FormFields";

export default function Users() {
  return (
    <IamLayout>
      <CrudTableContextProvider>
        <CrudTable
          entity="user"
          columns={userColumns}
          dataSource={[]}
          tableKey={"user-table"}
          rowKey="id"
          searchFormFields={<FormFields columns={userColumns} configKey={"queryFormConfig"} />}
          createFormFields={<FormFields columns={userColumns} configKey={"createFormConfig"} />}
          updateFormFields={<FormFields columns={userColumns} configKey={"updateFormConfig"} />}
        />
      </CrudTableContextProvider>
    </IamLayout>
  );
}
