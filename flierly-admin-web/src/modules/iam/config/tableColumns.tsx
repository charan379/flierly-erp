import { ProColumns } from "@ant-design/pro-components";
import { Tag } from "antd";

const privilegeTableColumns: ProColumns<Privilege>[] = [
    // id
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        order: 0,
        valueType: "digit",
        search: false,
        width: 80,
        sorter: true,
        defaultSortOrder: "ascend",
    },
    // name
    {
        title: "Privilege Name",
        dataIndex: "name",
        key: "name",
        order: 1,
        valueType: "text",
        sorter: true,
    },
    // entity
    {
        title: "Entity",
        dataIndex: "entity",
        key: "entity",
        order: 2,
        valueType: "text",
        sorter: true,
    },
    // access
    {
        title: "Access Type",
        dataIndex: "access",
        key: "access",
        order: 3,
        render: (_dom, entity) => {
            switch (entity.access) {
                case "Create":
                    return <Tag color="#50C878">{entity.access}</Tag>;
                case "Read":
                    return <Tag color="#008080">{entity.access}</Tag>;
                case "Update":
                    return <Tag color="#FF7F50">{entity.access}</Tag>;
                case "Manage":
                    return <Tag color="#191970">{entity.access}</Tag>;
                case "Delete":
                    return <Tag color="#DC143C">{entity.access}</Tag>;
                default:
                    return <Tag>{entity.access}</Tag>;
            }
        },
    },
    // isActive
    {
        title: "Active",
        dataIndex: "isActive",
        key: "isActive",
        order: 4,
        valueType: "switch",
        filters: true,
        onFilter: true,
        align: "center",
        width: "80px",
        render: (_text, entity) => {
            return !entity.isActive ? (
                <Tag color="red">InActive</Tag>
            ) : (
                <Tag color="green">Active</Tag>
            );
        },
    },
    // code
    {
        title: "Privilege Code",
        dataIndex: "code",
        key: "code",
        order: 5,
        valueType: "text",
    },
    // updatedAt
    {
        title: "Updated At",
        dataIndex: "updatedAt",
        key: "updatedAt",
        order: 6,
        valueType: "dateTime",
        sorter: true,
    },
    // createdAt
    {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        order: 7,
        valueType: "dateTime",
        sorter: true,
    },
    // deletedAt
    {
        title: "Deleted At",
        dataIndex: "deletedAt",
        key: "deletedAt",
        order: 8,
        valueType: "dateTime",
        sorter: true,
    }
];

export default privilegeTableColumns;