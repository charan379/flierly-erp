import React from 'react'
import AccountLayout from '../../layout/AccountLayout'
import CrudTableContextProvider from '@/features/CrudTable/components/CrudTableContextProvider'
import accountColumns from '../../config/accountColumns'
import { CrudTable } from '@/features/CrudTable'
import AccountFormFields from '../../components/AccountFormFields'

const Accounts = () => {
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
                    searchFormFields={<AccountFormFields columns={accountColumns} configKey={"queryFormConfig"} />}
                    createFormFields={<AccountFormFields columns={accountColumns} configKey={"createFormConfig"} />}
                    updateFormFields={<AccountFormFields columns={accountColumns} configKey={"updateFormConfig"} />}
                />
            </CrudTableContextProvider>
        </AccountLayout>
    )
}

export default Accounts;