import React from "react";
import { CrudTable } from "@/features/CrudTable";
import CrudTableContextProvider from "@/features/CrudTable/components/CrudTableContextProvider";
import FormFields from "@/components/FormFields";
import AccountLayout from "../../layout/AccountLayout";
import accountTypeColumns from "../../config/accountTypeColumns";

export default function AccountTypes() {
  return (
    <AccountLayout>
      <CrudTableContextProvider>
        <CrudTable
          entity="account-type"
          columns={accountTypeColumns}
          dataSource={[]}
          tableKey={"account-type-table"}
          rowKey="id"
          searchFormFields={
            <FormFields
              columns={accountTypeColumns}
              configKey={"queryFormConfig"}
            />
          }
          createFormFields={
            <FormFields
              columns={accountTypeColumns}
              configKey={"createFormConfig"}
            />
          }
          updateFormFields={
            <FormFields
              columns={accountTypeColumns}
              configKey={"updateFormConfig"}
            />
          }
        />
      </CrudTableContextProvider>
    </AccountLayout>
  );
}
