import debounce from '@/modules/core/utils/debounce'
import { Button, Tooltip } from 'antd'
import React, { useEffect, useCallback } from 'react'
import { ActionType } from '@ant-design/pro-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRecycle } from '@fortawesome/free-solid-svg-icons'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'

type BinModeToggleProps = {
  actions: ActionType | undefined
  isActive: boolean // Current state of the toggle
  activate: () => void // Function to activate bin mode
  deactivate: () => void // Function to deactivate bin mode
  render: boolean // Whether to render the component
}

const BinModeToggle: React.FC<BinModeToggleProps> = ({ actions, isActive, activate, deactivate, render }) => {

  const { translate: t } = useLocale();

  const handleToggle = useCallback(() => {
    if (isActive) {
      deactivate()
    } else {
      activate()
    }
  }, [isActive, activate, deactivate])

  const debouncedReload = debounce(() => {
    if (actions) {
      actions.reset?.() // Safely call reset if it exists
      actions.reload?.() // Safely call reload if it exists
    }
  }, 100) // Adjust the debounce delay as needed

  useEffect(() => {
    debouncedReload() // Call the debounced function when isActive changes
  }, [isActive])

  if (!render) return null

  return (
    <Tooltip title={!isActive ? t('tooltip.activate_bin_mode') : t('tooltip.deactivate_bin_mode')}>
      <Button
        type={!isActive ? 'default' : 'primary'} // Change button style based on state
        key="bin-mode-toggle"
        shape="circle"
        danger
        size="small"
        icon={<FontAwesomeIcon icon={faRecycle} />}
        onClick={handleToggle}
      />
    </Tooltip>
  )
}

export default BinModeToggle
