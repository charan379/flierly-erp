import { lazy, Suspense } from "react"; // Import React's lazy and Suspense for code splitting
import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetchEntityRowsAsOptions"; // Import function to fetch entity options
import FormFields from "@/components/FormFields"; // Import FormFields component for rendering form fields
import { LoadingOutlined } from "@ant-design/icons"; // Import loading icon from Ant Design
import productColumns from "../config/productColumns";

// Lazy load the Create component to improve performance
const Create = lazy(() =>
  import("@/features/SelectRemoteOptions/forms/Create")
); // Lazy load Create component

const fetchProductsAsOptions = (value, signal) => {
  let filters = { name: { $ilike: `%${value}%` } };

  return fetchEntityRowsAsOptions(
    "product", // Resource name to fetch
    filters, // Filters to apply when fetching
    10, // Limit the number of options to fetch
    (products) => {
      if (products.length) {
        return products.map((product) => ({
          label: `${product.id} | ${product.name}`, // Format label for display
          value: product.id, // Use products ID as the value
        }));
      } else {
        // If no products are found, provide an option to create a new enity
        return [
          {
            label: (
              <Suspense fallback={<LoadingOutlined spin />}>
                {" "}
                {/* Fallback loading indicator while Create is loading */}
                <Create
                  entity="product" // Specify the entity type
                  formFields={
                    <FormFields
                      configKey="createFormConfig" // Pass the form fields configuration
                      columns={productColumns}
                    />
                  }
                  title="add_product" // Title for the Create modal
                  initialValues={{}} // Initial values for the form
                  permissionCode={/product\.create/}
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

export default fetchProductsAsOptions; // Export the fetch function for use in other components
