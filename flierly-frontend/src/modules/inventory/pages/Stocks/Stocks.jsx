import DefaultModuleLayout from "@/components/DefaultModuleLayout";
import { CrudTable } from "@/features/CrudTable";
import CrudTableContextProvider from "@/features/CrudTable/components/CrudTableContextProvider";
import React from "react";
import stockColumns from "../../config/stockColumns";
import FormFields from "@/components/FormFields";

const Stocks = () => {
  return (
    <DefaultModuleLayout>
      <CrudTableContextProvider>
        <CrudTable
          entity="stock"
          columns={stockColumns}
          dataSource={[]}
          tableKey={"stock-table"}
          rowKey="id"
          rowSelectionColumnWidth="30px"
          searchFormFields={<FormFields columns={stockColumns} configKey={"queryFormConfig"} />}
          createFormFields={<FormFields columns={stockColumns} configKey={"createFormConfig"} />}
          updateFormFields={<FormFields columns={stockColumns} configKey={"updateFormConfig"} />}
        />
      </CrudTableContextProvider>
    </DefaultModuleLayout>
  );
};

export default Stocks;
