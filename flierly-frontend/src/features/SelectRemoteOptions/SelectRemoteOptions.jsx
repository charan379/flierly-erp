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
  const [abortController, setAbortController] = useState(null); // Manage AbortController for canceling requests
  const fetchRef = useRef(0);                      // Reference to track async requests
  const loadingTimeoutRef = useRef(null);          // Reference to manage loading timeout

  // Function to load options based on the input value
  const loadOptions = (value) => {
    fetchRef.current += 1;                        // Increment fetch reference for uniqueness
    const fetchId = fetchRef.current;             // Capture current fetch reference

    // Cancel any previous requests when starting a new one
    if (abortController) {
      abortController.abort();  // Cancel previous request
    }

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    // Show the loading spinner if fetching takes more than 200ms
    loadingTimeoutRef.current = setTimeout(() => {
      setFetching(true);
    }, 200);

    asyncOptionsFetcher(value, newAbortController.signal)
      .then((newOptions) => {
        // Ensure we are still handling the latest request
        if (fetchId !== fetchRef.current) return;

        setOptions(newOptions);                   // Update options state
      })
      .catch(() => {
        // Handle fetch errors silently (no error state)
      })
      .finally(() => {
        clearTimeout(loadingTimeoutRef.current);  // Clear the loading timeout
        setFetching(false);                       // Hide loading state
      });
  };

  // Debounce the search input to delay API calls and avoid over-fetching
  const debounceFetcher = debounce(loadOptions, debounceTimeout);

  // Initial fetch on component mount
  useEffect(() => {
    loadOptions("");  // Fetch options with an empty search input initially

    return () => {
      // Clean up timeouts
      clearTimeout(loadingTimeoutRef.current);
      if (abortController) {
        abortController.abort(); // Cancel any ongoing request when component unmounts
      }
    };
  }, []);

  // Fetch on focus without debounce
  const handleFocus = () => {
    loadOptions(""); // Fetch options directly without debounce on focus
  };

  // Prepare options for dropdown, including loader if fetching
  const displayedOptions = fetching ? [{ label: <Loader />, disabled: true }, ...options] : options;

  return (
    <Select
      filterOption={false}                        // Disable default filtering (remote fetch)
      popupClassName="select-remote-options"      // Custom class for the dropdown
      getPopupContainer={(triggerNode) => triggerNode.parentNode} // Ensure dropdown renders within parent
      showSearch                                 // Enable search functionality
      onSearch={debounceFetcher}                 // Trigger debounced fetch on search
      onFocus={handleFocus}                      // Trigger immediate fetch on focus
      dropdownRender={(menu) => (
        <div style={fetching ? { pointerEvents: "none", cursor: "not-allowed" } : {}}>
          {menu}
        </div>
      )}
      options={displayedOptions}                  // Options fetched from remote source
      loading={fetching}                         // Show loading indicator while fetching
      style={{ width: props.width ?? "100%" }}   // Default width to 100% unless specified
      notFoundContent={<Empty />} // Show Create component if no options found
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
