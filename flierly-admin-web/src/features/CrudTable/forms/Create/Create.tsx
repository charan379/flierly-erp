import React from "react";
import { Button, Form, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ActionType, DrawerForm } from "@ant-design/pro-components";
import useLocale from "@/features/Locale/hooks/useLocale";
import crudService from "../../service/crudService";

// Define the types for props
interface CreateProps {
  entity: string;
  formFields: any;
  title?: string;
  render: boolean;
  actions: ActionType | undefined;
}

const Create: React.FC<CreateProps> = ({
  entity,
  formFields,
  title = "add",
  render,
  actions,
}) => {
  if (!render) return null;
  if (!formFields) return null;
  if (!actions) return null;

  const { translate } = useLocale();

  const [formInstance] = Form.useForm();

  const onFinish = async (values: any): Promise<boolean | void> => {
    const response: ApiResponse<any> = await crudService.create({ entity, data: values });

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
