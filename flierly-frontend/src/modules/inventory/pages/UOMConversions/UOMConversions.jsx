import DefaultModuleLayout from "@/components/DefaultModuleLayout";
import React from "react";
import uomConversionColumns from "../../config/uomConvertionColumns";
import CrudTableContextProvider from "@/features/CrudTable/components/CrudTableContextProvider";
import { CrudTable } from "@/features/CrudTable";
import FormFields from "@/components/FormFields";

const UOMConversions = () => {
  return (
    <DefaultModuleLayout>
      <CrudTableContextProvider>
        <CrudTable
          entity="uom-conversion"
          columns={uomConversionColumns}
          dataSource={[]}
          tableKey={"uom-comversion-table"}
          rowKey="id"
          rowSelectionColumnWidth="30px"
          searchFormFields={<FormFields columns={uomConversionColumns} configKey={"queryFormConfig"} />}
          createFormFields={<FormFields columns={uomConversionColumns} configKey={"createFormConfig"} />}
          updateFormFields={<FormFields columns={uomConversionColumns} configKey={"updateFormConfig"} />}
        />
      </CrudTableContextProvider>
    </DefaultModuleLayout>
  );
};

export default UOMConversions;
