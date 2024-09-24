import useLocale from "@/features/Language/hooks/useLocale";
import { QuestionCircleOutlined, UndoOutlined } from "@ant-design/icons";
import { Badge, Button, message, Popconfirm, Tooltip } from "antd";
import React from "react";
import crudService from "../../service/crud.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";

const Restore = ({ entity, actions, rows, render }) => {
  if (!render) return;
  const { translate } = useLocale();

  const buttonStyle =
    rows.selectedRowKeys.length <= 0
      ? {}
      : { backgroundColor: "#009688", borderColor: "#009688" };

  return (
    <Tooltip title={`${translate("restore_selected")}`}>
      <Badge
        color="purple"
        count={rows.selectedRowKeys.length}
        overflowCount={99}
      >
        <Popconfirm
          title={`${translate("restore_selected")} : ${
            rows.selectedRowKeys.length
          }`}
          description={`${translate(
            "on_confirming_selected_items_will_be_restored"
          )}`}
          icon={<QuestionCircleOutlined style={{ color: "#009688" }} />}
          okButtonProps={{ style: { backgroundColor: "#009688" } }}
          okText={translate("confirm")}
          cancelText={translate("cancel")}
          cancelButtonProps={{ type: "primary" }}
          onCancel={() => message.warning(translate("request_cancelled"))}
          onConfirm={async () => {
            const { success } = await crudService.restore({
              entity: entity,
              ids: rows.selectedRowKeys,
            });
            //
            if (success) {
              actions.clearSelected();
              actions.reload();
            }
          }}
        >
          <Button
            type="primary"
            style={buttonStyle}
            key={`restore-selected-rows-trigger`}
            shape="circle"
            size="middle"
            icon={<FontAwesomeIcon icon={faTrashCanArrowUp} size="1x" />}
            disabled={rows.selectedRowKeys.length <= 0}
          />
        </Popconfirm>
      </Badge>
    </Tooltip>
  );
};

export default Restore;
