import React from 'react'
import AccountLayout from '../../layout/AccountLayout'
import CrudTableContextProvider from '@/features/CrudTable/components/CrudTableContextProvider'
import accountColumns from '../../config/accountColumns'
import { CrudTable } from '@/features/CrudTable'
import FormFields from '@/components/FormFields'

const Account = () => {
    return (
        <AccountLayout>
            <CrudTableContextProvider>
                <CrudTable
                    entity="account"
                    columns={accountColumns}
                    dataSource={[]}
                    tableKey={"account-table"}
                    rowKey="id"
                    rowSelectionColumnWidth="30px"
                    searchFormFields={<FormFields columns={accountColumns} configKey={"queryFormConfig"} />}
                    createFormFields={<FormFields columns={accountColumns} configKey={"createFormConfig"} />}
                    updateFormFields={<FormFields columns={accountColumns} configKey={"updateFormConfig"} />}
                />
            </CrudTableContextProvider>
        </AccountLayout>
    )
}

export default Account;