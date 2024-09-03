import React from "react";
import IamLayout from "../../layout/IamLayout";
import { CrudTable } from "@/features/CrudTable";
import roleColumns from "../../config/roleColumns";

export default function Roles() {
  return (
    <IamLayout>
      <CrudTable
        entity="role"
        columns={roleColumns}
        dataSource={[]}
        tableKey={"role-table"}
        rowKey="_id"
      />
    </IamLayout>
  );
}
