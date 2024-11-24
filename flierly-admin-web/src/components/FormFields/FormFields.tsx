import React from "react";
import { generate as uniqueId } from "shortid";
import FormField from "@/components/FormField";
import { ProColumnsWithFormConfig } from "@/features/CrudTable/types/ProColumnsWithFormConfig";

// Define the props for FormFields component
interface FormFieldsProps {
    columns: ProColumnsWithFormConfig<any>[];
    configKey: "createFormConfig" | "updateFormConfig" | "queryFormConfig";
}

const FormFields: React.FC<FormFieldsProps> = ({ columns = [], configKey }) => {
    return (
        <>
            {columns
                .sort((c1, c2) => (c1?.order || 0) - (c2?.order || 0)) // Sort columns based on the `order`
                .map((column) => {
                    // Check if the column has the property defined by configKey
                    if (column[configKey]) {
                        return <FormField key={uniqueId()} config={column[configKey]} />;
                    } else return null; // Return null if the configKey is not present in the column
                })}
        </>
    );
};

export default FormFields;
