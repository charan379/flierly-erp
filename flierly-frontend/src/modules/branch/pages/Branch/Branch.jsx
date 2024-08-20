import React from "react";
import BranchLayout from "../../layout/BranchLayout";
import { CrudTable } from "@/features/CrudTable";
import columns from "../../config/branchColumns";

function Branch() {
  const data = [
    {
      _id: "66ae4627cd5b175eea07aa50",
      isDeleted: false,
      isActive: true,
      name: "main branch",
      email: "sdsf@gmial.com",
      phone: "12345678908",
      address: "66ae45a0cd5b175eea07aa44",
      taxIdentity: "66ae45a0cd5b175eea07aa42",
      createdAt: "2024-08-03T15:00:55.251Z",
      updatedAt: "2024-08-03T15:00:55.251Z",
    },
    {
      _id: "66ae4696cd5b175eea07aa67",
      isDeleted: false,
      isActive: true,
      name: "main branch",
      email: "sdsf@gmial.com",
      phone: "12345678908",
      address: "66ae45a0cd5b175eea07aa44",
      taxIdentity: "66ae45a0cd5b175eea07aa42",
      createdAt: "2024-08-03T15:02:46.832Z",
      updatedAt: "2024-08-03T15:02:46.832Z",
    },
    {
      _id: "66c32cd36c27122fa6ef7efa",
      isDeleted: false,
      isActive: true,
      name: "main branch",
      email: "sdsf@gmial.com",
      phone: "12345678908",
      address: "66ae45a0cd5b175eea07aa44",
      taxIdentity: "66ae45a0cd5b175eea07aa42",
      createdAt: "2024-08-19T11:30:27.836Z",
      updatedAt: "2024-08-19T11:30:27.836Z",
    },
    {
      _id: "66c32d1a6c27122fa6ef7f07",
      isDeleted: false,
      isActive: true,
      name: "main branch",
      email: "sdsf@gmial.com",
      phone: "12345678908",
      alternatePhone: "9876543210",
      address: "66ae45a0cd5b175eea07aa44",
      taxIdentity: "66ae45a0cd5b175eea07aa42",
      createdAt: "2024-08-19T11:31:38.362Z",
      updatedAt: "2024-08-19T11:31:38.362Z",
    },
  ];
  return (
    <BranchLayout>
      <CrudTable
        entity="branch"
        columns={columns}
        dataSource={data}
        tableKey={"branch-table"}
        rowKey="_id"
        // createFormFields={<AddCustomer />}
        // createFormInitialValues={{ tags: ["gold"] }}
        // searchFormFields={<SearchCustomer />}
        // searchFormInitialValues={{ tags: ["gold"] }}
      />
    </BranchLayout>
  );
}

export default Branch;
