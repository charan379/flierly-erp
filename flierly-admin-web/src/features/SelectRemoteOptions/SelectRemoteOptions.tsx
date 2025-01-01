import React, { useRef, useState, useEffect, useCallback } from 'react';
import debounce from '@/utils/debounce';
import { Empty, FormInstance, Select, Spin } from 'antd';
import Create from './forms/Create/Create';
import { FormFieldConfig } from '@/components/FormField';

export interface SelectRemoteOptionsProps {
  asyncOptionsFetcher: (
    value: string,
    signal?: AbortSignal
  ) => Promise<Array<{ label: string | JSX.Element; value: string }>>;
  debounceTimeout?: number;
  width?: string | number;
  optionCreatorConfig?: {
    onCreateSuccessSetValue: (result: Record<string, any>) => string;
    onCreateSuccessSearchKeyword: (result: Record<string, any>) => string;
    entity: string;
    formFields: FormFieldConfig[];
    title: string;
    permissionCode: RegExp;
  };
  name: FormFieldConfig<any>['name'];
  formInstance?: FormInstance<any>;
  [key: string]: any; // Additional props passed to Select
}

const SelectRemoteOptions: React.FC<SelectRemoteOptionsProps> = ({
  asyncOptionsFetcher,
  debounceTimeout = 500,
  width = '100%',
  optionCreatorConfig,
  formInstance,
  name,
  ...props
}) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<{ label: string | JSX.Element; value: string }[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
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

  const debounceFetcher = useCallback(debounce(loadOptions, debounceTimeout), [loadOptions, debounceTimeout]);

  useEffect(() => {
    loadOptions(''); // Initial load

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [loadOptions, name]);


  const onCreateSuccess = (result: Record<string, any> | null) => {
    if (optionCreatorConfig && result) {
      const value = optionCreatorConfig.onCreateSuccessSetValue(result);
      setSearchValue(optionCreatorConfig.onCreateSuccessSearchKeyword(result));
      loadOptions(searchValue);// Load options based on the result
      if (formInstance) {
        formInstance.setFieldValue(name, value);
      };
    }
  };

  return (
    <Select
      {...props}
      filterOption={false}
      showSearch
      placeholder="Please select"
      options={fetching ? [] : options}
      notFoundContent={fetching ? <Spin size="small" /> : <Empty />}
      dropdownRender={(menu) => {
        return <>
          {menu}
          {optionCreatorConfig && <Create entity={optionCreatorConfig.entity} onCreateSuccess={onCreateSuccess} formFields={optionCreatorConfig.formFields} title={optionCreatorConfig.title} permissionCode={optionCreatorConfig.permissionCode} />}
        </>
      }}
      onSearch={handleSearch}
      style={{ width }}
      dropdownStyle={{ textAlign: 'left' }}
      loading={fetching}
      searchValue={searchValue}
    />
  );
};

export default SelectRemoteOptions;