import useLocale from "@/features/Language/hooks/useLocale";
import crudService from "@/service/crud.service";
import { EditFilled } from "@ant-design/icons";
import { DrawerForm } from "@ant-design/pro-components";
import { Button, Form, Tooltip } from "antd";
import React from "react";

const Update = ({
  entity,
  formFields,
  title = "update",
  data,
  id,
  isOpen,
  close,
  render,
  actions,
}) => {
  if (!render) return;
  if (!formFields) return;

  const { translate } = useLocale();

  const [formInstance] = Form.useForm();

  const onFinish = async (values) => {
    const response = await crudService.update({ entity, data: values, id });

    if (response?.success) {
      actions.reload();
      close();
      return true;
    }
  };

  return (
    <DrawerForm
      form={formInstance}
      title={title}
      grid={true}
      onFinish={onFinish}
      open={isOpen}
      // clearOnDestroy={true}
      initialValues={data}
      trigger={
        <Tooltip title={translate("upadte_data")}>
          <Button
            type="primary"
            key={`drawer-update-form-trigger`}
            icon={<EditFilled />}
            shape="circle"
            size="middle"
            style={{ backgroundColor: "#FF9800" }}
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
        onClose: close,
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

export default Update;
