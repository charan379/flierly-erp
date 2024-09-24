import useLocale from "@/features/Language/hooks/useLocale";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Badge, Button, message, Popconfirm, Tooltip } from "antd";
import React from "react";
import crudService from "../../service/crud.service";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Delete = ({ entity, actions, rows, render }) => {
  if (!render) return;
  const { translate } = useLocale();

  return (
    <Tooltip title={`${translate("delete_selected")}`}>
      <Badge color="blue" count={rows.selectedRowKeys.length} overflowCount={99} >
        <Popconfirm
          title={`${translate("delete_selected")} : ${rows.selectedRowKeys.length
            }`}
          description={`${translate(
            "on_confirming_selected_items_will_be_deleted"
          )}`}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          okButtonProps={{ danger: true }}
          okText={translate("confirm")}
          cancelText={translate("cancel")}
          cancelButtonProps={{ type: "primary" }}
          onCancel={() => message.warning(translate("request_cancelled"))}
          onConfirm={async () => {
            const { success } = await crudService.delete({
              entity: entity,
                ids: rows.selectedRowKeys,
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
            danger
            key={`delete-selected-rows-trigger`}
            shape="circle"
            size="middle"
            icon={<FontAwesomeIcon icon={faTrashCan} />}
            disabled={rows.selectedRowKeys.length <= 0}
          />
        </Popconfirm>
      </Badge>
    </Tooltip>
  );
};

export default Delete;
