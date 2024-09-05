import useLocale from "@/features/Language/hooks/useLocale";
import { SearchOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { Button } from "antd";
import React from "react";
import useCrudTableContext from "../../hooks/useCrudTableContext";

const Search = ({ formFields, title = "search", initialValues, render, actions }) => {
  if (!render) return;
  if (!formFields) return;
  const { langDirection, translate } = useLocale();
  const { crudTableContextHandler: ctCh } = useCrudTableContext();

  return (
    <ModalForm
      grid={true}
      // initial values
      initialValues={initialValues}
      // on finish
      onFinish={(values) => {
        crudTableContextHandler.filters.set(values);
        console.log(values);
        actions.reset()
        return true;
      }}
      // Title of modal
      // title={title}
      // trigger button to toggle form
      trigger={
        <Button
          type="primary"
          key={`model-search-form-trigger`}
          icon={<SearchOutlined />}
          style={{ backgroundColor: "#722ed1" }}
        >
          {translate("search")}
        </Button>
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
