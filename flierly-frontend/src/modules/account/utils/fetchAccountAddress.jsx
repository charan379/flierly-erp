import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetchEntityRowsAsOptions";

const fetchAccountAddress = (value, signal, accountId) => {
  let filters = {
    contactName: { $ilike: `%${value}%` },
    account: accountId ? accountId : { $isNull: "" },
  };
  return fetchEntityRowsAsOptions(
    "address",
    filters,
    10,
    (accountAddress) => {
      return accountAddress.map((address) => {
        return {
          label: `${address.contactName} | ${address.line1} | ${address.contactNumber}`,
          value: address.id,
        };
      });
    },
    signal
  );
};

export default fetchAccountAddress;
