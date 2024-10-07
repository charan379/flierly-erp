import useLocale from "@/features/Language/hooks/useLocale";
import hasOwnProperty from "@/utils/hasOwnProperty";
import { generate as uniqueId } from "shortid";
import { Flex } from "antd";
import React, { useState } from "react";
import FormField from "@/components/FormField";
import { ProForm } from "@ant-design/pro-components";
import SelectRemoteOptions from "@/features/SelectRemoteOptions";
import fetchAccountTypesAsOptions from "../../utils/fetchAccountTypesAsOptions";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import fetchAccountSubtypesAsOptions from "../../utils/fetchAccountSubtypesAsOptions";
import queryTransformers from "@/utils/queryTransformers";
import fetchAccountAddress from "../../utils/fetchAccountAddress";

const AccountFormFields = ({ columns = [], configKey, formInstance }) => {
  const { langDirection, translate } = useLocale(); // Localization hooks
  const { hasPermission } = useAuth();               // Permission hooks

  const [accountTypeId, setAccountTypeId] = useState(undefined); // State to hold selected account type

  // Sort and separate columns based on their order
  const sortedColumns = columns.sort((c1, c2) => c1?.order - c2?.order);
  const columnsTillActype = sortedColumns.filter((col) => col.order <= 2);
  const columnsAfterActype = sortedColumns.filter((col) => col.order >= 5);

  return (
    <Flex
      style={{ direction: langDirection, paddingRight: "1px", overflow: "hidden" }}
      gap="middle"
      wrap
      align="flex-start"
      justify="flex-start"
    >
      {/* Render form fields before account type selection */}
      {columnsTillActype.map((column) => (
        hasOwnProperty(column, configKey) ? (
          <FormField key={uniqueId()} config={column[configKey]} />
        ) : null
      ))}

      {/* Account Type Selection */}
      <ProForm.Item
        key="account_type"
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
            setAccountTypeId(value); // Update account type state
            formInstance.setFieldValue("accountSubtype", null); // Reset account subtype
          }}
        />
      </ProForm.Item>

      {/* Account Subtype Selection */}
      <ProForm.Item
        key="account_subtype"
        name="accountSubtype"
        label={translate("account_subtype")}
        required={configKey !== "queryFormConfig"}
        style={{ width: "100%" }}
        transform={configKey === "queryFormConfig" ? queryTransformers.inArray : undefined}
      >
        <SelectRemoteOptions
          debounceTimeout={500}
          asyncOptionsFetcher={(value, signal) => fetchAccountSubtypesAsOptions(value, signal, accountTypeId)}
          placeholder="Please enter"
          disabled={accountTypeId === undefined || !hasPermission(/^account\.create$/)}
          mode={configKey === "queryFormConfig" ? "multiple" : "single"}
        />
      </ProForm.Item>

      {/* Primary Address Selection */}
      {configKey !== "queryFormConfig" && (
        <ProForm.Item
          key="primary_address"
          name="primaryAddress"
          label={translate("primary_address")}
          required
          style={{ width: "100%" }}
        >
          <SelectRemoteOptions
            debounceTimeout={500}
            asyncOptionsFetcher={(value, signal) => fetchAccountAddress(value,signal, formInstance.getFieldValue("id"))}
            placeholder="Please enter"
            disabled={false}
            mode="single"
          />
        </ProForm.Item>
      )}

      {/* Render form fields after account type selection */}
      {columnsAfterActype.map((column) => (
        hasOwnProperty(column, configKey) ? (
          <FormField key={uniqueId()} config={column[configKey]} />
        ) : null
      ))}
    </Flex>
  );
};

export default AccountFormFields;
