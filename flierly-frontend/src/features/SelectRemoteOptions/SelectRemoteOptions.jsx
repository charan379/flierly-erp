import debounce from "@/utils/debounce";
import { Empty, Flex, Select, Spin } from "antd";
import React, { useRef, useState, useEffect } from "react";

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
  const loadingTimeoutRef = useRef(null);          // Reference to manage loading timeout

  // Function to load options based on the input value
  const loadOptions = (value) => {
    fetchRef.current += 1;                        // Increment fetch reference for uniqueness
    const fetchId = fetchRef.current;             // Capture current fetch reference

    // Start a timeout for 200ms to show the loader
    loadingTimeoutRef.current = setTimeout(() => {
      setFetching(true); // Show loader if fetching takes longer than 200ms
    }, 50);

    asyncOptionsFetcher(value)
      .then((newOptions) => {
        if (fetchId !== fetchRef.current) return; // Ignore if it's an outdated fetch
        setOptions(newOptions);                   // Set the new options if fetch is valid
      })
      .finally(() => {
        clearTimeout(loadingTimeoutRef.current);  // Clear the loading timeout
        setFetching(false);                       // Hide loading state immediately after fetching
      });
  };

  // Debounce the search input to delay API calls and avoid over-fetching
  const debounceFetcher = debounce(loadOptions, debounceTimeout);

  // Initial fetch on component mount (or when no options are loaded)
  useEffect(() => {
    if (options.length === 0) {
      loadOptions("");  // Fetch options with an empty search input initially
    }
  }, [options.length]);

  // Prepare options for dropdown, including loader if fetching
  const displayedOptions = fetching ? [...options, { label: <Loader />, disabled: true }] : options;

  return (
    <Select
      filterOption={false}                        // Disable default filtering (remote fetch)
      popupClassName="select-remote-options"      // Custom class for the dropdown
      getPopupContainer={(triggerNode) => triggerNode.parentNode} // Ensure dropdown renders within parent
      showSearch                                 // Enable search functionality
      onSearch={debounceFetcher}                 // Trigger debounced fetch on search
      onFocus={() => {                           // Fetch on focus without debounce
        loadOptions("");                          // Fetch options directly without debounce
      }}
      dropdownRender={(menu) => (
        <div style={fetching ? { pointerEvents: "none", cursor: "not-allowed" } : {}}>
          {menu}
        </div>
      )}
      options={displayedOptions}                  // Options fetched from remote source
      loading={fetching}                         // Show loading indicator while fetching
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
    <Spin size="small" />
  </Flex>
);

export default SelectRemoteOptions;
