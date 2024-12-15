import React from "react";
import useLocale from "@/features/Locale/hooks/useLocale";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { PlusOutlined } from "@ant-design/icons";
import { DrawerForm } from "@ant-design/pro-components";
import { Button, Empty, Form } from "antd";
import crudService from "@/features/CrudModule/service/crudService";

interface CreateProps {
    entity: string;
    formFields: React.ReactElement;
    title?: string;
    initialValues?: Record<string, any>;
    permissionCode?: RegExp;
}

const Create: React.FC<CreateProps> = ({
    entity,
    formFields,
    title = "add",
    initialValues,
    permissionCode,
}) => {
    if (!formFields) return null;

    const { hasPermission } = useAuth();
    
    if (permissionCode && !hasPermission(permissionCode)) return <Empty />;

    const { translate } = useLocale();

    const [formInstance] = Form.useForm();

    const onFinish = async (values: Record<string, any>): Promise<boolean> => {
        const response = await crudService.create({ entity, data: values });
        return !!response?.success;
    };

    return (
        <DrawerForm
            form={formInstance}
            initialValues={initialValues}
            title={title}
            grid={true}
            onFinish={onFinish}
            trigger={
                <Button
                    type="link"
                    key="drawer-create-form-trigger"
                    icon={<PlusOutlined />}
                    shape="default"
                    size="large"
                    style={{ width: "100%" }}
                >
                    {translate("add_new_option")}
                </Button>
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
