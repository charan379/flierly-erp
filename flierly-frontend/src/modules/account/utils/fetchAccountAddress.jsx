import { lazy, Suspense } from "react"; // Import React's lazy and Suspense for code splitting
import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetchEntityRowsAsOptions"; // Import function to fetch entity options
import FormFields from "@/components/FormFields"; // Import FormFields component for rendering form fields
import { LoadingOutlined } from "@ant-design/icons"; // Import loading icon from Ant Design
import addressColumns from "@/modules/address/config/addressColumns";

// Lazy load the Create component to improve performance
const Create = lazy(() => import("@/features/SelectRemoteOptions/forms/Create")); // Lazy load Create component

/**
 * Fetch account addresses as options for a select component.
 *
 * @param {string} value - The search input value to filter options by contact name.
 * @param {AbortSignal} signal - Abort signal to cancel the fetch request if necessary.
 * @param {string} accountId - The account ID to filter addresses.
 * @returns {Promise<Array<{ label: string, value: string }>>} - A promise resolving to an array of options.
 */
const fetchAccountAddress = (value, signal, accountId) => {
  // Define filters based on the search input and account ID
  let filters = {
    contactName: { $ilike: `%${value}%` }, // Filter for contact name with case-insensitive like match
    account: accountId ? accountId : { $isNull: "" }, // Use accountId if provided, otherwise filter for null
  };

  // Fetch account addresses from the server with the specified filters
  return fetchEntityRowsAsOptions(
    "address", // Resource name to fetch
    filters, // Filters to apply when fetching addresses
    10, // Limit the number of options to fetch
    (accountAddress) => {
      // Check if any addresses were found
      if (accountAddress.length) {
        // Map the fetched addresses to the required format
        return accountAddress.map((address) => ({
          label: `${address.contactName} | ${address.line1} | ${address.contactNumber}`, // Format label for display
          value: address.id, // Use address ID as the value
        }));
      } else {
        // If no addresses are found, provide an option to create a new address
        return [
          {
            label: (
              <Suspense fallback={<LoadingOutlined spin />}> {/* Fallback loading indicator while Create is loading */}
                <Create
                  entity="address" // Specify the entity type
                  formFields={
                    <FormFields
                      configKey="createFormConfig" // Pass the form fields configuration
                      columns={addressColumns}
                    />
                  }
                  title="add_address" // Title for the Create modal
                  initialValues={{ account: accountId }} // Initial values for the form
                  permissionCode={/address\.create/}
                />
              </Suspense>
            ),
            disabled: true, // Disable the create option until the component is fully loaded
          },
        ];
      }
    },
    signal // Pass the abort signal to fetchEntityRowsAsOptions
  );
};

export default fetchAccountAddress; // Export the fetch function for use in other components
