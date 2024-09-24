import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Flex, Menu, Popover, Tooltip, Typography } from "antd";
import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faEye,
  faPenToSquare,
  faTrashCan,
  faTrashCanArrowUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import useTheme from "@/features/Theme/hooks/useTheme";
import useLocale from "@/features/Language/hooks/useLocale";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useOnOutsideClick } from "@/hooks/useOnOutSideClick";
import crudService from "../../service/crud.service";

const RowContextMenu = ({
  entity,
  actions,
  record,
  recordTitleKey,
  open,
  position,
  close,
  render,
}) => {
  if (!render) return;

  const { theme } = useTheme();
  const { translate } = useLocale();
  const [popoverPosition, setPopoverPosition] = useState(position);
  const [countdown, setCountdown] = useState(30); // Start with 30 seconds

  const menuItemStyle = { fontSize: "12px" };

  const items = useMemo(() => {
    const baseItems = [
      {
        label: translate("view"),
        key: "view",
        icon: <FontAwesomeIcon icon={faEye} style={menuItemStyle} />,
        style: { color: "#2196F3", ...menuItemStyle },
      },
      {
        label: translate("edit"),
        key: "edit",
        icon: <FontAwesomeIcon icon={faPenToSquare} style={menuItemStyle} />,
        style: { color: "#FF9800", ...menuItemStyle },
      },
      record?.isActive
        ? {
          label: translate("inactivate"),
          key: "inactivate",
          icon: <StopOutlined style={menuItemStyle} />,
          style: { color: "#9E9E9E", ...menuItemStyle },
        }
        : {
          label: translate("activate"),
          key: "activate",
          icon: <CheckCircleOutlined style={menuItemStyle} />,
          style: { color: "#4CAF50", ...menuItemStyle },
        },
      {
        label: translate("delete"),
        key: "delete",
        icon: <FontAwesomeIcon icon={faTrashCan} style={menuItemStyle} />,
        danger: true,
      },
      {
        label: translate("restore"),
        key: "restore",
        icon: (
          <FontAwesomeIcon icon={faTrashCanArrowUp} style={menuItemStyle} />
        ),
        style: { color: "#009688", ...menuItemStyle },
      },
      {
        label: `${translate("close")} (${translate(
          "auto_close_in"
        )} ${countdown}s)`,
        key: "close",
        icon: <FontAwesomeIcon icon={faCircleXmark} style={menuItemStyle} />,
        danger: true,
      },
    ];
    return baseItems;
  }, [record, translate, countdown]);

  const onMenuItemClick = useCallback(
    async ({ key }) => {
      let result = {};
      switch (key) {
        case "activate":
          result = await crudService.activate({
            entity,
            ids: [record?.id]
          });
          break;
        case "inactivate":
          result = await crudService.deactivate({
            entity,
            ids: [record?.id]
          });
          break;
        case "delete":
          result = await crudService.delete({
            entity,
            ids: [record?.id]
          });
          break;
        case "restore":
          result = await crudService.restore({
            entity,
            ids: [record?.id]
          });
          break;
        case "close":
          close();
          break;
        default:
          result = {};
          break;
      }

      if (result?.success) {
        actions.reload();
        close();
      }
    },
    [entity, record, actions, close]
  );

  // Use escape key to close the menu
  useEscapeKey(close);

  // Close the menu when clicking outside
  useOnOutsideClick(
    "row-popover-menu",
    useCallback(() => close(), [close])
  );

  // Timer countdown logic with cleanup
  useEffect(() => {
    let timer;

    if (open) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            close();
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
        setCountdown(30);
      } // Cleanup the timer
    };
  }, [open]);

  // Adjust position logic with cleanup
  useEffect(() => {
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

    if (open) {
      requestAnimationFrame(handlePositioning);
      window.addEventListener("resize", handlePositioning);
    }

    return () => {
      window.removeEventListener("resize", handlePositioning); // Cleanup the event listener
    };
  }, [open, position]);

  return (
    <Popover
      id="row-popover-menu"
      title={
        <Flex justify="space-between" align="center" wrap="nowrap" gap="large">
          <Typography.Text>
            {record[recordTitleKey] ?? translate("row_menu")}
          </Typography.Text>
          <Tooltip title={translate("close_menu")}>
            <Button
              shape="default"
              danger
              icon={<FontAwesomeIcon icon={faXmark} size="2xl" />}
              onClick={close}
            />
          </Tooltip>
        </Flex>
      }
      open={open}
      autoAdjustOverflow
      showArrow={false}
      zIndex={1}
      arrow={false}
      destroyTooltipOnHide={true}
      content={
        <div>
          <Menu
            theme={theme}
            items={items}
            onClick={onMenuItemClick}
            selectable={false}
          />
        </div>
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
