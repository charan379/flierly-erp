import { lazy, Suspense } from "react"; // Import React's lazy and Suspense for code splitting
import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetchEntityRowsAsOptions"; // Import function to fetch entity options
import accountSubtypeColumns from "../config/accountSubtypeColumns"; // Import configuration for account subtype form fields
import FormFields from "@/components/FormFields"; // Import FormFields component for rendering form fields
import { LoadingOutlined } from "@ant-design/icons"; // Import loading icon from Ant Design

// Lazy load the Create component to improve performance
const Create = lazy(() => import("@/features/SelectRemoteOptions/forms/Create"));

/**
 * Fetch account subtypes as options for a select component.
 *
 * @param {string} value - The search input value to filter options.
 * @param {AbortSignal} signal - Abort signal to cancel the fetch request if necessary.
 * @param {string|Array<string>} accTypeId - The account type ID(s) to filter subtypes.
 * @returns {Promise<Array<{ label: string, value: string }>>} - A promise resolving to an array of options.
 */
const fetchAccountSubtypesAsOptions = (value, signal, accTypeId) => {
  // Early return if accTypeId is not provided
  if (!accTypeId) return Promise.resolve([]); 

  // Fetch account subtypes from the server with the specified filters
  return fetchEntityRowsAsOptions(
    "account-subtype", // Resource name to fetch
    {
      name: { $ilike: `%${value}%` }, // Filter for name with case-insensitive like match
      accountType: {
        // Dynamic operator based on whether accTypeId is an array
        [Array.isArray(accTypeId) ? "$in" : "$equalTo"]: accTypeId,
      },
    },
    10, // Limit the number of options to fetch
    (subtypes) => {
      // Check if subtypes are found
      if (subtypes.length) {
        // If subtypes are found, map them to the required format
        return subtypes.map(({ id, name }) => ({ label: name, value: id }));
      } else {
        // If no subtypes are found, provide an option to create a new account subtype
        return [
          {
            label: (
              <Suspense fallback={<LoadingOutlined spin />}> {/* Fallback loading indicator while Create is loading */}
                <Create
                  entity="account-subtype" // Specify the entity type
                  formFields={ // Pass the form fields configuration
                    <FormFields
                      configKey="createFormConfig"
                      columns={accountSubtypeColumns} // Columns configuration for the form
                    />
                  }
                  title="add_account_subtype" // Title for the Create modal
                  initialValues={{ accountType: accTypeId }} // Initial values for the form
                  permissionCode={/account-subtype\.create/}
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

export default fetchAccountSubtypesAsOptions; // Export the fetch function for use in other components
