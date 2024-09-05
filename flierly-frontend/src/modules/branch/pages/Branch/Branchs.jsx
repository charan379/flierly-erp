import React from "react";
import BranchLayout from "../../layout/BranchLayout";
import { CrudTable } from "@/features/CrudTable";
import columns from "../../config/branchColumns";
import CrudTableContextProvider from "@/features/CrudTable/context/Provider";

function Branchs() {
  return (
    <BranchLayout>
      <CrudTableContextProvider>
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
      </CrudTableContextProvider>
    </BranchLayout>
  );
}

export default Branchs;
