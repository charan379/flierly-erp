import useLocale from "@/locale/useLocale";
import { PlusOutlined } from "@ant-design/icons";
import { DrawerForm as From } from "@ant-design/pro-components";
import { Button } from "antd";
import React from "react";

const DrawerForm = ({ form, title = "add" }) => {
  const { langDirection, translate } = useLocale();
  return (
    <From
      title={title}
      trigger={
        <Button
          type="primary"
          key={`drawer-form-trigger`}
          icon={<PlusOutlined />}
          style={{ backgroundColor: "teal" }}
        >
          {translate("add")}
        </Button>
      }
      resize={{
        maxWidth: "window.innerWidth * 0.8",
        minWidth: 300,
      }}
      drawerProps={{
        destroyOnClose: true,
        styles: {
          footer: { padding: "15px 15px 15px 15px" },
          header: { padding: "10px 5px 5px 5px" },
        },
      }}
      submitter={{ searchConfig: { resetText: "Cancel", submitText: "Save" } }}
    >
      {form}
    </From>
  );
};

export default DrawerForm;
