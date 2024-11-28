import React, { useState, useRef } from "react";
import { Button, Card, Row, Col, Select, Space, Divider, Typography, Form } from "antd";
import FormField, { FormFieldConfig } from "@/components/FormField";
import queryTransformers, { TransformerKey } from "@/utils/queryTransformers";
import CollapsibleCard from "./components/CollapsibleCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useElementWidth from "@/hooks/useElementWidth";

export type QueryFieldConfig<T = Record<string, any>> = {
    field: { label: string; namePath: keyof T };
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
};

const QueryBuilder: React.FC<{ config: QueryFieldConfig[] }> = ({ config }) => {
    const [conditions, setConditions] = useState<QueryCondition[]>([]);
    const [conditionCount, setConditionCount] = useState(0);
    const { ref: containerRef, width: containerWidth } = useElementWidth<HTMLDivElement>();
    const { ref: conditionCardRef, width: conditionCardWidth } = useElementWidth<HTMLDivElement>();


    const ed = useRef();
    ed.current

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

    const generateQuery = (queryConditions: QueryCondition[]): Record<string, any> => {
        const query: Record<string, any> = {};

        queryConditions.forEach((queryCondition) => {
            if (queryCondition?.condition && queryCondition?.field) {
                const transformerKey = queryCondition.condition?.namePath;
                const transformerFn = queryTransformers[transformerKey];

                if (transformerFn) {
                    const result = transformerFn(queryCondition.value, queryCondition.field.namePath, undefined);
                    if (result) {
                        Object.assign(query, result);
                    }
                }
            }
        });

        return query;
    };
    return (
        <Card style={{ margin: "20px auto", padding: "24px", minWidth: "80%", maxWidth: 1200 }} ref={containerRef}>
            <div
                style={{
                    display: "flex",
                    flexDirection: containerWidth > 600 ? "row" : "column",
                    gap: "20px",
                }}
            >
                {/* Conditions Section */}
                <div style={{ flex: containerWidth > 850 ? 2 : 1 }}>
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                        {conditions.map((cond, index) => (
                            <CollapsibleCard
                                key={`cond-${cond.id}`}
                                title={<Col>{cond.field?.label || `Condition ${index + 1}`}</Col>}
                                ref={conditionCardRef}
                                actions={[
                                    <Button
                                        key={"action-1"}
                                        type="link"
                                        danger
                                        onClick={() => handleRemoveCondition(cond.id)}
                                        icon={<FontAwesomeIcon icon={faTrashCan} fontSize={18} />}
                                    />,
                                ]}
                            >
                                <Row
                                    gutter={16}
                                    style={{
                                        flexDirection: conditionCardWidth > 500 ? "row" : "column",
                                        rowGap: "5px",
                                    }}
                                >
                                    <Col span={conditionCardWidth > 500 ? 8 : 24}>
                                        <Select
                                            placeholder="Select Field"
                                            value={
                                                cond.field
                                                    ? { label: cond.field.label, value: cond.field.namePath }
                                                    : undefined
                                            }
                                            onChange={(selected) => handleFieldChange(cond.id, selected)}
                                            options={getAvailableFields().map((field) => ({
                                                label: field.field.label,
                                                value: field.field.namePath,
                                            }))}
                                            style={{ width: "100%" }}
                                            labelInValue
                                        />
                                    </Col>
                                    <Col span={conditionCardWidth > 500 ? 8 : 24}>
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
                                    <Col span={conditionCardWidth > 500 ? 8 : 24}>
                                        {cond.formConfig && (
                                            <Form>
                                                <FormField
                                                    key={`${cond.field?.namePath}-${cond.condition?.namePath}`}
                                                    fieldKey={`component-${cond.field?.namePath}-${cond.condition?.namePath}`}
                                                    config={{
                                                        ...cond.formConfig,
                                                        name: `conditions[${cond.id}].value`,
                                                        onChange: (value) => handleValueChange(cond.id, value),
                                                        colProps: { span: conditionCardWidth > 500 ? 8 : 24 },
                                                        formInfo: {
                                                            gridForm: false,
                                                            isFormItem: false,
                                                        },
                                                    }}
                                                    showLabel={false}
                                                />
                                            </Form>
                                        )}
                                    </Col>
                                </Row>
                            </CollapsibleCard>
                        ))}
                    </Space>
                    <Divider />
                    <Button type="dashed" onClick={handleAddCondition}>
                        Add Condition
                    </Button>
                </div>

                {/* Generated Query Section */}
                <div style={{ flex: 1 }}>
                    <Divider orientation="left" orientationMargin={0}>
                        Generated Query
                    </Divider>
                    <Typography.Paragraph
                        copyable
                        style={{
                            backgroundColor: "rgba(150, 150, 150, 0.1)",
                            padding: "0.4em 0.6em",
                            borderRadius: "3px",
                            border: "1px solid rgba(100, 100, 100, 0.2)",
                            textAlign: "left",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            fontFamily: "monospace",
                        }}
                    >
                        {JSON.stringify(generateQuery(conditions), null, 2)}
                    </Typography.Paragraph>
                </div>
            </div>
        </Card>
    );
};

QueryBuilder.displayName = "QueryBuilder";

export default QueryBuilder;
