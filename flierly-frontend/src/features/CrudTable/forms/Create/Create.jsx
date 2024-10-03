import useLocale from "@/features/Language/hooks/useLocale";
import crudService from "@/service/crud.service";
import { PlusOutlined } from "@ant-design/icons";
import { DrawerForm } from "@ant-design/pro-components";
import { Button, Form, Tooltip } from "antd";
import React from "react";

const Create = ({
  entity,
  formFields,
  title = "add",
  render,
  actions,
}) => {
  if (!render) return;
  if (!formFields) return;

  const { translate } = useLocale();

  const [formInstance] = Form.useForm();

  const onFinish = async (values) => {
    const response = await crudService.create({ entity, data: values });

    if (response?.success) {
      actions.reload();
      return true;
    }
  };

  return (
    <DrawerForm
      form={formInstance}
      title={title}
      grid={true}
      onFinish={onFinish}
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
      resize={{
        maxWidth: window.innerWidth * 0.9,
        // minWidth: window.innerWidth * 0.5,
      }}
      drawerProps={{
        destroyOnClose: true,
        styles: {
          footer: { padding: "15px 15px 15px 15px" },
          header: { padding: "10px 5px 5px 5px" },
        },
      }}
      submitter={{
        searchConfig: {
          resetText: translate("cancel"),
          submitText: translate("save"),
        },
      }}
    >
      {React.cloneElement(formFields, { formInstance })}
    </DrawerForm>
  );
};

export default Create;
