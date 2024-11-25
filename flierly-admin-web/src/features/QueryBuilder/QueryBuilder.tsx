import React, { useState } from "react";
import { Button, Card, Row, Col, Select, Space, Divider } from "antd";
import FormField, { FormFieldConfig } from "@/components/FormField";
import queryTransformers, { TransformerKey } from "@/utils/queryTransformers";

export type QueryFieldConfig = {
    field: { label: string; namePath: string };
    conditions: {
        condition: { label: string; namePath: TransformerKey };
        formField: FormFieldConfig;
    }[];
};

type QueryCondition = {
    id: number;
    field?: { label: string; namePath: string };
    condition?: { label: string; namePath: TransformerKey };
    value?: any;
    formConfig?: FormFieldConfig;
}
const QueryBuilder: React.FC<{ config: QueryFieldConfig[] }> = ({ config }) => {
    const [conditions, setConditions] = useState<QueryCondition[]>([]);
    const [conditionCount, setConditionCount] = useState(0);

    const handleAddCondition = () => {
        setConditions([
            ...conditions,
            {
                id: conditionCount,
            },
        ]);
        setConditionCount((prevCount) => prevCount + 1);
    };

    const handleFieldChange = (id: number, selected: { label: string; value: string }) => {
        const selectedField = config.find((field) => field.field.namePath === selected.value);
        setConditions((prev) =>
            prev.map((cond) =>
                cond.id === id
                    ? {
                        ...cond,
                        field: selectedField?.field,
                        condition: undefined,
                        value: null,
                        formConfig: undefined,
                    }
                    : cond
            )
        );
    };

    const handleConditionChange = (id: number, namePath: string) => {
        setConditions((prev) =>
            prev.map((cond) => {
                if (cond.id === id) {
                    const fieldConfig = config.find((field) => field.field.namePath === cond.field?.namePath);
                    const selectedCondition = fieldConfig?.conditions.find(
                        (condition) => condition.condition.namePath === namePath
                    );

                    return {
                        ...cond,
                        condition: selectedCondition?.condition,
                        formConfig: selectedCondition?.formField,
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
        setConditionCount((prevCount) => prevCount - 1);
    };

    const getAvailableFields = (): QueryFieldConfig[] => {
        const usedFields = conditions.map((cond) => cond.field?.namePath);
        return config.filter((field) => !usedFields.includes(field.field.namePath));
    };

    // Function to generate query based on QueryCondition
    const generateQuery = (queryConditions: QueryCondition[]): Record<string, any> => {
        const query: Record<string, any> = {};

        queryConditions.forEach((queryCondition) => {
            // For each condition, get the corresponding transformer function based on namePath
            if (queryCondition?.condition && queryCondition?.field) {
                const transformerKey = queryCondition.condition?.namePath;
                const transformerFn = queryTransformers[transformerKey];
                
            // If the transformer function exists, apply it to the value
            if (transformerFn) {
                const result = transformerFn(queryCondition.value, queryCondition.field.namePath, undefined);

                // If the transformer returns a valid result, add it to the query
                if (result) {
                    Object.assign(query, result);
                }
            }
            }
        });

        return query;
    };

    return (
        <Card style={{ margin: "20px auto", padding: "24px", minWidth: "80%", maxWidth: 1200 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
                {conditions.map((cond, index) => (
                    <Card
                        key={cond.id}
                        title={
                            <Row justify="space-between">
                                <Col>{cond.field?.label || `Condition ${index + 1}`}</Col>
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
                                    value={cond.field ? { label: cond.field.label, value: cond.field.namePath } : undefined}
                                    onChange={(selected) => handleFieldChange(cond.id, selected)}
                                    options={getAvailableFields().map((field) => ({
                                        label: field.field.label,
                                        value: field.field.namePath,
                                    }))}
                                    style={{ width: "100%" }}
                                    labelInValue
                                />
                            </Col>
                            <Col span={8}>
                                <Select
                                    placeholder="Select Condition"
                                    value={cond.condition?.namePath}
                                    onChange={(value) => handleConditionChange(cond.id, value)}
                                    options={
                                        config
                                            .find((field) => field.field.namePath === cond.field?.namePath)
                                            ?.conditions.map((condition) => ({
                                                label: condition.condition.label,
                                                value: condition.condition.namePath,
                                            })) || []
                                    }
                                    style={{ width: "100%" }}
                                />
                            </Col>
                            <Col span={8}>
                                {cond.formConfig && (
                                    <FormField
                                        key={`${cond.id}-${cond.condition?.namePath}`}
                                        config={{
                                            ...cond.formConfig,
                                            name: `conditions[${cond.id}].value`,
                                            onChange: (value) => handleValueChange(cond.id, value),
                                        }}
                                        showLabel={false}
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
            <pre>{JSON.stringify(generateQuery(conditions)) || "No conditions added yet."}</pre>
        </Card>
    );
};

export default QueryBuilder;
