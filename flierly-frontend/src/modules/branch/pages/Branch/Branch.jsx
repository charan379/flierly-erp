import React from "react";
import BranchLayout from "../../layout/BranchLayout";
import { CrudTable } from "@/features/CrudTable";
import columns from "../../config/branchColumns";

function Branch() {
  return (
    <BranchLayout>
      <CrudTable
        entity="branch"
        columns={columns}
        dataSource={[]}
        tableKey={"branch-table"}
        rowKey="_id"
        // createFormFields={<AddCustomer />}
        // createFormInitialValues={{ tags: ["gold"] }}
        // searchFormFields={<SearchCustomer />}
        // searchFormInitialValues={{ tags: ["gold"] }}
      />
    </BranchLayout>
  );
}

export default Branch;
