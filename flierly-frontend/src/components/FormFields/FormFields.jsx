import useLocale from "@/features/Language/hooks/useLocale";
import React from "react";
import { generate as uniqueId } from "shortid";
import FormField from "@/components/FormField";
import hasOwnProperty from "@/utils/hasOwnProperty";
import { Flex } from "antd";

const FormFields = ({ columns = [], configKey, formInstance }) => {
  const { langDirection } = useLocale();

  return (
    <Flex style={{ direction: langDirection, paddingRight: "1px", overflow: "hidden" }} gap="middle" wrap align="flex-start" justify="flex-start">
      {columns.sort((c1, c2) => c1?.order - c2?.order).map((column) => {
        if (hasOwnProperty(column, configKey)) {
          return <FormField key={`${uniqueId()}`} config={column[configKey]} />;
        } else return;
      })}
    </Flex>
  );
};

export default FormFields;
