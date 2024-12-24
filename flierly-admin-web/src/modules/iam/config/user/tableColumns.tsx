import ResizableDrawer from "@/components/ResizableDrawer";
import AssociationManager from "@/features/GenericAssignmentManager";
import { ProColumns } from "@ant-design/pro-components";
import { Button, Tag } from "antd";
import formatDateToLocaleTimezone from "@/utils/formatDateTimeToLocaleTimezone";
import _ from "lodash";
import privilegeTableColumns from "../privilege/tableColumns";
import privilegeAssociatedEntityQueryFields from "../privilege/associatedEntityQueryFields";
import roleAssociatedEntityQueryFields from "../role/associatedEntityQueryFields";
import roleTableColumns from "../role/tableColumns";
import UserPasswordUpdate from "../../features/UserPasswordUpdate";

const userTableColumns: ProColumns<User>[] = [
    // id
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        order: 0,
        valueType: "digit",
        search: false,
        sorter: true,
        defaultSortOrder: "ascend",
        width: 50,
    },
    // name
    {
        title: "User Name",
        dataIndex: "username",
        key: "username",
        order: 1,
        valueType: "text",
        sorter: true,
        width: 200,
    },
    // mobile
    {
        title: "Mobile",
        dataIndex: "mobile",
        key: "mobile",
        order: 2,
        valueType: "text",
        sorter: true,
        copyable: true,
        width: 150,
    },
    // email
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        order: 3,
        valueType: "text",
        sorter: true,
        copyable: true,
        width: 200,
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
    // Additional Privileges
    {
        title: "Additional Privileges",
        dataIndex: "additionalPrivileges",
        key: "additionalPrivileges",
        order: 5,
        align: "center",
        width: 150,
        render: (_, entity) => {
            return (
                <ResizableDrawer
                    title={<span style={{ padding: 0, textAlign: "left" }}>{`Edit additional privileges for : ${entity.username}`}</span>}
                    initialWidth={1200}
                    destroyOnClose
                    styles={{
                        footer: { padding: "15px 15px 15px 15px" },
                        header: { padding: "10px 10px 10px 10px", textAlign: "left" },
                    }}
                    trigger={<Button type="link">Manage</Button>}
                >
                    <AssociationManager<User, Privilege>
                        owningEntity="user"
                        owningEntityRow={entity}
                        owningSideField="usersWithAdditionalPrivileges"
                        associatedEntity="privilege"
                        associatedSideField="additionalPrivileges"
                        associatedEntityColumns={privilegeTableColumns.filter((column) => ["id", "name", "code", "entity", "access"].includes(column.dataIndex as string))}
                        associatedEntityQueryConfig={privilegeAssociatedEntityQueryFields}
                    />
                </ResizableDrawer>
            )
        },
    },
    // Restricted Privileges
    {
        title: "Restricted Privileges",
        dataIndex: "restrictedPrivileges",
        key: "restrictedPrivileges",
        order: 6,
        align: "center",
        width: 150,
        render: (_, entity) => {
            return (
                <ResizableDrawer
                    title={<span style={{ padding: 0, textAlign: "left" }}>{`Edit restricted privileges for : ${entity.username}`}</span>}
                    initialWidth={1200}
                    destroyOnClose
                    styles={{
                        footer: { padding: "15px 15px 15px 15px" },
                        header: { padding: "10px 10px 10px 10px", textAlign: "left" },
                    }}
                    trigger={<Button type="link">Manage</Button>}
                >
                    <AssociationManager<User, Privilege>
                        owningEntity="user"
                        owningEntityRow={entity}
                        owningSideField="usersWithRestrictedPrivileges"
                        associatedEntity="privilege"
                        associatedSideField="restrictedPrivileges"
                        associatedEntityColumns={privilegeTableColumns.filter((column) => ["id", "name", "code", "entity", "access"].includes(column.dataIndex as string))}
                        associatedEntityQueryConfig={privilegeAssociatedEntityQueryFields}
                    />
                </ResizableDrawer>
            )
        },
    },
    // Roles
    {
        title: "Roles",
        dataIndex: "roles",
        key: "roles",
        order: 7,
        align: "center",
        width: 100,
        render: (_, entity) => {
            return (
                <ResizableDrawer
                    title={<span style={{ padding: 0, textAlign: "left" }}>{`Edit roles for : ${entity.username}`}</span>}
                    initialWidth={1200}
                    destroyOnClose
                    styles={{
                        footer: { padding: "15px 15px 15px 15px" },
                        header: { padding: "10px 10px 10px 10px", textAlign: "left" },
                    }}
                    trigger={<Button type="link">Manage</Button>}
                >
                    <AssociationManager<User, Role>
                        owningEntity="user"
                        owningEntityRow={entity}
                        owningSideField="users"
                        associatedEntity="role"
                        associatedSideField="roles"
                        associatedEntityColumns={roleTableColumns.filter((column) => ["id", "name", "code", "active"].includes(column.dataIndex as string))}
                        associatedEntityQueryConfig={roleAssociatedEntityQueryFields}
                    />
                </ResizableDrawer>
            )
        },
    },
    // password
    {
        title: "Password",
        key: "password",
        order: 8,
        align: "center",
        width: 150,
        render: (_dom, entity, _index, _action, _schema) => {
            return <UserPasswordUpdate userId={entity.id} />
        },
    },
    // updatedAt
    {
        title: "Updated At",
        dataIndex: "updatedAt",
        order: 9,
        valueType: "text",
        sorter: true,
        width: 150,
        renderText(text, _record, _index, _action) {
            return formatDateToLocaleTimezone(text, "DD-MM-YYYY HH:mm:ss", true);
        },
    },
    // createdAt
    {
        title: "Created At",
        dataIndex: "createdAt",
        order: 10,
        valueType: "text",
        sorter: true,
        width: 150,
        renderText(text, _record, _index, _action) {
            return formatDateToLocaleTimezone(text, "DD-MM-YY HH:mm:ss", true);
        },
    },
    // deletedAt
    {
        title: "Deleted At",
        dataIndex: "deletedAt",
        order: 11,
        valueType: "text",
        sorter: true,
        width: 150,
        renderText(text, _record, _index, _action) {
            return formatDateToLocaleTimezone(text, "DD-MM-YYYY HH:mm:ss", true);
        },
    },
];

export default userTableColumns;
