import useLocale from "@/features/Language/hooks/useLocale";
import { QuestionCircleOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import React from "react";
import crudService from "../../service/crud.service";

const Restore = ({ entity, actions, rows, render }) => {
  if(!render) return;
  const { translate } = useLocale();

  const buttonStyle = rows.selectedRowKeys.length <= 0 ? {} : { backgroundColor: "#009688", borderColor: "#009688" };
  
  return (
    <Popconfirm
      title={`${translate("restore_selected")} : ${rows.selectedRowKeys.length}`}
      description={`${translate(
        "on_confirming_selected_items_will_be_restored"
      )}`}
      icon={<QuestionCircleOutlined style={{ color: "#009688" }} />}
      okButtonProps={{style: { backgroundColor:"#009688" }}}
      okText={translate("confirm")}
      cancelText={translate("cancel")}
      cancelButtonProps={{ type: "primary" }}
      onCancel={() => message.warning(translate("request_cancelled"))}
      onConfirm={async () => {
        const { success } = await crudService.restore({
          entity: entity,
          docIds: rows.selectedRowKeys,
        });
        //
        if (success) {
          actions.clearSelected();
          await actions.reload();
        }
      }}
    >
      <Button
        type="primary"
        style={buttonStyle}
        key={`restore-selected-rows-trigger`}
        icon={<UndoOutlined />}
        disabled={rows.selectedRowKeys.length <= 0}
      >
        {`${translate("restore")}`}
      </Button>
    </Popconfirm>
  );
};

export default Restore;
