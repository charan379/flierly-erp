import { ProColumns } from "@ant-design/pro-components";
import { Tag, Typography } from "antd";

const { Text } = Typography;

const roleTableColumns: ProColumns<Role>[] = [
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
        title: "Role Name",
        dataIndex: "name",
        key: "name",
        order: 1,
        valueType: "text",
        sorter: true,
    },
    // code
    {
        title: "Role Code",
        dataIndex: "code",
        key: "code",
        order: 2,
        valueType: "text",
        sorter: true,
    },
    // description
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
        order: 3,
        valueType: "text",
        ellipsis: true,
    },
    // privileges
    {
        title: "Privileges",
        dataIndex: "privileges",
        key: "privileges",
        order: 4,
        render: (_, entity) => {
            if (!entity.privileges || entity.privileges.length === 0) {
                return <Text type="secondary">No Privileges</Text>;
            }
            return (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {entity.privileges.map((privilege) => (
                        <Tag key={privilege.id} color="blue">
                            {privilege.name}
                        </Tag>
                    ))}
                </div>
            );
        },
    },
    // isActive
    {
        title: "Active",
        dataIndex: "isActive",
        key: "isActive",
        order: 5,
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
    },
];

export default roleTableColumns;
