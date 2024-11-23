import React from "react";
import { generate as uniqueId } from "shortid";
import FormField from "@/components/FormField";
import hasOwnProperty from "@/utils/hasOwnProperty";
import { Flex } from "antd";
import useLocale from "@/features/Locale/hooks/useLocale";

// Define the type for column data (e.g., object with a configKey)
interface Column {
  order: number;
  [key: string]: any; // For the dynamic configKey values
}

// Define the props for FormFields component
interface FormFieldsProps {
  columns: Column[];
  configKey: string;
}

const FormFields: React.FC<FormFieldsProps> = ({ columns = [], configKey }) => {
  const { langDirection } = useLocale();

  return (
    <Flex
      style={{ direction: langDirection, paddingRight: "1px", overflow: "hidden" }}
      gap="middle"
      wrap
      align="flex-start"
      justify="flex-start"
    >
      {columns
        .sort((c1, c2) => c1?.order - c2?.order) // Sort columns based on the `order`
        .map((column) => {
          // Check if the column has the property defined by configKey
          if (hasOwnProperty(column, configKey)) {
            return <FormField key={uniqueId()} config={column[configKey]} />;
          } else return null; // Return null if the configKey is not present in the column
        })}
    </Flex>
  );
};

export default FormFields;
