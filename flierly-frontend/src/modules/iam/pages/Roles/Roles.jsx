import React from "react";
import IamLayout from "../../layout/IamLayout";
import { CrudTable } from "@/features/CrudTable";
import roleColumns from "../../config/roleColumns";
import CrudTableContextProvider from "@/features/CrudTable/components/CrudTableContextProvider";
import QueryRole from "../../forms/QueryRole";

export default function Roles() {
  return (
    <IamLayout>
      <CrudTableContextProvider>
        <CrudTable
          entity="role"
          columns={roleColumns}
          dataSource={[]}
          tableKey={"role-table"}
          rowKey="_id"
          searchFormFields={<QueryRole />}
        />
      </CrudTableContextProvider>
    </IamLayout>
  );
}
