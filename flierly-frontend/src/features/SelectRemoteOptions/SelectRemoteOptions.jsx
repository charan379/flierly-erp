import debounce from "@/utils/debounce";
import { Empty, Flex, Select, Spin } from "antd";
import React, { useRef, useState, useEffect } from "react";

/**
 * SelectRemoteOptions Component
 *
 * A Select component that fetches its options asynchronously with debouncing
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
  const [fetching, setFetching] = useState(true);  // Start with fetching true to show loading on mount
  const [options, setOptions] = useState([]);       // Options state
  const abortControllerRef = useRef(null);          // AbortController reference
  const fetchIdRef = useRef(0);                     // Unique fetch request ID
  const loadingTimeoutRef = useRef(null);           // Loading timeout reference

  // Function to load options based on input value
  const loadOptions = (value) => {
    fetchIdRef.current += 1;
    const fetchId = fetchIdRef.current;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();           // Abort any previous ongoing request
    }

    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;

    // Set loading state after 50ms to avoid flashing
    loadingTimeoutRef.current = setTimeout(() => setFetching(true), 50);

    asyncOptionsFetcher(value, newAbortController.signal)
      .then((newOptions) => {
        if (fetchId === fetchIdRef.current) {
          setOptions(newOptions);                  // Update options if it's the latest request
        }
      })
      .catch(() => { /* Handle errors silently */ })
      .finally(() => {
        clearTimeout(loadingTimeoutRef.current);    // Clear loading timeout
        setFetching(false);                         // Hide loading spinner
      });
  };

  // Debounced fetch for searching
  const debounceFetcher = debounce(loadOptions, debounceTimeout);

  // Fetch options on mount (with empty search input)
  useEffect(() => {
    loadOptions("");  // Fetch initial options

    return () => {
      clearTimeout(loadingTimeoutRef.current);       // Clean up on unmount
      abortControllerRef.current?.abort();           // Abort any ongoing requests
    };
  }, []);

  // Fetch options on every focus, regardless of whether it's refocused
  const handleFocus = () => {
    loadOptions("");  // Fetch options on focus
  };

  // Prepare displayed options including loader if fetching
  const displayedOptions = fetching
    ? [{ label: <Loader />, disabled: true }]        // Show loader while fetching
    : options;

  return (
    <Select
      filterOption={false}                        // Disable built-in filtering
      popupClassName="select-remote-options"      // Custom popup class
      getPopupContainer={(triggerNode) => triggerNode.parentNode}
      showSearch                                 // Enable search functionality
      onSearch={debounceFetcher}                 // Debounced search fetch
      onFocus={handleFocus}                      // Fetch options on every focus
      options={displayedOptions}                 // Fetched options
      loading={fetching}                         // Show loading spinner
      style={{ width: props.width ?? "100%" }}   // Default width to 100%
      notFoundContent={fetching ? <Loader /> : <Empty />} // Show loader if fetching, else Empty
      maxTagCount="responsive"                   // Responsive tags in multi-select
      {...props}                                 // Spread additional props to Select
    />
  );
};

/**
 * Loader Component
 *
 * A simple loader component with a spinner for async operations.
 */
const Loader = () => (
  <Flex align="center" justify="center">
    <Spin size="small" />
  </Flex>
);

export default SelectRemoteOptions;
