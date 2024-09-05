import useLocale from "@/features/Language/hooks/useLocale";
import { ClearOutlined } from "@ant-design/icons";
import { Badge, Button, Tooltip } from "antd";
import React from "react";

const Clear = ({ render, rows, actions }) => {
  if (!render) return;

  const { translate } = useLocale();

  return (
    <Tooltip title={`${translate("clear_selected")}`}>
      <Badge
        color="pink"
        overflowCount={99}
        count={rows.selectedRowKeys.length}
      >
        <Button
          type="primary"
          key={`clear-selected-rows-trigger`}
          icon={<ClearOutlined />}
          shape="circle"
          size="middle"
          disabled={rows.selectedRowKeys.length <= 0}
          onClick={() => actions.clearSelected()}
        />
      </Badge>
    </Tooltip>
  );
};

export default Clear;
