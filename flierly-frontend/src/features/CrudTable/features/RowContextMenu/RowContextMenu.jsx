import { useEscapeKey } from "@/hooks/useEscapeKey";
// import { useOnOutsideScroll } from "@/hooks/useOnOutsideScroll";
import useLocale from "@/features/Language/hooks/useLocale";
import {
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Menu, Popover } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import crudService from "../../service/crud.service";
import { useOnOutsideClick } from "@/hooks/useOnOutSideClick";
import useTheme from "@/features/Theme/hooks/useTheme";
import { faEye, faPenToSquare, faTrashCan, faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RowContextMenu = ({ entity, actions, record, open, position, close }) => {
  const { theme } = useTheme();

  const { translate } = useLocale();

  const [popoverPosition, setPopoverPosition] = useState(position);

  const items = [
    {
      label: translate("view"),
      key: "view",
      // disabled: true,
      icon: <FontAwesomeIcon icon={faEye} />,
      style: { color: "#2196F3" },
    },
  ];

  //   edit
  if (true) {
    items.push({
      label: translate("edit"),
      key: "edit",
      // disabled: true,
      icon: <FontAwesomeIcon icon={faPenToSquare} />,
      style: { color: "#FF9800" },
    });
  }

  // inactivate
  if (record?.isActive) {
    items.push({
      label: translate("inactivate"),
      key: "inactivate",
      icon: <StopOutlined />,
      style: { color: "#9E9E9E" },
    });
  }

  // activate
  if (!record?.isActive) {
    items.push({
      label: translate("activate"),
      key: "activate",
      icon: <CheckCircleOutlined />,
      style: { color: "#4CAF50" },
    });
  }

  //   delete
  if (true) {
    items.push({
      label: translate("delete"),
      key: "delete",
      icon: <FontAwesomeIcon icon={faTrashCan} />,
      danger: true,
    });
  }

  //   restore
  if (true) {
    items.push({
      label: translate("restore"),
      key: "restore",
      icon: <FontAwesomeIcon icon={faTrashCanArrowUp} />,
      style: { color: "#009688" },
    });
  }

  const onMenuItemClick = async ({ item, key, keyPath, domEvent }) => {
    let result = {};
    switch (key) {
      case "activate":
        result = await crudService.activate({
          entity: entity,
          action: "activate",
          docIds: [record?._id],
        });
        break;
      case "inactivate":
        result = await crudService.activate({
          entity: entity,
          action: "inactivate",
          docIds: [record?._id],
        });
        break;
      case "delete":
        result = await crudService.delete({
          entity: entity,
          docIds: [record?._id],
        });
        break;
      case "restore":
        result = await crudService.restore({
          entity: entity,
          docIds: [record?._id],
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

  // useOnOutsideScroll(
  //   "row-popover-menu",
  //   useCallback(() => {
  //     close();
  //   }, [close])
  // );

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
        top: popoverPosition?.y,
        left: popoverPosition?.x,
      }}
    />
  );
};

export default RowContextMenu;
