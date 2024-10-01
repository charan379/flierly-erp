import React from "react";
import { CrudTable } from "@/features/CrudTable";
import CrudTableContextProvider from "@/features/CrudTable/components/CrudTableContextProvider";
import FormFields from "@/components/FormFields";
import AccountLayout from "../../layout/AccountLayout";
import accountSubtypeColumns from "../../config/accountSubtypeColumns";


export default function AccountSubtype() {
  return (
    <AccountLayout>
      <CrudTableContextProvider>
        <CrudTable
          entity="account-subtype"
          columns={accountSubtypeColumns}
          dataSource={[]}
          tableKey={"account-subtype-table"}
          rowKey="id"
          searchFormFields={
            <FormFields
              columns={accountSubtypeColumns}
              configKey={"queryFormConfig"}
            />
          }
          createFormFields={
            <FormFields
              columns={accountSubtypeColumns}
              configKey={"createFormConfig"}
            />
          }
          updateFormFields={
            <FormFields
              columns={accountSubtypeColumns}
              configKey={"updateFormConfig"}
            />
          }
        />
      </CrudTableContextProvider>
    </AccountLayout>
  );
}
