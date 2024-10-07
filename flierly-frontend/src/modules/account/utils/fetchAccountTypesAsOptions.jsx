import { lazy, Suspense } from "react"; // Import React's lazy and Suspense for code splitting
import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetchEntityRowsAsOptions"; // Import function to fetch entity options
import accountTypeColumns from "../config/accountTypeColumns"; // Import configuration for account type form fields
import FormFields from "@/components/FormFields"; // Import FormFields component for rendering form fields
import { LoadingOutlined } from "@ant-design/icons"; // Import loading icon from Ant Design

// Lazy load the Create component to improve performance
const Create = lazy(() => import("@/features/SelectRemoteOptions/forms/Create"));

/**
 * Fetch account types as options for a select component.
 *
 * @param {string} value - The search input value to filter options.
 * @param {AbortSignal} signal - Abort signal to cancel the fetch request if necessary.
 * @returns {Promise<Array<{ label: string, value: string }>>} - A promise resolving to an array of options.
 */
const fetchAccountTypesAsOptions = (value, signal) => {
  let filters = {};

  // Check if there is a search value and set the filter accordingly
  if (value) {
    filters = { name: { $ilike: `%${value}%` } };
  }

  // Fetch account types from the server with the specified filters
  return fetchEntityRowsAsOptions(
    "account-type", // Resource name to fetch
    filters, // Filters for fetching account types
    10, // Limit the number of options to fetch
    (accountTypes) => {
      // Check if any account types were found
      if (accountTypes.length) {
        // If account types are found, map them to the required format
        return accountTypes.map((acType) => ({
          label: acType.name,
          value: acType.id,
        }));
      } else {
        // If no account types are found, provide an option to create a new account type
        return [
          {
            label: (
              <Suspense fallback={<LoadingOutlined spin />}> {/* Fallback loading indicator while Create is loading */}
                <Create
                  entity="account-type" // Specify the entity type
                  formFields={ // Pass the form fields configuration
                    <FormFields
                      configKey="createFormConfig"
                      columns={accountTypeColumns} // Columns configuration for the form
                    />
                  }
                  title="add_account_type" // Title for the Create modal
                  initialValues={{}} // Initial values for the form (if any)
                  permissionCode={/account-type\.create/}
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

export default fetchAccountTypesAsOptions; // Export the fetch function for use in other components
