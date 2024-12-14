import { ItemType } from "antd/lib/menu/interface";

  const filterEnabledItems = (items: ItemType<any>[]): ItemType[] => {
    return items.filter((item) => !item.disabled) // Only keep items that are not disabled
      .map((item) => {
        // If the item has children, apply the same filter to them
        if (item?.children) {
          const filteredChildren = filterEnabledItems(item.children);
          return { ...item, children: filteredChildren };
        }
        return item;
      });
  };
  
  export default filterEnabledItems;
  