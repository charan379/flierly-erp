import debounce from "@/utils/debounce";
import { Empty, Flex, Select, Spin } from "antd";
import React, { useMemo, useRef, useState, useEffect } from "react";

/**
 * SelectRemoteOptions Component
 * 
 * A Select component that fetches its options asynchronously, with debouncing
 * to optimize remote API calls. It supports search and displays a loader during fetch.
 * 
 * @param {function} asyncOptionsFetcher - Function to fetch options based on search input.
 * @param {number} debounceTimeout - Delay time for debouncing search input (default: 500ms).
 * @param {object} props - Other Select component props.
 */
const SelectRemoteOptions = ({
  asyncOptionsFetcher,
  debounceTimeout = 500,
  ...props
}) => {
  const [fetching, setFetching] = useState(false); // State for loading indicator
  const [options, setOptions] = useState([]);      // State for storing fetched options
  const fetchRef = useRef(0);                      // Reference to track async requests

  // Debounce the fetcher function to delay API calls and avoid over-fetching
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;                       // Increment fetch reference for uniqueness
      const fetchId = fetchRef.current;            // Capture current fetch reference
      setFetching(true);                           // Set loading state to true

      asyncOptionsFetcher(value)
        .then((newOptions) => {
          if (fetchId !== fetchRef.current) return; // Ignore if it's an outdated fetch
          setOptions(newOptions);                  // Set the new options if fetch is valid
        })
        .finally(() => {
          setFetching(false);                      // Turn off loading state
        });
    };
    return debounce(loadOptions, debounceTimeout);  // Debounced function to delay fetch
  }, [asyncOptionsFetcher, debounceTimeout]);

  // Initial fetch on component mount (or when no options are loaded)
  useEffect(() => {
    if (options.length === 0) {
      debounceFetcher("");  // Fetch options with an empty search input initially
    }
  }, [debounceFetcher]);

  return (
    <Select
      filterOption={false}                        // Disable default filtering (remote fetch)
      popupClassName="select-remote-options"      // Custom class for the dropdown
      getPopupContainer={(triggerNode) => triggerNode.parentNode} // Ensure dropdown renders within parent
      showSearch                                 // Enable search functionality
      onSearch={debounceFetcher}                 // Trigger debounced fetch on search
      onFocus={() => {                           // Fetch on focus if no options are loaded
        if (options.length === 0) {
          debounceFetcher("");
        }
      }}
      options={options}                          // Options fetched from remote source
      loading={fetching}                         // Show loading indicator while fetching
      dropdownRender={(menu) => (fetching ? <Loader /> : menu)} // Show loader or options
      style={{ width: props.width ?? "100%" }}   // Default width to 100% unless specified
      notFoundContent={<Empty />}                // Show empty content if no options are found
      maxTagCount="responsive"                   // Make tags responsive when multi-selecting
      {...props}                                 // Spread any other props to Select component
    />
  );
};

/**
 * Loader Component
 * 
 * A simple loader component used to display a spinner during async operations.
 */
const Loader = () => (
  <Flex align="center" justify="center">
    <Spin size="small" />                         // Ant Design spinner for loading indicator
  </Flex>
);

export default SelectRemoteOptions;
