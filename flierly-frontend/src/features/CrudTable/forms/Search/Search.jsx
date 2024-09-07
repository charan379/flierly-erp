import useLocale from "@/features/Language/hooks/useLocale";
import { DrawerForm } from "@ant-design/pro-components";
import { Badge, Button, Tooltip } from "antd";
import React from "react";
import useCrudTableContext from "../../hooks/useCrudTableContext";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({
  formFields,
  title = "filter_data",
  initialValues,
  render,
  actions,
}) => {
  if (!render) return;
  if (!formFields) return;
  const { langDirection, translate } = useLocale();
  const { crudTableContextHandler } = useCrudTableContext();

  return (
    <DrawerForm
      title={title}
      grid={true}
      initialValues={initialValues}
      onFinish={(values) => {
        crudTableContextHandler.filters.set(values);
        actions.reload();
        actions.reset();
        return true;
      }}
      onReset={() => {
        crudTableContextHandler.filters.set({});
      }}
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
          resetText: translate("rest"),
          submitText: translate("search"),
        },
      }}
    >
      {formFields}
    </DrawerForm>
  );
};

export default Search;
