import DefaultModuleLayout from "@/components/DefaultModuleLayout";
import { CrudTable } from "@/features/CrudTable";
import CrudTableContextProvider from "@/features/CrudTable/components/CrudTableContextProvider";
import React from "react";
import productColumns from "../../config/productColumns";
import FormFields from "@/components/FormFields";

const Products = () => {
  return (
    <DefaultModuleLayout>
      <CrudTableContextProvider>
        <CrudTable
          entity="product"
          columns={productColumns}
          dataSource={[]}
          tableKey={"product-table"}
          rowKey="id"
          rowSelectionColumnWidth="30px"
          searchFormFields={<FormFields columns={productColumns} configKey={"queryFormConfig"} />}
          createFormFields={<FormFields columns={productColumns} configKey={"createFormConfig"} />}
          updateFormFields={<FormFields columns={productColumns} configKey={"updateFormConfig"} />}
        />
      </CrudTableContextProvider>
    </DefaultModuleLayout>
  );
};

export default Products;
