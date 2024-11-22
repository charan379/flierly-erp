import React from "react";
import { Button, Form, Tooltip } from "antd";
import { EditFilled } from "@ant-design/icons";
import { ActionType, DrawerForm } from "@ant-design/pro-components";
import useLocale from "@/features/Locale/hooks/useLocale";
import crudService from "../../service/crudService";

// Define types for the component props
interface UpdateProps {
  entity: string; // Entity name for CRUD operations
  formFields: any
  title?: string; // Optional title for the drawer
  data: Record<string, any>; // Data to initialize the form
  id: number; // ID for the record being updated
  isOpen: boolean; // Whether the drawer is open
  close: () => void; // Function to close the drawer
  render: boolean; // A boolean to control the rendering of the component
  actions: ActionType | undefined
}

const Update: React.FC<UpdateProps> = ({
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
  if (!render) return null;
  if (!formFields) return null;
  if (!actions) return null;

  const { translate } = useLocale();
  const [formInstance] = Form.useForm();

  const onFinish = async (values: Record<string, any>) => {
    const response = await crudService.update({ entity, data: values, id });

    if (response?.success) {
      actions.reload();
      close();
      return true;
    }
  };

  // Generate initial values for the form based on the provided data
  let initialValues: Record<string, any> = {};

  Object.keys(data).forEach((key) => {
    if (data[key] && typeof data[key] === "object" && !Array.isArray(data[key])) {
      initialValues = { ...initialValues, [key]: data[key].id };
    } else {
      initialValues = { ...initialValues, [key]: data[key] };
    }
  });

  return (
    <DrawerForm
      form={formInstance}
      title={title}
      grid={true}
      onFinish={onFinish}
      open={isOpen}
      initialValues={initialValues}
      trigger={
        <Tooltip title={translate("update_data")}>
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
