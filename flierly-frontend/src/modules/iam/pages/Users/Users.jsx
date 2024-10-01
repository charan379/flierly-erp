import React from "react";
import IamLayout from "../../layout/IamLayout";
import { CrudTable } from "@/features/CrudTable";
import userColumns from "../../config/userColumns";
import CrudTableContextProvider from "@/features/CrudTable/components/CrudTableContextProvider";
import FormFields from "@/components/FormFields";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import hasOwnProperty from "@/utils/hasOwnProperty";

export default function Users() {
  const { hasPermission } = useAuth();

  const columns = userColumns.filter((column) => {
    if (hasOwnProperty(column, "permission")) {
      return hasPermission(column.permission);
    } else {
      return true;
    }
  });

  return (
    <IamLayout>
      <CrudTableContextProvider>
        <CrudTable
          entity="user"
          columns={columns}
          dataSource={[]}
          tableKey={"user-table"}
          rowKey="id"
          rowSelectionColumnWidth="30px"
          searchFormFields={<FormFields columns={userColumns} configKey={"queryFormConfig"} />}
          createFormFields={<FormFields columns={userColumns} configKey={"createFormConfig"} />}
          updateFormFields={<FormFields columns={userColumns} configKey={"updateFormConfig"} />}
        />
      </CrudTableContextProvider>
    </IamLayout>
  );
}
