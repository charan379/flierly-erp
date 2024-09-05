import React from "react";
import IamLayout from "../../layout/IamLayout";
import { CrudTable } from "@/features/CrudTable";
import privilegeColumns from "../../config/privilegeColumns";
import QueryPrivilege from "../../forms/QueryPrivilege";

export default function Privileges() {
  return (
    <IamLayout>
      <CrudTable
        entity="privilege"
        columns={privilegeColumns}
        dataSource={[]}
        tableKey={"privilege-table"}
        rowKey="_id"
        searchFormFields={<QueryPrivilege />}
      />
    </IamLayout>
  );
}
