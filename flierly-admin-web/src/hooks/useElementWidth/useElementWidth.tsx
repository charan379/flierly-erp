import debounce from '@/utils/debounce'
import throttle from '@/utils/throttle'
import { useState, useEffect, useRef } from 'react'

const useElementWidth = <T extends HTMLElement>(throttleLimit = 200, debounceDelay = 50) => {
  const ref = useRef<T>(null) // Generic ref to support any HTMLElement type
  const [width, setWidth] = useState<number>(0)

  // Throttled or Debounced width update function
  const updateWidth = throttle(
    debounce(() => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth) // Update width on element resize
      }
    }, debounceDelay),
    throttleLimit,
  )

  useEffect(() => {
    const element = ref.current

    if (!element) {
      setWidth(0) // Set to 0 if no element is available
      return
    }

    const resizeObserver = new ResizeObserver(updateWidth)

    resizeObserver.observe(element) // Start observing the element for resize events
    updateWidth() // Initialize the width when the element becomes available

    return () => {
      resizeObserver.disconnect() // Cleanup observer when component unmounts
    }
  }, [updateWidth]) // Only re-run effect if updateWidth changes

  return { ref, width }
}

export default useElementWidth
