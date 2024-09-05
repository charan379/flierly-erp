import useLocale from "@/features/Language/hooks/useLocale";
import { SearchOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { Badge, Button, Tooltip } from "antd";
import React from "react";
import useCrudTableContext from "../../hooks/useCrudTableContext";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({ formFields, initialValues, render, actions }) => {
  if (!render) return;
  if (!formFields) return;
  const { langDirection, translate } = useLocale();
  const { crudTableContextHandler } = useCrudTableContext();

  return (
    <ModalForm
      grid={true}
      // initial values
      initialValues={initialValues}
      // on finish
      onFinish={(values) => {
        crudTableContextHandler.filters.set(values);
        actions.reload();
        actions.reset();
        return true;
      }}
      onReset={() => {
        crudTableContextHandler.filters.set({});
      }}
      // Title of modal
      // title={title}
      // trigger button to toggle form
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
      // modal props
      modalProps={{
        destroyOnClose: true,
        centered: true,
      }}
      // submitter configuration
      submitter={{
        searchConfig: {
          resetText: translate("rest"),
          submitText: translate("search"),
        },
      }}
    >
      {formFields}
    </ModalForm>
  );
};

export default Search;
