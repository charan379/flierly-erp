import React from "react";
import IamLayout from "../../layout/IamLayout";
import { CrudTable } from "@/features/CrudTable";
import userColumns from "../../config/userColumns";

export default function Users() {
  return (
    <IamLayout>
      <CrudTable
        entity="user"
        columns={userColumns}
        dataSource={[]}
        tableKey={"user-table"}
        rowKey="_id"
      />
    </IamLayout>
  );
}
