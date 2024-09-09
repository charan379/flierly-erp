import debounce from "@/utils/debounce";
import { Empty, Flex, Select, Spin } from "antd";
import React, { useMemo, useRef, useState } from "react";

const SelectRemoteOptions = ({
  asyncOptionsFetcher,
  debounceTimeout = 500,
  ...props
}) => {
  const [fetching, setFetching] = useState(true);
  const [options, setOptions] = useState([]);

  const fetchRef = useRef(0);

  // Memoized debounce function
  const debounceFetcher = useMemo(() => {
    // Debounced loadOptions function
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]); // Clear previous options
      setFetching(true);
      asyncOptionsFetcher(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // Skip if outdated fetch
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [asyncOptionsFetcher, debounceTimeout]);

  return (
    <Select
      allowClear
      filterOption={false}
      showSearch={true}
      onSearch={debounceFetcher}
      onFocus={() => debounceFetcher("")}
      options={options}
      notFoundContent={fetching 
        ? <Flex align="center" justify="center"> <Spin size="small" /> </Flex> 
        : <Empty />}
      {...props}
    />
  );
};

export default SelectRemoteOptions;
