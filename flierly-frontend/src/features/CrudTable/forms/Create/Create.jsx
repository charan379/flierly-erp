import useLocale from "@/features/Language/hooks/useLocale";
import { PlusOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { Button, Tooltip } from "antd";
import React from "react";

const Create = ({ formFields, title = "add", initialValues, render }) => {
  if (!render) return;
  if (!formFields) return;

  const { langDirection, translate } = useLocale();

  return (
    <ModalForm
      title={title}
      onFinish={(values) => {
        console.log(values);
        return true;
      }}
      initialValues={initialValues}
      trigger={
        <Tooltip title={translate("add_data")}>
          <Button
            type="primary"
            key={`drawer-create-form-trigger`}
            icon={<PlusOutlined />}
            shape="circle"
            size="middle"
            style={{ backgroundColor: "teal" }}
          />
        </Tooltip>
      }
      // modal props
      modalProps={{
        destroyOnClose: true,
        centered: true,
      }}
      submitter={{
        searchConfig: {
          resetText: translate("cancel"),
          submitText: translate("save"),
        },
      }}
    >
      {formFields}
    </ModalForm>
  );
};

export default Create;
