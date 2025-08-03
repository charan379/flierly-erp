import { useEffect, useState } from 'react'
import isBrowser from '@/modules/core/utils/is-browser'

// Type for responsive configuration
interface ResponsiveConfig {
  [key: string]: number
}

// Type for screen size information
interface ScreenInfo {
  [key: string]: boolean
}

// Set to store all subscribers
const subscribers = new Set<() => void>()

// Information about the current screen size
let info: ScreenInfo = {}

// Default configuration for different screen sizes
let responsiveConfig: ResponsiveConfig = {
  xs: 0,
  sm: 576,
  isMobile: 768,
  md: 768,
  lg: 992,
  xl: 1200,
}

/**
 * Handle window resize events.
 * Recalculates the screen size information and notifies all subscribers if it has changed.
 */
function handleResize(): void {
  const oldInfo = { ...info }
  calculate()
  if (JSON.stringify(oldInfo) === JSON.stringify(info)) return
  for (const subscriber of subscribers) {
    subscriber()
  }
}

/**
 * Flag to indicate if we are currently listening for resize events.
 */
let listening = false

/**
 * Calculate the current screen size information based on the window width and the responsiveConfig.
 */
function calculate(): void {
  if (!isBrowser) return

  const width = window.innerWidth
  const newInfo: ScreenInfo = {}
  let shouldUpdate = false

  for (const key of Object.keys(responsiveConfig)) {
    newInfo[key] = width >= responsiveConfig[key]
    if (newInfo[key] !== info[key]) {
      shouldUpdate = true
    }
  }

  if (shouldUpdate) {
    info = newInfo
  }
}

/**
 * Update the responsive configuration.
 * @param config - The new responsive configuration.
 */
export function configResponsive(config: ResponsiveConfig): void {
  responsiveConfig = config
  if (info) calculate()
}

/**
 * React hook to get the current screen size information.
 * @returns An object containing the current screen size information and a flag for mobile state.
 */
export default function useResponsive() {
  if (isBrowser && !listening) {
    info = {}
    calculate()
    window.addEventListener('resize', handleResize)
    listening = true
  }

  const [state, setState] = useState<ScreenInfo>(info)

  useEffect(() => {
    if (!isBrowser) return

    // Handle React 18's StrictMode causing double mount behavior
    if (!listening) {
      window.addEventListener('resize', handleResize)
    }

    const subscriber = () => {
      setState({ ...info })
    }

    subscribers.add(subscriber)

    return () => {
      subscribers.delete(subscriber)
      if (subscribers.size === 0) {
        window.removeEventListener('resize', handleResize)
        listening = false
      }
    }
  }, [])

  return { screenSize: state, isMobile: !state.md }
}
