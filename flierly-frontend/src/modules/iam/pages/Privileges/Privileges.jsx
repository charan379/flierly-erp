import React from "react";
import IamLayout from "../../layout/IamLayout";
import { CrudTable } from "@/features/CrudTable";
import privilegeColumns from "../../config/privilegeColumns";

export default function Privileges() {
  return (
    <IamLayout>
      <CrudTable
        entity="privilege"
        columns={privilegeColumns}
        dataSource={[]}
        tableKey={"privilege-table"}
        rowKey="_id"
      />
    </IamLayout>
  );
}
