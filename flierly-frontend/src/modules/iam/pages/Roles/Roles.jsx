import React from "react";
import IamLayout from "../../layout/IamLayout";
import { CrudTable } from "@/features/CrudTable";
import roleColumns from "../../config/roleColumns";
import CrudTableContextProvider from "@/features/CrudTable/components/CrudTableContextProvider";
import FormFields from "@/components/FormFields";

export default function Roles() {
  return (
    <IamLayout>
      <CrudTableContextProvider>
        <CrudTable
          entity="role"
          columns={roleColumns}
          dataSource={[]}
          tableKey={"role-table"}
          rowKey="id"
          searchFormFields={<FormFields columns={roleColumns} configKey={"queryFormConfig"} />}
          createFormFields={<FormFields columns={roleColumns} configKey={"createFormConfig"} />}
          updateFormFields={<FormFields columns={roleColumns} configKey={"updateFormConfig"} />}
        />
      </CrudTableContextProvider>
    </IamLayout>
  );
}
