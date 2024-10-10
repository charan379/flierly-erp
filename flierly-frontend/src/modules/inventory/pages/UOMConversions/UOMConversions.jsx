import DefaultModuleLayout from "@/components/DefaultModuleLayout";
import React from "react";
import uomConvertionColumns from "../../config/uomConvertionColumns";
import CrudTableContextProvider from "@/features/CrudTable/components/CrudTableContextProvider";
import { CrudTable } from "@/features/CrudTable";
import FormFields from "@/components/FormFields";

const UOMConversions = () => {
  return (
    <DefaultModuleLayout>
      <CrudTableContextProvider>
        <CrudTable
          entity="uom-conversion"
          columns={uomConvertionColumns}
          dataSource={[]}
          tableKey={"uom-comversion-table"}
          rowKey="id"
          rowSelectionColumnWidth="30px"
          searchFormFields={<FormFields columns={uomConvertionColumns} configKey={"queryFormConfig"} />}
          createFormFields={<FormFields columns={uomConvertionColumns} configKey={"createFormConfig"} />}
          updateFormFields={<FormFields columns={uomConvertionColumns} configKey={"updateFormConfig"} />}
        />
      </CrudTableContextProvider>
    </DefaultModuleLayout>
  );
};

export default UOMConversions;
