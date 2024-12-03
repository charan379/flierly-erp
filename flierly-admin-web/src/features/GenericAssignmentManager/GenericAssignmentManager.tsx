import React, { useEffect, useState } from "react";
import { Tabs, Button, Space, Spin, message } from "antd";
import { ProList } from "@ant-design/pro-components";

type TitleExtractor<CE> = (item: CE) => React.ReactNode;

interface GenericAssignmentManagerProps<
    PE extends Record<string, any>,
    CE extends Record<string, any>
> {
    parentEntity: PE;
    parentEntityName: string;
    relatedEntityName: string;
    fetchAvailableItems: (parent: PE) => Promise<CE[]>;
    fetchAssignedItems: (parent: PE) => Promise<CE[]>;
    onAssign: (parent: PE, items: CE[]) => Promise<void>;
    onRemove: (parent: PE, items: CE[]) => Promise<void>;
    keyExtractor: (item: CE) => number;
    titleExtractor: TitleExtractor<CE>;
}

const GenericAssignmentManager = <
    PE extends Record<string, any>,
    CE extends Record<string, any>
>({
    parentEntity,
    parentEntityName,
    relatedEntityName,
    fetchAvailableItems,
    fetchAssignedItems,
    onAssign,
    onRemove,
    keyExtractor,
    titleExtractor,
}: GenericAssignmentManagerProps<PE, CE>) => {
    const [tabKey, setTabKey] = useState("assigned");
    const [assignedItems, setAssignedItems] = useState<CE[]>([]);
    const [availableItems, setAvailableItems] = useState<CE[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            if (tabKey === "assigned") {
                const data = await fetchAssignedItems(parentEntity);
                setAssignedItems(data);
            } else {
                const data = await fetchAvailableItems(parentEntity);
                setAvailableItems(data);
            }
        } catch (error) {
            message.error(`Failed to fetch ${relatedEntityName}s`);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTabChange = (key: string) => {
        setTabKey(key);
        setSelectedKeys([]);
    };

    const handleBulkAction = async () => {
        if (selectedKeys.length === 0) {
            message.warning("No items selected");
            return;
        }

        const selectedItems =
            tabKey === "assigned"
                ? assignedItems.filter((item) => selectedKeys.includes(keyExtractor(item)))
                : availableItems.filter((item) => selectedKeys.includes(keyExtractor(item)));

        try {
            if (tabKey === "assigned") {
                await onRemove(parentEntity, selectedItems);
                setAssignedItems((prev) =>
                    prev.filter((item) => !selectedKeys.includes(keyExtractor(item)))
                );
            } else {
                await onAssign(parentEntity, selectedItems);
                setAvailableItems((prev) =>
                    prev.filter((item) => !selectedKeys.includes(keyExtractor(item)))
                );
            }
            message.success(
                `${selectedItems.length} ${relatedEntityName}(s) ${tabKey === "assigned" ? "removed" : "assigned"} to ${parentEntityName}`
            );
            setSelectedKeys([]);
        } catch (error) {
            message.error(`Failed to ${tabKey === "assigned" ? "remove" : "assign"} items`);
            console.error(error);
        }
    };

    const handleIndividualAction = async (item: CE) => {
        try {
            if (tabKey === "assigned") {
                await onRemove(parentEntity, [item]);
                setAssignedItems((prev) =>
                    prev.filter((i) => keyExtractor(i) !== keyExtractor(item))
                );
                message.success(`Removed ${relatedEntityName} from ${parentEntityName}`);
            } else {
                await onAssign(parentEntity, [item]);
                setAvailableItems((prev) =>
                    prev.filter((i) => keyExtractor(i) !== keyExtractor(item))
                );
                message.success(`Assigned ${relatedEntityName} to ${parentEntityName}`);
            }
        } catch (error) {
            message.error(`Failed to ${tabKey === "assigned" ? "remove" : "assign"} item`);
            console.error(error);
        }
    };

    const handleCardClick = (item: CE) => {
        const itemKey = keyExtractor(item);
        const isSelected = selectedKeys.includes(itemKey);
        if (isSelected) {
            setSelectedKeys(selectedKeys.filter((key) => key !== itemKey));
        } else {
            setSelectedKeys([...selectedKeys, itemKey]);
        }
    };

    useEffect(() => {
        fetchData();
    }, [tabKey]);

    return (
        <Spin spinning={isLoading}>
            <Tabs
                activeKey={tabKey}
                onChange={handleTabChange}
                tabBarExtraContent={
                    <Space>
                        <Button type="primary" onClick={handleBulkAction}>
                            {tabKey === "assigned" ? `Remove from ${parentEntityName}` : `Assign to ${parentEntityName}`}
                        </Button>
                    </Space>
                }
                style={{ width: "720px" }}
            >
                <Tabs.TabPane tab={`Assigned ${relatedEntityName}s`} key="assigned">
                    <ProList<CE>
                        rowKey={(item) => keyExtractor(item).toString()}
                        dataSource={assignedItems}
                        metas={{
                            title: {
                                render: (_, item) => titleExtractor(item),
                            },
                            actions: {
                                render: (_, item) => (
                                    <Button
                                        type="link"
                                        onClick={() => handleIndividualAction(item)}
                                    >
                                        Remove
                                    </Button>
                                ),
                            },
                        }}
                        rowSelection={{
                            selectedRowKeys: selectedKeys.map(String),
                            onChange: (selectedRowKeys) => {
                                setSelectedKeys(selectedRowKeys.map(Number));
                            },
                        }}
                        onItem={(item) => {
                            return {
                                onClick: () => handleCardClick(item),
                            };
                        }}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab={`Available ${relatedEntityName}s`} key="available">
                    <ProList<CE>
                        rowKey={(item) => keyExtractor(item).toString()}
                        dataSource={availableItems}
                        metas={{
                            title: {
                                render: (_, item) => titleExtractor(item),
                            },
                            actions: {
                                render: (_, item) => (
                                    <Button
                                        type="link"
                                        onClick={() => handleIndividualAction(item)}
                                    >
                                        Assign
                                    </Button>
                                ),
                            },
                        }}
                        rowSelection={{
                            selectedRowKeys: selectedKeys.map(String),
                            onChange: (selectedRowKeys) => {
                                setSelectedKeys(selectedRowKeys.map(Number));
                            },
                        }}
                        onItem={(item) => {
                            return {
                                onClick: () => handleCardClick(item),
                            };
                        }}
                    />
                </Tabs.TabPane>
            </Tabs>
        </Spin>
    );
};

export default GenericAssignmentManager;
