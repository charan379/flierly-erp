import React, { useState } from "react";
import { Button, Card, Row, Col, Select, Space, Divider } from "antd";
import FormField, { FormFieldConfig } from "@/components/FormField";

export type QueryCondition = {
    field: string;
    value: any;
    conditions?: { condition: string; formField?: FormFieldConfig }[];
};

const QueryBuilder: React.FC<{ config: QueryCondition[] }> = ({ config }) => {
    const [conditions, setConditions] = useState<{
        id: number; // Unique identifier for each condition
        field?: string;
        condition?: string;
        value?: any;
        formConfig?: FormFieldConfig;
    }[]>([]);
    const [conditionCount, setConditionCount] = useState(0); // Track total condition count

    const handleAddCondition = () => {
        setConditions([
            ...conditions,
            {
                id: conditionCount, // Use count as unique identifier
            },
        ]);
        setConditionCount((prevCount) => ++prevCount); // Increment count
    };

    const handleFieldChange = (id: number, field: string) => {
        setConditions((prev) =>
            prev.map((cond) =>
                cond.id === id
                    ? {
                          id: cond.id,
                          field,
                          condition: "", // Reset condition
                          value: null, // Reset value
                          formConfig: undefined, // Reset form configuration
                      }
                    : cond
            )
        );
    };

    const handleConditionChange = (id: number, condition: string) => {
        setConditions((prev) =>
            prev.map((cond) => {
                if (cond.id === id) {
                    const fieldConfig = config.find((c) => c.field === cond.field);
                    const conditionConfig = fieldConfig?.conditions?.find((c) => c.condition === condition);

                    return {
                        ...cond,
                        condition,
                        formConfig: conditionConfig?.formField || undefined,
                        value: null, // Reset value when condition changes
                    };
                }
                return cond;
            })
        );
    };

    const handleValueChange = (id: number, value: any) => {
        setConditions((prev) =>
            prev.map((cond) => (cond.id === id ? { ...cond, value } : cond))
        );
    };

    const handleRemoveCondition = (id: number) => {
        setConditions((prev) => prev.filter((cond) => cond.id !== id));
        setConditionCount((prevCount) => --prevCount); // Decrement count
    };

    const generateQuery = () =>
        conditions
            .map((cond) => `${cond.field} ${cond.condition} ${JSON.stringify(cond.value)}`)
            .join(" AND ");

    return (
        <Card style={{ margin: "20px auto", padding: "24px", minWidth: "80%", maxWidth: 1200 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
                {conditions.map((cond, index) => (
                    <Card
                        key={cond.id} // Use condition ID as the key
                        title={
                            <Row justify="space-between">
                                <Col>{cond.field || `Condition ${index + 1}`}</Col>
                                <Col>
                                    <Button
                                        type="link"
                                        danger
                                        onClick={() => handleRemoveCondition(cond.id)}
                                    >
                                        Remove
                                    </Button>
                                </Col>
                            </Row>
                        }
                    >
                        <Row gutter={16}>
                            <Col span={8}>
                                <Select
                                    placeholder="Select Field"
                                    value={cond.field}
                                    onChange={(value) => handleFieldChange(cond.id, value)}
                                    options={config.map((c) => ({
                                        label: c.field,
                                        value: c.field,
                                    }))}
                                    style={{ width: "100%" }}
                                />
                            </Col>
                            <Col span={8}>
                                <Select
                                    placeholder="Select Condition"
                                    value={cond.condition}
                                    onChange={(value) => handleConditionChange(cond.id, value)}
                                    options={
                                        config
                                            .find((c) => c.field === cond.field)
                                            ?.conditions?.map((c) => ({
                                                label: c.condition,
                                                value: c.condition,
                                            })) || []
                                    }
                                    style={{ width: "100%" }}
                                />
                            </Col>
                            <Col span={8}>
                                {cond.formConfig && (
                                    <FormField
                                        key={`${cond.id}-${cond.condition}`} // Unique key for re-rendering
                                        config={{
                                            ...cond.formConfig,
                                            name: `conditions[${cond.id}].value`,
                                            onChange: (value) =>
                                                handleValueChange(cond.id, value),
                                        }}
                                        showLabel={false} // Hide label for value input
                                    />
                                )}
                            </Col>
                        </Row>
                    </Card>
                ))}
            </Space>
            <Divider />
            <Button type="dashed" onClick={handleAddCondition}>
                Add Condition
            </Button>
            <Divider>Generated Query</Divider>
            <pre>{generateQuery() || "No conditions added yet."}</pre>
        </Card>
    );
};

export default QueryBuilder;
