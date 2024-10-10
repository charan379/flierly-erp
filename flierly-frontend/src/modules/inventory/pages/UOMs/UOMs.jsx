import DefaultModuleLayout from "@/components/DefaultModuleLayout";
import { CrudTable } from "@/features/CrudTable";
import CrudTableContextProvider from "@/features/CrudTable/components/CrudTableContextProvider";
import React from "react";
import uomColumns from "../../config/uomColumns";
import FormFields from "@/components/FormFields";

const UOMs = () => {
  return (
    <DefaultModuleLayout>
      <CrudTableContextProvider>
        <CrudTable
          entity="uom"
          columns={uomColumns}
          dataSource={[]}
          tableKey={"upm-table"}
          rowKey="id"
          rowSelectionColumnWidth="30px"
          searchFormFields={<FormFields columns={uomColumns} configKey={"queryFormConfig"} />}
          createFormFields={<FormFields columns={uomColumns} configKey={"createFormConfig"} />}
          updateFormFields={<FormFields columns={uomColumns} configKey={"updateFormConfig"} />}
        />
      </CrudTableContextProvider>
    </DefaultModuleLayout>
  );
};

export default UOMs;
