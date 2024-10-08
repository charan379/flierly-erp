import { lazy, Suspense } from "react"; // Import React's lazy and Suspense for code splitting
import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetchEntityRowsAsOptions"; // Import function to fetch entity options
import FormFields from "@/components/FormFields"; // Import FormFields component for rendering form fields
import { LoadingOutlined } from "@ant-design/icons"; // Import loading icon from Ant Design
import taxIdentityColumns from "@/modules/taxation/config/taxIdentityColumns";

// Lazy load the Create component to improve performance
const Create = lazy(() =>
  import("@/features/SelectRemoteOptions/forms/Create")
); // Lazy load Create component

const fetchTaxIdentitiesAsOptions = (value, signal) => {
  let filters = {};
  if (value && typeof value == "number") {
    filters = { id: value };
  }

  return fetchEntityRowsAsOptions(
    "tax-identity", // Resource name to fetch
    filters, // Filters to apply when fetching
    10, // Limit the number of options to fetch
    (taxIdentities) => {
      if (taxIdentities.length) {
        return taxIdentities.map((taxIdentity) => ({
          label: `${taxIdentity.gstNumber} | ${taxIdentity.pan}`, // Format label for display
          value: taxIdentity.id, // Use tax ID as the value
        }));
      } else {
        // If no tax identities are found, provide an option to create a new enity
        return [
          {
            label: (
              <Suspense fallback={<LoadingOutlined spin />}>
                {" "}
                {/* Fallback loading indicator while Create is loading */}
                <Create
                  entity="tax-identity" // Specify the entity type
                  formFields={
                    <FormFields
                      configKey="createFormConfig" // Pass the form fields configuration
                      columns={taxIdentityColumns}
                    />
                  }
                  title="add_tax_identity" // Title for the Create modal
                  initialValues={{}} // Initial values for the form
                  permissionCode={/tax-identity\.create/}
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

export default fetchTaxIdentitiesAsOptions; // Export the fetch function for use in other components
