import useLocale from "@/features/Language/hooks/useLocale";
import { ModalForm } from "@ant-design/pro-components";
import { Badge, Button, Form, Tooltip } from "antd";
import React from "react";
import useCrudTableContext from "../../hooks/useCrudTableContext";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import reverseTransformQuery from "@/utils/reverseTransformQuery";

const Search = ({
  formFields,
  title = "filter_data",
  initialQuery,
  render,
  actions,
}) => {
  if (!render) return;
  if (!formFields) return;
  const { translate } = useLocale();
  const [formInstance] = Form.useForm();
  const { crudTableContextHandler } = useCrudTableContext();

  const onFinish = (values) => {
    crudTableContextHandler.filters.set(values);
    actions.reload();
    actions.reset();
    return true;
  };

  const onReset = () => {
    crudTableContextHandler.filters.set({});
  };

  return (
    <ModalForm
      form={formInstance}
      title={title}
      initialValues={reverseTransformQuery(initialQuery)}
      onFinish={onFinish}
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
