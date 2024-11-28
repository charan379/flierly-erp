import { Button, Form, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ActionType, DrawerForm } from "@ant-design/pro-components";
import useLocale from "@/features/Locale/hooks/useLocale";
import crudService from "../../service/crudService";
import FormField, { FormFieldConfig } from "@/components/FormField";
import { useState } from "react";

// Define the types for props
interface CreateProps<T = Record<string, any>> {
  entity: string; // Entity name to interact with CRUD service
  formFields?: FormFieldConfig<T>[]; // Form fields configuration
  title?: string; // Optional title for the drawer
  render: boolean; // Whether to render the component
  actions: ActionType | undefined; // Actions object for table reload, etc.
}

const Create = <T extends Record<string, any>>({
  entity,
  formFields,
  title = "add",
  render,
  actions,
}: CreateProps<T>): JSX.Element | null => {
  if (!render) return null;
  if (!formFields) return null;
  if (!actions) return null;

  const { translate } = useLocale();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formInstance] = Form.useForm<T>();

  const onFinish = async (values: T): Promise<boolean | void> => {
    setIsLoading(true);
    const response = await crudService.create({ entity, data: values });

    if (response?.success) {
      actions.reload();
      return true;
    }
    setIsLoading(false);
  };

  return (
    <DrawerForm
      form={formInstance}
      title={title}
      grid={true}
      onFinish={onFinish}
      loading={isLoading || formInstance.isFieldsValidating()}
      trigger={
        <Tooltip title={translate("add_data")}>
          <Button
            type="primary"
            key={`drawer-create-form-trigger`}
            icon={<PlusOutlined />}
            shape="circle"
            size="middle"
            style={{ backgroundColor: "teal" }}
            disabled={formFields?.length > 0 ? false : true}
          />
        </Tooltip>
      }
      resize={{
        maxWidth: window.innerWidth * 0.9,
        minWidth: window.innerWidth * 0.5,
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
      {formFields.map((field) => (
        <FormField key={`${entity}-${String(field.name)}`} config={field} fieldKey={`${entity}-${String(field.name)}`} />
      ))}
    </DrawerForm>
  );
};

export default Create;
