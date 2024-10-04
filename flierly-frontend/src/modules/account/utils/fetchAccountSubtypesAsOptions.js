import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetchEntityRowsAsOptions";

const fetchAccountSubtypesAsOptions = (value, accTypeId) => {
    let filters = { name: { $ilike: `%${value}%` }, accountType: { $equalTo: accTypeId } };
    return fetchEntityRowsAsOptions("account-subtype", filters, 10, (accountSubtypes) => {
        return accountSubtypes.map((acSubtype) => {
            return { label: acSubtype.name, value: acSubtype.id }
        })
    })
};

export default fetchAccountSubtypesAsOptions;