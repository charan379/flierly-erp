import { useEffect, useRef, useState } from "react";
import { Tabs, Button } from "antd";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import useLocale from "../Locale/hooks/useLocale";
import genricAssignmentService from "./service/genricAssignmentService";
import { SettingTwoTone } from "@ant-design/icons";
import AllocateOne from "./features/AllocateOne";
import DeallocateOne from "./features/DeallocateOne";
import AllocateMany from "./features/AllocateMany";
import DeallocateMany from "./features/DeallocateMany";


interface GenericAssignmentManagerProps<
    OE extends { id: number },
    IE extends { id: number, disabled?: boolean }
> {
    owningEntityRow: OE;
    owningEntity: string;
    associatedEntity: string;
    associatedEntityColumns: ProColumns<IE>[],
    associatedSideField: string,
    owningSideField: string;
}

const GenericAssignmentManager = <
    OE extends { id: number },
    IE extends { id: number, disabled?: boolean }
>({
    owningEntityRow,
    owningEntity,
    associatedEntity,
    associatedEntityColumns,
    associatedSideField,
    owningSideField,

}: GenericAssignmentManagerProps<OE, IE>) => {
    // 
    const [tabKey, setTabKey] = useState<"allocatedItems" | "availableItems">("allocatedItems");
    const [allocatedItems, setAllocatedItems] = useState<IE[]>([]);
    const [availableItems, setAvailableItems] = useState<IE[]>([]);
    const [itemsToAllocate, setItemsToAllocate] = useState<IE[]>([]);
    const [itemsToDeallocate, setItemsToDeallocate] = useState<IE[]>([]);

    const { translate } = useLocale();

    const allocatedTableTableRef = useRef<ActionType>();
    const availableTableRef = useRef<ActionType>();

    const tableColumns: ProColumns<IE>[] = [
        ...associatedEntityColumns,
        {
            key: "actions",
            fixed: "right",
            width: "40px",
            title: <SettingTwoTone />,
            align: "center",
            render: (_, entity) => {
                if (tabKey === "allocatedItems") {
                    return (
                        <DeallocateOne
                            owningEntity={owningEntity}
                            owningEntityId={owningEntityRow.id}
                            inverseField={associatedSideField}
                            inverseIdToDisassociate={entity.id}
                            tableActionRef={allocatedTableTableRef}
                        />
                    )
                } else if (tabKey === "availableItems") {
                    return (
                        <AllocateOne
                            owningEntity={owningEntity}
                            owningEntityId={owningEntityRow.id}
                            inverseField={associatedSideField}
                            inverseIdToAssociate={entity.id}
                            tableActionRef={availableTableRef}
                        />
                    )
                } else {
                    return null
                }
            }
        }
    ];

    const handleTabChange = (key: "allocatedItems" | "availableItems") => {
        setTabKey(key);
    };

    const handleAllocatedItemsCardClick = (clickedItem: IE) => {
        const isAlreadySelectedToDeallocate = itemsToDeallocate.some((item) => item.id === clickedItem.id);
        if (isAlreadySelectedToDeallocate) {
            setItemsToDeallocate(prev => prev.filter((item) => item.id !== clickedItem.id));
        } else {
            setItemsToDeallocate(prev => [...prev, clickedItem]);
        }
    };

    const handleAvailableItemsCardClick = (clickedItem: IE) => {
        const isAlreadySelectedToAllocate = itemsToAllocate.some((item) => item.id === clickedItem.id);

        if (isAlreadySelectedToAllocate) {
            setItemsToAllocate(prev => prev.filter((item) => item.id !== clickedItem.id));
        } else {
            setItemsToAllocate(prev => [...prev, clickedItem])
        }
    };

    useEffect(() => {

        if (tabKey === "allocatedItems") {
            allocatedTableTableRef.current?.reload();
        }

        if (tabKey === "availableItems") {
            availableTableRef.current?.reload();
        };

        return () => {

        };

    }, [tabKey])

    return (
        <Tabs
            activeKey={tabKey}
            onChange={(activeKey) => handleTabChange(activeKey as "allocatedItems" | "availableItems")}
            style={{ width: "100%", height: "100%" }}
            items={[
                {
                    key: "allocatedItems",
                    label: `${translate("allocated")} ${associatedEntity}s`,
                    children:
                        <ProTable<IE>
                            rowKey={"id"}
                            bordered
                            actionRef={allocatedTableTableRef}
                            size="large"
                            dataSource={allocatedItems}
                            columns={tableColumns}
                            search={false}
                            options={{ density: false, fullScreen: false, reload: false, setting: false, search: false }}
                            tableAlertRender={false}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            // data fetch
                            request={async (params, sort, _filter) => {
                                const { result, success } = await genricAssignmentService.relatedEntitiespage<PageData<IE>>({
                                    owningEntity,
                                    owningEntityId: owningEntityRow.id,
                                    inverseEntity: associatedEntity,
                                    inverseSideField: owningSideField,
                                    owningSideField: associatedSideField,
                                    pagination: {
                                        limit: params?.pageSize ?? 10,
                                        page: params?.current ?? 1
                                    },
                                    sort
                                })

                                return {
                                    data: result?.data,
                                    success,
                                    total: result?.totalResults
                                }
                            }}
                            // set data came form request to state
                            postData={(data: IE[]) => {
                                setAllocatedItems(_prev => [...data])
                            }}
                            // pagination configuration
                            pagination={{
                                showSizeChanger: true,
                                pageSizeOptions: [5, 10, 20, 25, 50],
                                defaultPageSize: 10,
                                responsive: true,
                                size: "small",
                            }}
                            scroll={{
                                scrollToFirstRowOnChange: true,
                                x: 800,
                                y: 300,
                            }}
                            rowSelection={{
                                preserveSelectedRowKeys: true,
                                selectedRowKeys: itemsToDeallocate.map(item => item.id),
                                onChange: (_selectedRowKeys, selectedRows) => {
                                    setItemsToDeallocate([...selectedRows]);
                                },
                            }}
                            onRow={(item) => ({
                                onClick: () => handleAllocatedItemsCardClick(item),
                            })}
                            showSorterTooltip={false}
                            // toolbar Render
                            toolBarRender={(action, rows) => [
                                <DeallocateMany
                                    actionRef={action}
                                    owningEntity={owningEntity}
                                    owningEntityId={owningEntityRow.id}
                                    inverseField={associatedSideField}
                                    inverseIdsToDisassociate={rows.selectedRowKeys ? rows.selectedRowKeys.filter((id) => Number.isInteger(id)).map(Number) : []}
                                />,
                                <Button onClick={() => action?.clearSelected?.()}>Clear Selection</Button>
                            ]}
                        />
                },
                {
                    key: "availableItems",
                    label: `${translate("available")} ${associatedEntity}s`,
                    children: <ProTable<IE>
                        rowKey={"id"}
                        bordered
                        actionRef={availableTableRef}
                        size="large"
                        className="availableItems"
                        dataSource={availableItems}
                        columns={tableColumns}
                        search={false}
                        options={{ density: false, fullScreen: false, reload: false, setting: false, search: false }}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        // data fetch
                        request={async (params, sort, _filter) => {
                            const { result, success } = await genricAssignmentService.relatedEntitiespage<PageData<IE>>({
                                owningEntity,
                                owningEntityId: owningEntityRow.id,
                                inverseEntity: associatedEntity,
                                inverseSideField: owningSideField,
                                owningSideField: associatedSideField,
                                pagination: {
                                    limit: params?.pageSize ?? 10,
                                    page: params?.current ?? 1
                                },
                                sort,
                                type: "unallocated"
                            })

                            return {
                                data: result?.data,
                                success,
                                total: result?.totalResults
                            }
                        }}
                        // set data came form request to state
                        postData={(data: IE[]) => {
                            setAvailableItems(_prev => [...data])
                        }}
                        // pagination configuration
                        pagination={{
                            showSizeChanger: true,
                            pageSizeOptions: [5, 10, 20, 25, 50],
                            defaultPageSize: 10,
                            responsive: true,
                            size: "small",
                        }}
                        tableAlertRender={false}
                        scroll={{
                            scrollToFirstRowOnChange: true,
                            x: 800,
                            y: 300,
                        }}
                        rowSelection={{
                            preserveSelectedRowKeys: true,
                            selectedRowKeys: itemsToAllocate.map((item) => item.id),
                            getCheckboxProps: (item) => {
                                return {
                                    disabled: item?.disabled
                                }
                            },
                            onChange: (_selectedRowKeys, selectedRows) => {
                                setItemsToAllocate([...selectedRows]);
                            },
                        }}
                        onRow={(item) => ({
                            onClick: () => handleAvailableItemsCardClick(item),
                        })}
                        showSorterTooltip={false}
                        toolBarRender={(action, rows) => [
                            <AllocateMany
                                actionRef={action}
                                owningEntity={owningEntity}
                                owningEntityId={owningEntityRow.id}
                                inverseField={associatedSideField}
                                inverseIdsToAssociate={rows.selectedRowKeys ? rows.selectedRowKeys.filter((id) => Number.isInteger(id)).map(Number) : []}
                            />,
                            <Button onClick={() => action?.clearSelected?.()}>Clear Selection</Button>
                        ]}
                    />
                }
            ]}
        >
        </Tabs>
    );
};

export default GenericAssignmentManager;
