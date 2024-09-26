import useLocale from "@/features/Language/hooks/useLocale";
import { ProForm } from "@ant-design/pro-components";
import React from "react";
import privilegeColumns from "../../config/privilegeColumns";
import { generate as uniqueId } from "shortid";
import FormField from "@/components/FormField";
import hasOwnProperty from "@/utils/hasOwnProperty";

const QueryPrivilege = () => {
  const { langDirection } = useLocale();

  return (
    <div style={{ direction: langDirection }}>
      {/* <ProForm.Group> */}
        {privilegeColumns.map((column) => {
          if (hasOwnProperty(column, "queryFormConfig")) {
            return (
              <FormField
                key={`${uniqueId()}`}
                config={column["queryFormConfig"]}
              />
            );
          } else return;
        })}
      {/* </ProForm.Group> */}
    </div>
  );
};

export default QueryPrivilege;
