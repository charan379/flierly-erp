import { CloseOutlined } from "@ant-design/icons";
import React from "react";

const CustomAntDSelectTag = ({ title, onClose }) => {
  return (
    <span
      title={title}
      className="ant-select-selection-item"
    >
      <span className="ant-select-selection-item-content">{title}</span>
      <span
        className="ant-select-selection-item-remove"
        unselectable="on"
        aria-hidden="true"
        style={{ userSelect: "none" }}
      >
        <CloseOutlined onClick={onClose}/>
      </span>
    </span>
  );
};

export default CustomAntDSelectTag;
