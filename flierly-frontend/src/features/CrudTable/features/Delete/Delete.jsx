import useLocale from "@/features/Language/hooks/useLocale";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import React from "react";
import crudService from "../../service/crud.service";

const Delete = ({ entity, actions, rows, render }) => {
  if(!render) return;
  const { translate } = useLocale();

  return (
    <Popconfirm
      title={`${translate("delete_selected")} : ${rows.selectedRowKeys.length}`}
      description={`${translate("on_confirming_selected_items_will_be_deleted")}`}
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      okButtonProps={{ danger: true }}
      okText={translate("confirm")}
      cancelText={translate("cancel")}
      cancelButtonProps={{ type: "primary" }}
      onCancel={() => message.warning(translate("request_cancelled"))}
      onConfirm={async () => {
       const { success } = await crudService.delete({
          entity: entity,
          docIds: rows.selectedRowKeys,
        });
        // 
        if (success) {
          actions.clearSelected();
          await actions.reload();
      };
      }}
    >
      <Button
        type="primary"
        danger
        key={`delete-selected-rows-trigger`}
        icon={<DeleteOutlined />}
        disabled={rows.selectedRowKeys.length <= 0}
      >
        {`${translate("delete")}`}
      </Button>
    </Popconfirm>
  );
};

export default Delete;
