import React, { useEffect, useState } from "react";
import { Tabs, Button, Space, Spin, message } from "antd";
import { ProList } from "@ant-design/pro-components";

type TitleExtractor<T> = (item: T) => React.ReactNode;

interface GenericAssignmentManagerProps<T extends Record<string, any>> {
    parentEntityName: string;
    relatedEntityName: string;
    parentId: string;
    fetchAvailableItems: (parentId: string) => Promise<T[]>;
    fetchAssignedItems: (parentId: string) => Promise<T[]>;
    onAssign: (parentId: string, items: T[]) => Promise<void>;
    onRemove: (parentId: string, items: T[]) => Promise<void>;
    keyExtractor: (item: T) => string;
    titleExtractor: TitleExtractor<T>;
}

const GenericAssignmentManager = <T extends Record<string, any>>({
    parentEntityName,
    relatedEntityName,
    parentId,
    fetchAvailableItems,
    fetchAssignedItems,
    onAssign,
    onRemove,
    keyExtractor,
    titleExtractor,
}: GenericAssignmentManagerProps<T>) => {
    const [tabKey, setTabKey] = useState("assigned");
    const [assignedItems, setAssignedItems] = useState<T[]>([]);
    const [availableItems, setAvailableItems] = useState<T[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            if (tabKey === "assigned") {
                const data = await fetchAssignedItems(parentId);
                setAssignedItems(data);
            } else {
                const data = await fetchAvailableItems(parentId);
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
                await onRemove(parentId, selectedItems);
                setAssignedItems((prev) =>
                    prev.filter((item) => !selectedKeys.includes(keyExtractor(item)))
                );
            } else {
                await onAssign(parentId, selectedItems);
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

    const handleIndividualAction = async (item: T) => {
        try {
            if (tabKey === "assigned") {
                await onRemove(parentId, [item]);
                setAssignedItems((prev) =>
                    prev.filter((i) => keyExtractor(i) !== keyExtractor(item))
                );
                message.success(`Removed ${relatedEntityName} from ${parentEntityName}`);
            } else {
                await onAssign(parentId, [item]);
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

    const handleCardClick = (item: T) => {
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
                    <ProList<T>
                        rowKey={keyExtractor}
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
                            selectedRowKeys: selectedKeys,
                            onChange: (selectedRowKeys) => {
                                setSelectedKeys(selectedRowKeys.map(String));
                            },
                        }}
                        onItem={(item, _index) => {
                            return {
                                onClick: (_event) => handleCardClick(item)
                            }
                        }}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab={`Available ${relatedEntityName}s`} key="available">
                    <ProList<T>
                        rowKey={keyExtractor}
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
                            selectedRowKeys: selectedKeys,
                            onChange: (selectedRowKeys) => {
                                setSelectedKeys(selectedRowKeys.map(String));
                            },
                        }}
                        onItem={(item, _index) => {
                            return {
                                onClick: (_event) => handleCardClick(item)
                            }
                        }}
                    />
                </Tabs.TabPane>
            </Tabs>
        </Spin>
    );
};

export default GenericAssignmentManager;
