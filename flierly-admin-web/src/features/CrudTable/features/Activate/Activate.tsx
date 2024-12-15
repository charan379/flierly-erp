import React, { useMemo } from "react";
import useLocale from "@/features/Locale/hooks/useLocale";
import {
  CheckCircleOutlined,
  QuestionCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Badge, Button, message, Popconfirm, Tooltip } from "antd";
import crudService from "../../../CrudModule/service/crudService";
import { ActionType } from "@ant-design/pro-components";

type ActivateProps = {
  entity: string;
  actions: ActionType | undefined;
  rows: { selectedRowKeys?: (string | number)[] | undefined; selectedRows?: any[] | undefined; };
  render: boolean;
};

const Activate: React.FC<ActivateProps> = ({ entity, actions, rows, render }) => {
  if (!render) return null;
  if (!actions) return null;
  if (rows.selectedRowKeys === undefined) return null;
  if (rows.selectedRows === undefined) return null;

  const { translate } = useLocale();

  const activate = useMemo(() => checkActiveStatus(rows.selectedRows), [rows.selectedRows]);

  const buttonStyle =
    rows.selectedRowKeys.length > 0
      ? {
          backgroundColor: activate ? "#4CAF50" : "#9E9E9E",
          borderColor: activate ? "#4CAF50" : "#9E9E9E",
        }
      : {};

  const handleConfirm = async () => {
    const action = activate ? crudService.activate : crudService.inactivate;
    const { success } = await action({
      entity,
      ids: rows.selectedRowKeys as number[],
    });

    if (success) {
      actions.clearSelected?.();
      actions.reload?.();
    }
  };

  return (
    <Tooltip title={translate(activate ? "activate_selected" : "inactivate_selected")}>
      <Badge count={rows.selectedRowKeys.length} overflowCount={99}>
        <Popconfirm
          title={`${translate(activate ? "activate" : "inactivate")}_selected: ${rows.selectedRowKeys.length}`}
          description={translate(
            `on_confirming_selected_items_will_be_${activate ? "activated" : "inactivated"}`
          )}
          icon={<QuestionCircleOutlined style={{ color: activate ? "#4CAF50" : "#9E9E9E" }} />}
          okButtonProps={{ style: { backgroundColor: activate ? "#4CAF50" : "#9E9E9E" } }}
          okText={translate("confirm")}
          cancelText={translate("cancel")}
          cancelButtonProps={{ type: "primary" }}
          onCancel={() => message.warning(translate("request_cancelled"))}
          onConfirm={handleConfirm}
        >
          <Button
            type="primary"
            style={buttonStyle}
            shape="circle"
            size="middle"
            icon={activate ? <CheckCircleOutlined /> : <StopOutlined />}
            disabled={rows.selectedRowKeys.length === 0}
          />
        </Popconfirm>
      </Badge>
    </Tooltip>
  );
};

const checkActiveStatus = (rows: Array<{ isActive?: boolean }> | undefined): boolean => {
  if(rows === undefined) return false;
  const { activeCount, inactiveCount } = rows.reduce(
    (acc, row) => {
      row?.isActive ? acc.activeCount++ : acc.inactiveCount++;
      return acc;
    },
    { activeCount: 0, inactiveCount: 0 }
  );

  return inactiveCount >= activeCount;
};

export default Activate;
