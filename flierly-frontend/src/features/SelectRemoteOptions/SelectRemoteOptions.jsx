import debounce from "@/utils/debounce";
import { Empty, Flex, Select, Spin } from "antd";
import React, { useMemo, useRef, useState, useEffect } from "react";

const SelectRemoteOptions = ({
  asyncOptionsFetcher,
  debounceTimeout = 500,
  width,
  allowClear,
  ...props
}) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);

  // Memoized debounce function
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setFetching(true);
      asyncOptionsFetcher(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) return;
        setOptions(newOptions);
      }).finally(() => {
        setFetching(false);
      })
    };
    return debounce(loadOptions, debounceTimeout);
  }, [asyncOptionsFetcher, debounceTimeout]);

  // Initial fetch on component mount
  useEffect(() => {
    if (options.length <= 0) {
      debounceFetcher("");
    }
  }, [debounceFetcher]);

  return (
    <Select
      allowClear={allowClear}
      filterOption={false}
      showSearch
      onSearch={debounceFetcher}
      onFocus={() => {
        if (options.length <= 0) {
          debounceFetcher("");
        }
      }}
      options={options}
      loading={fetching}
      dropdownRender={(menu) => {
        return fetching ? <Loader /> : menu;
      }}
      style={{ width: width ?? "100%" }}
      notFoundContent={<Empty />}
      maxTagCount='responsive'
      {...props}
    />
  );
};

const Loader = () => {
  return (
    <Flex align="center" justify="center">
      <Spin size="small" />
    </Flex>
  );
};
export default SelectRemoteOptions;
