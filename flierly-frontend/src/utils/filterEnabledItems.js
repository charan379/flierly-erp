const filterEnabledItems = (items) => {
  return items
    .filter((item) => !item.disabled) // Only keep items that are not disabled
    .map((item) => {
      // If the item has children, apply the same filter to them
      if (item.children) {
        const filteredChildren = filterEnabledItems(item.children);
        return { ...item, children: filteredChildren };
      }
      return item;
    });
};

export default filterEnabledItems;
