import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useOnOutsideScroll } from "@/hooks/useOnOutsideScroll";
import useLocale from "@/locale/useLocale";
import { useTheme } from "@/theme/useTheme";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Menu, Popover } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import crudService from "../../service/crud.service";
import { useOnOutsideClick } from "@/hooks/useOnOutSideClick";

const RowContextMenu = ({ entity, actions, record, open, position, close }) => {
  const { theme } = useTheme();

  const { translate } = useLocale();

  const ref = useRef(null);

  const [popoverPosition, setPopoverPosition] = useState(position);

  const items = [
    {
      label: translate("view"),
      key: "view",
      disabled: true,
      icon: <EyeOutlined />,
    },
  ];

  //   edit
  if (true) {
    items.push({
      label: translate("edit"),
      key: "edit",
      disabled: true,
      icon: <EditOutlined />,
      style: { color: "blueviolet" },
    });
  }

  // inactivate
  if (record?.isActive) {
    items.push({
      label: translate("inactivate"),
      key: "inactivate",
      icon: <StopOutlined />,
      style: { color: "orange" },
    });
  }

  // activate
  if (!record?.isActive) {
    items.push({
      label: translate("activate"),
      key: "activate",
      icon: <CheckCircleOutlined />,
      style: { color: "green" },
    });
  }

  //   delete
  if (true) {
    items.push({
      label: translate("delete"),
      key: "delete",
      icon: <DeleteOutlined />,
      danger: true,
    });
  }

  const onMenuItemClick = async ({ item, key, keyPath, domEvent }) => {
    let result = {};
    switch (key) {
      case "activate":
        result = await crudService.activateMany({
          entity: entity,
          action: "activate",
          docIds: [record?._id],
        });
        break;
      case "inactivate":
        result = await crudService.activateMany({
          entity: entity,
          action: "inactivate",
          docIds: [record?._id],
        });
        break;
      case "delete":
        result = await crudService.deleteOne({
          entity: entity,
          docId: record?._id,
        });
        break;
      default:
        result = {};
        break;
    }

    if (result?.success) {
      actions.reload();
      close();
    }
  };

  useEscapeKey(() => close());

  useOnOutsideClick(
    "row-popover-menu",
    useCallback(() => {
      close();
    }, [close])
  );

  useOnOutsideScroll(
    "row-popover-menu",
    useCallback(() => {
      close();
    }, [close])
  );

  useEffect(() => {
    if (open) {
      const handlePositioning = () => {
        const popoverElement = document.getElementById("row-popover-menu");
        if (popoverElement) {
          const popoverRect = popoverElement.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          let newX = position.x;
          let newY = position.y;

          // Adjust X position
          if (newX + popoverRect.width > viewportWidth) {
            newX = viewportWidth - popoverRect.width - 25;
          }

          // Adjust Y position
          if (newY + popoverRect.height > viewportHeight) {
            newY = viewportHeight - popoverRect.height - 25;
          }

          // Set the adjusted position
          setPopoverPosition({ x: newX, y: newY });
        }
      };

      // Use requestAnimationFrame to ensure it runs after render
      requestAnimationFrame(handlePositioning);

      // Optional: handle resize to adjust the position
      window.addEventListener("resize", handlePositioning);
      return () => window.removeEventListener("resize", handlePositioning);
    }
  }, [open, position]);

  return (
      <Popover
        id="row-popover-menu"
        open={open}
        autoAdjustOverflow
        placement=""
        showArrow={false}
        zIndex={1}
        content={
          <Menu
            theme={theme}
            items={items}
            onClick={onMenuItemClick}
            selectable={false}
          />
        }
        overlayStyle={{
          position: "fixed",
          top: popoverPosition.y,
          left: popoverPosition.x,
        }}
      />
  );
};

export default RowContextMenu;
