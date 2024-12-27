import React, { useRef, useState, useEffect } from 'react'
import debounce from '@/utils/debounce'
import { Empty, Select, SelectProps, Spin } from 'antd'

interface SelectRemoteOptionsProps {
  asyncOptionsFetcher: (
    value: string,
    signal?: AbortSignal
  ) => Promise<Array<{ label: string | JSX.Element; value: string }>>
  debounceTimeout?: number
  width?: string | number
  mode?: SelectProps['mode']
  onChange?: SelectProps['onChange']
  value?: any
  [key: string]: any // Additional props passed to Select
}

interface Option {
  label: string | JSX.Element
  value: string
}

const SelectRemoteOptions: React.FC<SelectRemoteOptionsProps> = ({
  asyncOptionsFetcher,
  debounceTimeout = 500,
  width = '100%',
  ...props
}) => {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState<Option[]>([])
  const abortControllerRef = useRef<AbortController | null>(null)
  const fetchIdRef = useRef(0)

  const loadOptions = async (value: string) => {
    fetchIdRef.current += 1
    const fetchId = fetchIdRef.current

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const controller = new AbortController()
    abortControllerRef.current = controller

    setFetching(true)

    try {
      const newOptions = await asyncOptionsFetcher(value, controller.signal)
      if (fetchId === fetchIdRef.current) {
        setOptions(newOptions)
      }
    } catch (_error) {
      // Handle errors (e.g., log them)
    } finally {
      setFetching(false)
    }
  }

  const debounceFetcher = debounce(loadOptions, debounceTimeout)

  useEffect(() => {
    loadOptions('') // Initial load
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  return (
    <Select
      {...props}
      filterOption={false}
      showSearch
      placeholder="Please select"
      options={fetching ? [] : options}
      notFoundContent={fetching ? <Spin size="small" /> : <Empty />}
      onSearch={debounceFetcher}
      onFocus={() => loadOptions('')}
      style={{ width }}
      dropdownStyle={{ textAlign: 'left' }}
      loading={fetching}
    />
  )
}

export default SelectRemoteOptions
