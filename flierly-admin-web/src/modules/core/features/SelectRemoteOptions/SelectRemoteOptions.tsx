import React, { useRef, useState, useEffect, useCallback } from 'react';
import debounce from '@/modules/core/utils/debounce';
import { Empty, FormInstance, Select, Spin } from 'antd';
import Create from './forms/Create/Create';
import Loading from '@/modules/core/components/Loading';

export interface SelectRemoteOptionsProps<T> {
  asyncOptionsFetcher: (
    value: string | "focus",
    signal?: AbortSignal
  ) => Promise<Array<{ label: string | JSX.Element; value: string }>>;
  debounceTimeout?: number;
  width?: string | number;
  disabled?: boolean;
  allowClear?: boolean;
  optionCreatorConfig?: {
    onCreateSuccess: (
      result: T,
      appendOptions: React.Dispatch<React.SetStateAction<{
        label: string | JSX.Element;
        value: string;
      }[]>>) => void;
    entity: string;
    formFields: React.ReactNode;
    formInstance?: FormInstance<T>;
    formInitialValues?: Partial<Record<keyof T, any>>,
    title?: string;
    permissionCode: RegExp;
  };
  name?: keyof any;
  [key: string]: any; // Additional props passed to Select
}

const SelectRemoteOptions = <T,>({
  asyncOptionsFetcher,
  debounceTimeout = 500,
  width = '100%',
  optionCreatorConfig,
  name,
  disabled,
  allowClear,
  ...props
}: SelectRemoteOptionsProps<T>) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<{ label: string | JSX.Element; value: string }[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  const handleSearch = (value: string) => {
    debounceFetcher(value);
  };

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

  const handleFocus = () => loadOptions('focus');

  useEffect(() => {
    loadOptions(''); // Initial load
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [loadOptions, name, optionCreatorConfig, asyncOptionsFetcher]);

  const handleCreateSuccess = (result: T | null) => {
    if (optionCreatorConfig && result) {
      optionCreatorConfig.onCreateSuccess(result, setOptions);
    }
  };

  return (
    <Select
      {...props}
      filterOption={false}
      showSearch
      disabled={disabled}
      autoClearSearchValue={false}
      placeholder="Please select"
      options={options}
      allowClear={allowClear}
      notFoundContent={fetching ? <Spin size="small" /> : <Empty />}
      dropdownRender={(menu) => {
        return (
          <Loading isLoading={fetching}>
            {menu}
            {optionCreatorConfig &&
              <Create
                formInstance={optionCreatorConfig.formInstance}
                entity={optionCreatorConfig.entity}
                onCreate={handleCreateSuccess}
                formFields={optionCreatorConfig.formFields}
                title={optionCreatorConfig.title}
                initialValues={optionCreatorConfig?.formInitialValues}
                permissionCode={optionCreatorConfig.permissionCode}
              />}
          </Loading>
        )
      }}
      onSearch={handleSearch}
      style={{ width }}
      dropdownStyle={{ textAlign: 'left' }}
      onFocus={handleFocus}
      {...(fetching ? { suffixIcon: <Spin spinning size='small' /> } : {})}
    />
  );
};

export default SelectRemoteOptions;