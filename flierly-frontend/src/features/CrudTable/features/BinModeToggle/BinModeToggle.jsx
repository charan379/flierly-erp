import debounce from "@/utils/debounce";
import { Switch, Tooltip } from "antd";
import React, { useEffect, useCallback } from "react";

const BinModeToggle = ({ actions, isActive, activate, deactivate, render }) => {
  if (!render) return;
  
  const handleChange = useCallback(
    (checked) => (checked ? activate() : deactivate()),
    [activate, deactivate]
  );

  const debouncedReload = debounce(() => {
    if (actions) {
      actions.reset();
      actions.reload();
    }
  }, 350); // Adjust the debounce delay as needed

  useEffect(() => {
    debouncedReload(); // Call the debounced function when isActive changes
  }, [isActive]);

  return (
    <Tooltip title="Toggle Bin Mode">
      <Switch checked={isActive} onChange={handleChange} />
    </Tooltip>
  );
};

export default BinModeToggle;
