import Create from "@/features/SelectRemoteOptions/forms/Create";
import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetchEntityRowsAsOptions";
import accountSubtypeColumns from "../config/accountSubtypeColumns";
import FormFields from "@/components/FormFields";

const fetchAccountSubtypesAsOptions = (value, signal, accTypeId) => {
  const queryOperator = Array.isArray(accTypeId) ? "$in" : "$equalTo";
  let filters = {
    name: { $ilike: `%${value}%` },
    accountType: { [queryOperator]: accTypeId },
  };
  return fetchEntityRowsAsOptions(
    "account-subtype",
    filters,
    10,
    (accountSubtypes) => {
      if (accountSubtypes <= 0) {
        return [
          {
            label: (
              <Create
                entity="account-subtype"
                formFields={
                  <FormFields
                    configKey={"createFormConfig"}
                    columns={accountSubtypeColumns}
                  />
                }
                title="add_account_subtype"
                initialValues={{ accountType: accTypeId }}
              />
            ),
            disabled: true,
          },
        ];
      }
      return accountSubtypes.map((acSubtype) => {
        return { label: acSubtype.name, value: acSubtype.id };
      });
    },
    signal
  );
};

export default fetchAccountSubtypesAsOptions;
