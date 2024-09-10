import React from "react";
import IamLayout from "../../layout/IamLayout";
import { CrudTable } from "@/features/CrudTable";
import userColumns from "../../config/userColumns";
import CrudTableContextProvider from "@/features/CrudTable/components/CrudTableContextProvider";
import QueryUser from "../../forms/QueryUser";

export default function Users() {
  return (
    <IamLayout>
      <CrudTableContextProvider>
        <CrudTable
          entity="user"
          columns={userColumns}
          dataSource={[]}
          tableKey={"user-table"}
          rowKey="_id"
          searchFormFields={<QueryUser />}
        />
      </CrudTableContextProvider>
    </IamLayout>
  );
}
