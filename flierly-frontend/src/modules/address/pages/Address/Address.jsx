import React from 'react'
import CrudTableContextProvider from '@/features/CrudTable/components/CrudTableContextProvider'
import { CrudTable } from '@/features/CrudTable'
import FormFields from '@/components/FormFields'
import AddressLayout from '../../layout/AddressLayout'
import addressColumns from '../../config/addressColumns'

const Address = () => {
    return (
        <AddressLayout>
            <CrudTableContextProvider>
                <CrudTable
                    entity="address"
                    columns={addressColumns}
                    dataSource={[]}
                    tableKey={"address-table"}
                    rowKey="id"
                    rowSelectionColumnWidth="30px"
                    searchFormFields={<FormFields columns={addressColumns} configKey={"queryFormConfig"} />}
                    createFormFields={<FormFields columns={addressColumns} configKey={"createFormConfig"} />}
                    updateFormFields={<FormFields columns={addressColumns} configKey={"updateFormConfig"} />}
                />
            </CrudTableContextProvider>
        </AddressLayout>
    )
}

export default Address