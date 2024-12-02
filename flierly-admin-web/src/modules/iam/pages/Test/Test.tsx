import GenericAssignmentManager from "@/features/GenericAssignmentManager/GenericAssignmentManager";
import React, { useState } from "react";

interface Item {
  id: string;
  name: string;
  description: string;
}

// Example of the title extractor function
const titleExtractor = (item: Item) => <strong>{item.name}</strong>;

// Example of key extractor function
const keyExtractor = (item: Item) => item.id;

// Mock API to fetch available items
const fetchAvailableItems = async (parentId: string): Promise<Item[]> => {
  // In a real app, replace this with an API call.
  return [
    { id: "1", name: "Item 1", description: "Description of Item 1" },
    { id: "2", name: "Item 2", description: "Description of Item 2" },
  ];
};

// Mock API to fetch assigned items
const fetchAssignedItems = async (parentId: string): Promise<Item[]> => {
  // In a real app, replace this with an API call.
  return [
    { id: "3", name: "Assigned Item 1", description: "Description of Assigned Item 1" },
    { id: "4", name: "Assigned Item 2", description: "Description of Assigned Item 2" },
  ];
};

// Mock API to assign items
const onAssign = async (parentId: string, items: Item[]) => {
  console.log("Assigned items:", items);
  // In a real app, make the API call to assign the items.
};

// Mock API to remove items
const onRemove = async (parentId: string, items: Item[]) => {
  console.log("Removed items:", items);
  // In a real app, make the API call to remove the items.
};

const ParentComponent = () => {
  const parentId = "parent-123"; // Example parent entity ID

  return (
    <GenericAssignmentManager<Item>
      parentEntityName="Category"
      relatedEntityName="Product"
      parentId={parentId}
      fetchAvailableItems={fetchAvailableItems}
      fetchAssignedItems={fetchAssignedItems}
      onAssign={onAssign}
      onRemove={onRemove}
      keyExtractor={keyExtractor}
      titleExtractor={titleExtractor}
    />
  );
};

export default ParentComponent;
