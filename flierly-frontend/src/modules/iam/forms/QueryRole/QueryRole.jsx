import hasOwnProperty from "@/utils/hasOwnProperty";
import { ProForm } from "@ant-design/pro-components";
import React from "react";
import roleColumns from "../../config/roleColumns";
import useLocale from "@/features/Language/hooks/useLocale";
import FormField from "@/components/FormField";
import { generate as uniqueId } from "shortid";

const QueryRole = () => {
  const { langDirection } = useLocale();

  return (
    <div style={{ direction: langDirection }}>
      <ProForm.Group>
        {roleColumns.map((column) => {
          if (hasOwnProperty(column, "queryFormConfig")) {
            return (
              <FormField
                key={`${uniqueId()}`}
                config={column["queryFormConfig"]}
              />
            );
          } else return;
        })}
      </ProForm.Group>
    </div>
  );
};

export default QueryRole;
