import { lazy, Suspense } from "react"; // Import React's lazy and Suspense for code splitting
import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetchEntityRowsAsOptions"; // Import function to fetch entity options
import FormFields from "@/components/FormFields"; // Import FormFields component for rendering form fields
import { LoadingOutlined } from "@ant-design/icons"; // Import loading icon from Ant Design
import branchColumns from "@/modules/branch/config/branchColumns";

// Lazy load the Create component to improve performance
const Create = lazy(() =>
  import("@/features/SelectRemoteOptions/forms/Create")
); // Lazy load Create component

const fetchBranchesAsOptions = (value, signal) => {
  let filters = {name: {$ilike: `%${value}%`}};

  return fetchEntityRowsAsOptions(
    "branch", // Resource name to fetch
    filters, // Filters to apply when fetching
    10, // Limit the number of options to fetch
    (branchs) => {
      if (branchs.length) {
        return branchs.map((branch) => ({
          label: `${branch.name}`, // Format label for display
          value: branch.id, // Use branch ID as the value
        }));
      } else {
        // If no branchs are found, provide an option to create a new enity
        return [
          {
            label: (
              <Suspense fallback={<LoadingOutlined spin />}>
                {" "}
                {/* Fallback loading indicator while Create is loading */}
                <Create
                  entity="branch" // Specify the entity type
                  formFields={
                    <FormFields
                      configKey="createFormConfig" // Pass the form fields configuration
                      columns={branchColumns}
                    />
                  }
                  title="add_branch" // Title for the Create modal
                  initialValues={{}} // Initial values for the form
                  permissionCode={/branch\.create/}
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

export default fetchBranchesAsOptions; // Export the fetch function for use in other components
