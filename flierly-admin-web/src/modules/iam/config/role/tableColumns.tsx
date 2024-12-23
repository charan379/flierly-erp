import ResizableDrawer from "@/components/ResizableDrawer";
import AssociationManager from "@/features/GenericAssignmentManager";
import fetchEntityOptions from "@/features/SelectRemoteOptions/utils/fetchEntityOptions";
import { ProColumns } from "@ant-design/pro-components";
import { Button, Tag } from "antd";
import privilegeTableColumns from "../privilege/tableColumns";
import queryTransformers from "@/utils/queryTransformers";
import formatDateToLocaleTimezone from "@/utils/formatDateTimeToLocaleTimezone";
import _ from "lodash";


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
        copyable: true
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
            return (
                <ResizableDrawer
                    title={<span style={{ padding: 0, textAlign: "left" }}>{`Edit privileges for Role: ${entity.name}`}</span>}
                    initialWidth={1200}
                    destroyOnClose
                    styles={{
                        footer: { padding: "15px 15px 15px 15px" },
                        header: { padding: "10px 10px 10px 10px", textAlign: "left" },
                    }}
                    trigger={<Button type="link">Manage Privileges</Button>}
                >
                    <AssociationManager<Role, Privilege>
                        owningEntity="role"
                        owningEntityRow={entity}
                        owningSideField="roles"
                        associatedEntity="privilege"
                        associatedSideField="privileges"
                        associatedEntityColumns={privilegeTableColumns.filter((column) => ["id", "name", "code", "entity", "access"].includes(column.dataIndex as string))}
                        associatedEntityQueryConfig={[
                            { label: "Name", name: "name", formField: { input: { type: "Text" }, rules: [{ required: true, message: "" }] } },
                            { label: "Code", name: "code", formField: { input: { type: "Text" }, rules: [{ required: true, message: "" }] } },
                            {
                                label: "Entity", name: "entity", formField: {

                                    input: {
                                        type: "SelectRemoteOptions",
                                        asyncOptionsFetcher: fetchEntityOptions,
                                        debounceTimeout: 300, mode: "multiple"
                                    },
                                    rules: [{ type: "array", required: true, message: "" }],
                                    transform: queryTransformers.inArray
                                }
                            }

                        ]}
                    />
                </ResizableDrawer>
            )
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
        valueType: "text",
        sorter: true,
        renderText(text, _record, _index, _action) {
            return formatDateToLocaleTimezone(text, "DD-MM-YYYY HH:mm:ss", true);
        },
    },
    // createdAt
    {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        order: 7,
        valueType: "text",
        sorter: true,
        renderText(text, _record, _index, _action) {
            return formatDateToLocaleTimezone(text, "DD-MM-YY HH:mm:ss", true);
        },
    },
    // deletedAt
    {
        title: "Deleted At",
        dataIndex: "deletedAt",
        key: "deletedAt",
        order: 8,
        valueType: "text",
        sorter: true,
        renderText(text, _record, _index, _action) {
            return formatDateToLocaleTimezone(text, "DD-MM-YYYY HH:mm:ss", true);
        },
    },
];

export default roleTableColumns;
