import useLocale from "@/features/Language/hooks/useLocale";
import React from "react";
import { generate as uniqueId } from "shortid";
import FormField from "@/components/FormField";
import hasOwnProperty from "@/utils/hasOwnProperty";

const FormFields = ({ columns = [], configKey }) => {
  const { langDirection } = useLocale();

  return (
    <div style={{ direction: langDirection }}>
      {columns.map((column) => {
        if (hasOwnProperty(column, configKey)) {
          return <FormField key={`${uniqueId()}`} config={column[configKey]} />;
        } else return;
      })}
    </div>
  );
};

export default FormFields;
