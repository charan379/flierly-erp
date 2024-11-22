import React from "react";
import { Badge, Button, Form, Tooltip } from "antd";
import { ActionType, ModalForm } from "@ant-design/pro-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import useLocale from "@/features/Locale/hooks/useLocale";
import useCrudTableContext from "../../hooks/useCrudTableContext/useCrudTableContext";
// import reverseTransformQuery from "@/utils/reverseTransformQuery";

// Define types for the component props
interface SearchProps {
  formFields: any,
  title?: string; // Optional title for the modal
  initialQuery?: Record<string, any>; // Optional initial query to transform into form values
  render: boolean; // A boolean to control the rendering of the component
  actions: ActionType | undefined
}

const Search: React.FC<SearchProps> = ({
  formFields,
  title = "filter_data",
  initialQuery,
  render,
  actions,
}) => {
  if (!render) return null;
  if (!formFields) return null;
  if(!actions) return null;

  const { translate } = useLocale();
  const [formInstance] = Form.useForm();
  const { crudTableContextHandler } = useCrudTableContext();

  const onFinish = (values: Record<string, any>) => {
    crudTableContextHandler.filters.set(values);
    actions.reload();
    actions.reset?.();
    return true;
  };

  const onReset = () => {
    crudTableContextHandler.filters.set({});
  };

  return (
    <ModalForm
      form={formInstance}
      title={title}
    //   initialValues={reverseTransformQuery(initialQuery)}
    //   onFinish={onFinish}
      onReset={onReset}
      trigger={
        <Tooltip title={translate("apply_filters")}>
          <Badge
            count={Object.keys(crudTableContextHandler.filters.get()).length}
            overflowCount={99}
          >
            <Button
              type="primary"
              key={`model-search-form-trigger`}
              icon={<FontAwesomeIcon icon={faFilter} />}
              shape="circle"
              size="middle"
              style={{ backgroundColor: "#722ed1" }}
            />
          </Badge>
        </Tooltip>
      }
      modalProps={{
        destroyOnClose: true,
        centered: true,
        classNames: { body: "crud-table-modal-body" },
      }}
      submitter={{
        searchConfig: {
          resetText: translate("rest"),
          submitText: translate("search"),
        },
      }}
    >
      {React.cloneElement(formFields, { formInstance })}
    </ModalForm>
  );
};

export default Search;
