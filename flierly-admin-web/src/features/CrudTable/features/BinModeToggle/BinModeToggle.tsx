import debounce from '@/utils/debounce'
import { Switch, Tooltip } from 'antd'
import React, { useEffect, useCallback } from 'react'
import { ActionType } from '@ant-design/pro-components'

type BinModeToggleProps = {
  actions: ActionType | undefined
  isActive: boolean // Current state of the toggle
  activate: () => void // Function to activate bin mode
  deactivate: () => void // Function to deactivate bin mode
  render: boolean // Whether to render the component
}

const BinModeToggle: React.FC<BinModeToggleProps> = ({ actions, isActive, activate, deactivate, render }) => {
  if (!render) return null

  const handleChange = useCallback((checked: boolean) => (checked ? activate() : deactivate()), [activate, deactivate])

  const debouncedReload = debounce(() => {
    if (actions) {
      actions.reset?.() // Safely call reset if it exists
      actions.reload?.() // Safely call reload if it exists
    }
  }, 10) // Adjust the debounce delay as needed

  useEffect(() => {
    debouncedReload() // Call the debounced function when isActive changes
  }, [isActive])

  return (
    <Tooltip title="Toggle Bin Mode">
      <Switch checked={isActive} onChange={handleChange} />
    </Tooltip>
  )
}

export default BinModeToggle
