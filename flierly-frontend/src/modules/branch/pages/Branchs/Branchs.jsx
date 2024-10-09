import React from "react";
import BranchLayout from "../../layout/BranchLayout";
import { CrudTable } from "@/features/CrudTable";
import CrudTableContextProvider from "@/features/CrudTable/components/CrudTableContextProvider";
import FormFields from "@/components/FormFields";
import branchColumns from "../../config/branchColumns";

function Branchs() {
  return (
    <BranchLayout>
      <CrudTableContextProvider>
        <CrudTable
          entity="branch"
          columns={branchColumns}
          dataSource={[]}
          tableKey={"branch-table"}
          rowKey="id"
          rowSelectionColumnWidth="30px"
          searchFormFields={<FormFields columns={branchColumns} configKey={"queryFormConfig"} />}
          createFormFields={<FormFields columns={branchColumns} configKey={"createFormConfig"} />}
          updateFormFields={<FormFields columns={branchColumns} configKey={"updateFormConfig"} />}
        />
      </CrudTableContextProvider>
    </BranchLayout>
  );
}

export default Branchs;
