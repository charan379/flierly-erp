import React, { useState } from "react";
import { Badge, Button, Form, Tooltip } from "antd";
import { ActionType, DrawerForm } from "@ant-design/pro-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import useLocale from "@/features/Locale/hooks/useLocale";
import useCrudTableContext from "../../hooks/useCrudTableContext/useCrudTableContext";
import reverseTransformQuery from "@/utils/reverseTransformQuery";
import { Store } from "antd/es/form/interface";

// Define types for the component props
interface SearchProps {
  formFields: any;
  title?: string; // Optional title for the drawer
  render: boolean; // A boolean to control the rendering of the component
  actions: ActionType | undefined;
}

const Search: React.FC<SearchProps> = ({
  formFields,
  title = "filter_data",
  render,
  actions,
}) => {
  if (!render) return null;
  if (!formFields) return null;
  if (!actions) return null;

  const { translate } = useLocale();
  const [formInstance] = Form.useForm();
  const { crudTableContextHandler } = useCrudTableContext();

  const [initialValues, setInitialValues] = useState<Store | undefined>(
    reverseTransformQuery(crudTableContextHandler.filters.get())
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onFinish = async (values: Record<string, any>): Promise<boolean | void> => {
    crudTableContextHandler.filters.set(values);
    actions.reload();
    setDrawerOpen(false); // Close the drawer after submission
    return true;
  };

  const onReset = () => {
    setInitialValues(undefined);
    crudTableContextHandler.filters.reset(); // Reset the filter context
    formInstance.resetFields(); // Reset the form fields
    actions.reload();
    setDrawerOpen(false); // Close the drawer after reset
  };

  return (
    <DrawerForm
      form={formInstance}
      title={title}
      initialValues={initialValues}
      onFinish={onFinish}
      open={drawerOpen}
      onOpenChange={(change) => setDrawerOpen(change)} // Control drawer visibility
      trigger={
        <Tooltip title={translate("apply_filters")}>
          <Badge
            count={Object.keys(crudTableContextHandler.filters.get())?.length}
            overflowCount={99}
          >
            <Button
              type="primary"
              key={`drawer-search-form-trigger`}
              icon={<FontAwesomeIcon icon={faFilter} />}
              shape="circle"
              size="middle"
              style={{ backgroundColor: "#722ed1" }}
            />
          </Badge>
        </Tooltip>
      }
      resize={{
        maxWidth: window.innerWidth * 0.9,
        minWidth: window.innerWidth * 0.5,
      }}
      drawerProps={{
        destroyOnClose: false,
        styles: {
          footer: { padding: "15px 15px 15px 15px" },
          header: { padding: "10px 5px 5px 5px" },
          content: {padding: "0px 0px 0px 15px"}
        },
      }}
      submitter={{
        searchConfig: {
          resetText: translate("close"),
          submitText: translate("search"),
        },
        render: (_, defaultDom) => {
          return [
            <Button key="reset" onClick={onReset} danger>
              {translate("rest")}
            </Button>,
            ...defaultDom,
          ];
        },
      }}
    >
      {React.cloneElement(formFields, { formInstance })}
    </DrawerForm>
  );
};

export default Search;
