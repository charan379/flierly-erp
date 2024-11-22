import useLocale from "@/features/Locale/hooks/useLocale";
import { ClearOutlined } from "@ant-design/icons";
import { Badge, Button, Tooltip } from "antd";
import React from "react";
import { ActionType } from "@ant-design/pro-components";

type ClearProps = {
  render: boolean; // Whether to render the component
  rows: {
    selectedRowKeys: number[]; // Array of selected row keys
  };
  actions: Partial<ActionType>; // Actions with optional methods
};

const Clear: React.FC<ClearProps> = ({ render, rows, actions }) => {
  if (!render) return null;

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
          key="clear-selected-rows-trigger"
          icon={<ClearOutlined />}
          shape="circle"
          size="middle"
          disabled={rows.selectedRowKeys.length <= 0}
          onClick={() => actions.clearSelected?.()} // Safely call clearSelected if it exists
        />
      </Badge>
    </Tooltip>
  );
};

export default Clear;
