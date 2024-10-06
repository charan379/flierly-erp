import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetchEntityRowsAsOptions";

const fetchAccountAddress = (value, accountId) => {
  let filters = { contactName: { $ilike: `%${value}%` }, account: accountId };
  return fetchEntityRowsAsOptions("address", filters, 10, (accountAddress) => {
    return accountAddress.map((address) => {
      return {
        label: `${address.contactName} | ${address.line1} | ${address.contactNumber}`,
        value: address.id,
      };
    });
  });
};

export default fetchAccountAddress;
