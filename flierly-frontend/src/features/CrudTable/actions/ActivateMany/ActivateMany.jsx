import useLocale from "@/locale/useLocale";
import { CheckCircleOutlined, QuestionCircleOutlined, StopOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import React, { useMemo } from "react";
import crudService from "../../service/crud.service";

const ActivateMany = ({ entity, actions, rows }) => {

  const { translate } = useLocale();

  // Memoize the activate state calculation
  const activate = useMemo(() => checkActiveStatus(rows.selectedRows), [rows.selectedRows]);

  const buttonStyle = rows.selectedRowKeys.length <= 0 ? {} : { backgroundColor: activate ? "green" : "orange", borderColor: activate ? "green" : "orange" };

  return (
    <Popconfirm
      title={`${translate(`${activate ? 'activate' : 'inactivate'}_selected`)} : ${rows.selectedRowKeys.length}`}
      description={translate(`on_confirming_selected_items_will_be_${activate ? 'activated' : 'inactivated'}`)}
      icon={<QuestionCircleOutlined style={{ color: `${activate ? "green" : "orange"}` }} />}
      okButtonProps={{ style: { backgroundColor: activate ? "green" : "orange" } }}
      okText={translate("confirm")}
      cancelText={translate("cancel")}
      cancelButtonProps={{ type: "primary" }}
      onCancel={() => message.warning(translate("request_cancelled"))}
      onConfirm={async () => {
        const { success } =  await crudService.activate({
          entity: entity,
          action: activate ? "activate" : "inactivate",
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
        style={buttonStyle}
        key={`activate-selected-rows-trigger`}
        icon={activate ? <CheckCircleOutlined/> : <StopOutlined/>}
        disabled={rows.selectedRowKeys.length <= 0}
      >
        {`${translate(`${activate ? "activate" : "inactivate"}`)}`}
      </Button>
    </Popconfirm>
  );
};

const checkActiveStatus = (rows) => {
  const { activeCount, inactiveCount } = rows.reduce(
    (acc, branch) => {
      if (branch?.isActive) {
        acc.activeCount++;
      } else {
        acc.inactiveCount++;
      }
      return acc;
    },
    { activeCount: 0, inactiveCount: 0 }
  );

  return inactiveCount >= activeCount;
};

export default ActivateMany;
