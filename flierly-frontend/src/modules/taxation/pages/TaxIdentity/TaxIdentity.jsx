import React from 'react'
import TaxationLayout from '../../layout/TaxationLayout'
import CrudTableContextProvider from '@/features/CrudTable/components/CrudTableContextProvider'
import { CrudTable } from '@/features/CrudTable'
import FormFields from '@/components/FormFields'
import taxIdentityColumns from '../../config/taxIdentityColumns'

const TaxIdentity = () => {
    return (
        <TaxationLayout>
            <CrudTableContextProvider>
                <CrudTable
                    entity="tax-identity"
                    columns={taxIdentityColumns}
                    dataSource={[]}
                    tableKey={"tax-identity-table"}
                    rowKey="id"
                    rowSelectionColumnWidth="30px"
                    searchFormFields={<FormFields columns={taxIdentityColumns} configKey={"queryFormConfig"} />}
                    createFormFields={<FormFields columns={taxIdentityColumns} configKey={"createFormConfig"} />}
                    updateFormFields={<FormFields columns={taxIdentityColumns} configKey={"updateFormConfig"} />}
                />
            </CrudTableContextProvider>
        </TaxationLayout>
    )
}

export default TaxIdentity