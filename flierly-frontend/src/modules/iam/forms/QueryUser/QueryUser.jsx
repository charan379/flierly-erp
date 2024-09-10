import useLocale from "@/features/Language/hooks/useLocale";
import { ProForm } from "@ant-design/pro-components";
import React from "react";
import userColumns from "../../config/userColumns";
import FormField from "@/components/FormField";
import hasOwnProperty from "@/utils/hasOwnProperty";
import { generate as uniqueId } from "shortid";

const QueryUser = () => {
  const { langDirection } = useLocale();

  return (
    <div style={{ direction: langDirection }}>
      <ProForm.Group>
        {userColumns.map((column) => {
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

export default QueryUser;
