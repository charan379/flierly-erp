import React, { useRef, useState, useEffect, useCallback } from 'react';
import debounce from '@/utils/debounce';
import { Empty, Select, Spin } from 'antd';

interface SelectRemoteOptionsProps {
  asyncOptionsFetcher: (
    value: string,
    signal?: AbortSignal
  ) => Promise<Array<{ label: string | JSX.Element; value: string }>>;
  debounceTimeout?: number;
  width?: string | number;
  [key: string]: any; // Additional props passed to Select
}

const SelectRemoteOptions: React.FC<SelectRemoteOptionsProps> = ({
  asyncOptionsFetcher,
  debounceTimeout = 500,
  width = '100%',
  ...props
}) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<{ label: string | JSX.Element; value: string }[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadOptions = useCallback(async (value: string) => {

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setFetching(true);

    try {
      const newOptions = await asyncOptionsFetcher(value, controller.signal);
      setOptions(newOptions);
    } catch {
      // Handle errors if necessary
    } finally {
      setFetching(false);
    }
  }, [asyncOptionsFetcher]);

  const debounceFetcher = debounce(loadOptions, debounceTimeout);

  useEffect(() => {
    loadOptions(''); // Initial load
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [loadOptions]);

  return (
    <Select
      {...props}
      filterOption={false}
      showSearch
      placeholder="Please select"
      options={fetching ? [] : options}
      notFoundContent={fetching ? <Spin size="small" /> : <Empty />}
      onSearch={debounceFetcher}
      // onFocus={() => loadOptions('')}
      style={{ width }}
      dropdownStyle={{ textAlign: 'left' }}
      loading={fetching}
    />
  );
};

export default SelectRemoteOptions;