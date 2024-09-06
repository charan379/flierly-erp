import { useEscapeKey } from "@/hooks/useEscapeKey";
// import { useOnOutsideScroll } from "@/hooks/useOnOutsideScroll";
import useLocale from "@/features/Language/hooks/useLocale";
import {
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Button, Flex, Menu, Popover, Tooltip, Typography } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import crudService from "../../service/crud.service";
import { useOnOutsideClick } from "@/hooks/useOnOutSideClick";
import useTheme from "@/features/Theme/hooks/useTheme";
import { faCircleXmark, faEye, faPenToSquare, faTrashCan, faTrashCanArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RowContextMenu = ({ entity, actions, record, recordTitleKey, open, position, close }) => {
  if (!open) return;
  const { theme } = useTheme();
  const { translate } = useLocale();
  const [popoverPosition, setPopoverPosition] = useState(position);

  const menuItemStyle = { fontSize: "12px" }
  const items = useMemo(() => {
    const baseItems = [
      {
        label: translate("view"),
        key: "view",
        icon: <FontAwesomeIcon icon={faEye} style={menuItemStyle} />,
        style: { color: "#2196F3", ...menuItemStyle },
      },
    ];

    if (true) {
      baseItems.push({
        label: translate("edit"),
        key: "edit",
        icon: <FontAwesomeIcon icon={faPenToSquare} style={menuItemStyle} />,
        style: { color: "#FF9800", ...menuItemStyle },
      });
    }

    if (record?.isActive) {
      baseItems.push({
        label: translate("inactivate"),
        key: "inactivate",
        icon: <StopOutlined style={menuItemStyle} />,
        style: { color: "#9E9E9E", ...menuItemStyle },
      });
    }

    if (!record?.isActive) {
      baseItems.push({
        label: translate("activate"),
        key: "activate",
        icon: <CheckCircleOutlined style={menuItemStyle} />,
        style: { color: "#4CAF50", ...menuItemStyle },
      });
    }

    if (true) {
      baseItems.push({
        label: translate("delete"),
        key: "delete",
        icon: <FontAwesomeIcon icon={faTrashCan} style={menuItemStyle} />,
        danger: true,
        style: { ...menuItemStyle }
      });
    }

    if (true) {
      baseItems.push({
        label: translate("restore"),
        key: "restore",
        icon: <FontAwesomeIcon icon={faTrashCanArrowUp} style={menuItemStyle} />,
        style: { color: "#009688", ...menuItemStyle },
      });
    }

    if (true) {
      baseItems.push({
        label: translate("close"),
        key: "close",
        icon: <FontAwesomeIcon icon={faCircleXmark} style={menuItemStyle} />,
        danger: true,
        style: { ...menuItemStyle },
      });
    }

    return baseItems;
  }, [record]);

  const onMenuItemClick = useCallback(async ({ key }) => {
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
  }, [entity, record, actions, close]);

  useEscapeKey(close);

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
      title={
        <Flex justify="space-between" align="center" wrap="nowrap" gap="large">
          <Typography.Text>
            {record[recordTitleKey] ?? translate('row_menu')}
          </Typography.Text>
          <Tooltip title={translate('close_menu')}>
            <Button shape="default" danger icon={<FontAwesomeIcon icon={faXmark} size="2xl" />} onClick={close} />
          </Tooltip>
        </Flex>
      }
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
