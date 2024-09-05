import useLocale from "@/features/Language/hooks/useLocale";
import { ClearOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const Clear = ({ render, rows, actions }) => {
  if (!render) return;

  const { translate } = useLocale();

  return (
    <Button
      type="primary"
      key={`clear-selected-rows-trigger`}
      icon={<ClearOutlined />}
      disabled={rows.selectedRowKeys.length <= 0}
      onClick={() => actions.clearSelected()}
    >
      {`${translate("clear")} ${
        rows.selectedRowKeys.length > 0 ? rows.selectedRowKeys.length : ""
      }`}
    </Button>
  );
};

export default Clear;
