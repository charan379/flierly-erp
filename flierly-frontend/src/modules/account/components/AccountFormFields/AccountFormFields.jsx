import useLocale from '@/features/Language/hooks/useLocale';
import hasOwnProperty from '@/utils/hasOwnProperty';
import { generate as uniqueId } from "shortid";

import { Flex } from 'antd';
import React, { useState } from 'react'
import FormField from '@/components/FormField';
import { ProForm } from '@ant-design/pro-components';
import SelectRemoteOptions from '@/features/SelectRemoteOptions';
import fetchAccountTypesAsOptions from '../../utils/fetchAccountTypesAsOptions';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import fetchAccountSubtypesAsOptions from '../../utils/fetchAccountSubtypesAsOptions';

const AccountFormFields = ({ columns = [], configKey, formInstance }) => {
    const { langDirection, translate } = useLocale();
    const { hasPermission } = useAuth();

    const [accountTypeId, setAccountTypeId] = useState(undefined);

    console.log(formInstance)
    return (
        <Flex style={{ direction: langDirection, paddingRight: "1px " }} gap="middle" wrap align="flex-start" justify="flex-start">

            <ProForm.Item
                key={"account_type"}
                name="accountType"
                label={translate("account_type")}
                required
                style={{ width: "100%" }}
            >
                <SelectRemoteOptions
                    debounceTimeout={500}
                    asyncOptionsFetcher={fetchAccountTypesAsOptions}
                    placeholder="Please enter"
                    onChange={(value) => {
                        setAccountTypeId(value)
                        formInstance.resetFields(["accountSubtype"])
                    }} />
            </ProForm.Item>
            {/*  */}
            <ProForm.Item
                key={"account_subtype"}
                name="accountSubtype"
                label={translate("account_subtype")}
                required
                style={{ width: "100%" }}
            >
                <SelectRemoteOptions
                    debounceTimeout={500}
                    asyncOptionsFetcher={(value) => fetchAccountSubtypesAsOptions(value, accountTypeId)}
                    placeholder="Please enter"
                    onChange={(value) => {
                        console.log(value)
                    }}
                    disabled={accountTypeId === undefined}
                />
            </ProForm.Item>
            {columns.sort((c1, c2) => c1?.order - c2?.order).map((column) => {
                if (hasOwnProperty(column, configKey)) {
                    return <FormField key={`${uniqueId()}`} config={column[configKey]} />;
                } else return;
            })}
        </Flex>
    );
}

export default AccountFormFields;