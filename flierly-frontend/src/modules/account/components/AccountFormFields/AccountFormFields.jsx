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
import queryTransformers from '@/utils/queryTransformers';

const AccountFormFields = ({ columns = [], configKey, formInstance }) => {
    const { langDirection, translate } = useLocale();
    const { hasPermission } = useAuth();

    const [accountTypeId, setAccountTypeId] = useState(undefined);

    const sortedColumns = columns.sort((c1, c2) => c1?.order - c2?.order);

    const columnsTillActype = sortedColumns.filter(col => col.order <= 2);

    const columnsAfterActype = sortedColumns.filter(col => col.order >= 5);

    return (
        <Flex style={{ direction: langDirection, paddingRight: "1px " }} gap="middle" wrap align="flex-start" justify="flex-start">
            {/*  */}
            {columnsTillActype.map((column) => {
                if (hasOwnProperty(column, configKey)) {
                    return <FormField key={`${uniqueId()}`} config={column[configKey]} />;
                } else return;
            })}
            {/* accountType */}
            <ProForm.Item
                key={"account_type"}
                name="accountType"
                label={translate("account_type")}
                required={configKey !== "queryFormConfig"}
                style={{ width: "100%" }}
                transform={configKey === "queryFormConfig" ? queryTransformers.inArray : undefined}
            >
                <SelectRemoteOptions
                    debounceTimeout={500}
                    asyncOptionsFetcher={fetchAccountTypesAsOptions}
                    placeholder="Please enter"
                    allowClear={false}
                    disabled={!hasPermission(/^account\.create$/)}
                    mode={configKey === "queryFormConfig" ? "multiple" : "single"}
                    onChange={(value) => {
                        setAccountTypeId(value)
                        formInstance.resetFields(["accountSubtype"])
                    }} />
            </ProForm.Item>
            {/* accountSubtype */}
            <ProForm.Item
                key={"account_subtype"}
                name="accountSubtype"
                label={translate("account_subtype")}
                required={configKey !== "queryFormConfig"}
                style={{ width: "100%" }}
                transform={configKey === "queryFormConfig" ? queryTransformers.inArray : undefined}
            >
                <SelectRemoteOptions
                    debounceTimeout={500}
                    asyncOptionsFetcher={(value) => fetchAccountSubtypesAsOptions(value, accountTypeId)}
                    placeholder="Please enter"
                    disabled={accountTypeId === undefined || !hasPermission(/^account\.create$/)}
                    mode={configKey === "queryFormConfig" ? "multiple" : "single"}
                />
            </ProForm.Item>
            {/*  */}
            {columnsAfterActype.map((column) => {
                if (hasOwnProperty(column, configKey)) {
                    return <FormField key={`${uniqueId()}`} config={column[configKey]} />;
                } else return;
            })}
        </Flex>
    );
}

export default AccountFormFields;