import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Button, Card, Row, Col, Select, Space, Divider, Typography, Form, Tooltip, Flex, Checkbox } from 'antd'
import FormField, { FormFieldConfig } from '@/components/FormField'
import queryTransformers, { TransformerKey } from '@/utils/query-transformers'
import CollapsibleCard from './components/CollapsibleCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import useElementWidth from '@/hooks/useElementWidth'
import { CloseCircleOutlined } from '@ant-design/icons'
import { v1 as uuidv1 } from 'uuid';

export type QueryFieldConfig<T = Record<string, any>> = {
  field: { label: string; namePath: keyof T }
  conditions: {
    condition: { label: string; namePath: TransformerKey }
    formField: FormFieldConfig<T>
  }[]
}

export type QueryCondition = {
  id: string
  field?: { label: string; namePath: string }
  condition?: { label: string; namePath: TransformerKey }
  value?: any
  formConfig?: FormFieldConfig
  isValid?: boolean
}

interface QueryBuilderProps {
  config: QueryFieldConfig[]
  initialConditions?: QueryCondition[] // New prop for initial conditions
}

export interface QueryBuilderRef {
  getQuery: () => Record<string, any> // Method to get the query
  resetQuery: () => void // Method to reset conditions
  getConditions: () => QueryCondition[] // Method to get the current conditions
}

const QueryBuilder = forwardRef<QueryBuilderRef, QueryBuilderProps>(({ config, initialConditions = [] }, ref) => {
  const [conditions, setConditions] = useState<QueryCondition[]>(initialConditions)
  const [showQueryPreview, setShowQueryPreview] = useState(false) // State to toggle query preview
  const { ref: conditionCardRef, width: conditionCardWidth } = useElementWidth<HTMLDivElement>()

  const handlePreviewToggle = (e: any) => {
    setShowQueryPreview(e.target.checked) // Update state based on checkbox value
  }

  const generateQuery = (queryConditions: QueryCondition[]): Record<string, any> => {
    const query: Record<string, any> = {}

    queryConditions.forEach((queryCondition) => {
      if (queryCondition?.condition && queryCondition?.field) {
        const transformerKey = queryCondition.condition?.namePath
        const transformerFn = queryTransformers[transformerKey]

        if (transformerFn) {
          const result = transformerFn(queryCondition.value, queryCondition.field.namePath, undefined)
          if (result) {
            Object.assign(query, result)
          }
        }
      }
    })

    return query
  }

  const handleAddCondition = () => {
    // Only allow adding condition if the last one is valid
    const lastCondition = conditions[conditions.length - 1]
    if ((lastCondition && lastCondition.isValid) || conditions.length === 0) {
      setConditions([
        ...conditions,
        {
          id: uuidv1(), // Unique ID for each condition
          isValid: false, // New condition is initially invalid
        },
      ])
    }
  }

  const handleFieldChange = (id: string, selected: { label: string; value: string }) => {
    const selectedField = config.find((field) => field.field.namePath === selected.value)
    setConditions((prev) =>
      prev.map((cond) =>
        cond.id === id
          ? {
            ...cond,
            field: selectedField?.field,
            condition: undefined,
            value: null, // Reset value when field changes
            formConfig: undefined,
            isValid: false, // Reset validity when field changes
          }
          : cond,
      ),
    )
  }

  const handleConditionChange = (id: string, namePath: string) => {
    setConditions((prev) =>
      prev.map((cond) => {
        if (cond.id === id) {
          const fieldConfig = config.find((field) => field.field.namePath === cond.field?.namePath)
          const selectedCondition = fieldConfig?.conditions.find((condition) => condition.condition.namePath === namePath)

          return {
            ...cond,
            condition: selectedCondition?.condition,
            formConfig: selectedCondition?.formField,
            value: null, // Reset value when the condition changes
            isValid: false, // Reset validity when condition changes
          }
        }
        return cond
      }),
    )
  }

  const handleValueChange = (id: string, value: any) => {
    setConditions((prev) =>
      prev.map((cond) => {
        const isValid = cond.field && cond.condition && value !== null && value !== undefined && value !== ''
        return cond.id === id ? { ...cond, value, isValid } : cond
      }),
    )
  }

  const handleRemoveCondition = (id: string) => {
    setConditions((prev) => prev.filter((cond) => cond.id !== id))
  }

  const getAvailableFields = (): QueryFieldConfig[] => {
    const usedFields = conditions.map((cond) => cond.field?.namePath)
    return config.filter((field) => !usedFields.includes(field.field.namePath))
  }

  // Expose methods to the parent via ref
  useImperativeHandle(ref, () => ({
    getQuery: () => generateQuery(conditions),
    resetQuery: () => {
      setConditions([])
    },
    getConditions: () => conditions, // Expose current conditions
  }))

  return (
    <Card
      style={{ margin: '20px auto', padding: '24px', minWidth: '80%', maxWidth: 1200 }}
      title="Query Builder"
      styles={{
        title: { textAlign: 'left' },
      }}
    >
      {/* Conditions Section */}
      <Space direction="vertical" size="middle" style={{ width: '100%', textAlign: 'left' }}>
        {conditions.map((cond, index) => (
          <CollapsibleCard
            key={`cond-${cond.id}`}
            title={
              <Flex gap={10}>
                {cond.field?.label || `Condition ${index + 1}`}
                {!cond?.isValid ? (
                  <Tooltip title="Invalid Condition">
                    <CloseCircleOutlined style={{ color: 'crimson', fontSize: '14px' }} />
                  </Tooltip>
                ) : (
                  <></>
                )}
              </Flex>
            }
            ref={conditionCardRef}
            actions={[
              <Button
                key={'action-1'}
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
                flexDirection: conditionCardWidth > 500 ? 'row' : 'column',
                rowGap: '5px',
              }}
            >
              <Col span={conditionCardWidth > 500 ? 8 : 24}>
                <Select
                  placeholder="Select Field"
                  value={cond.field ? { label: cond.field.label, value: cond.field.namePath } : undefined}
                  onChange={(selected) => handleFieldChange(cond.id, selected)}
                  options={getAvailableFields().map((field) => ({
                    label: field.field.label,
                    value: field.field.namePath,
                  }))}
                  style={{ width: '100%', textAlign: 'left' }}
                  dropdownStyle={{ textAlign: 'left' }}
                  labelInValue
                  showSearch
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
                  style={{ width: '100%', textAlign: 'left' }}
                  dropdownStyle={{ textAlign: 'left' }}
                  showSearch
                />
              </Col>
              <Col span={conditionCardWidth > 500 ? 8 : 24}>
                {cond.formConfig && (
                  <Form>
                    <FormField
                      key={`${cond.id}-${cond.condition?.namePath}`} // Ensure re-render on condition change
                      fieldKey={`component-${cond.field?.namePath}-${cond.condition?.namePath}`}
                      config={{
                        ...cond.formConfig, // Pass dynamic form configuration
                        name: `conditions[${cond.id}].value`, // Unique name for the form field
                        value: cond.value, // Bind value to the condition's state
                        onChange: (value) => handleValueChange(cond.id, value), // Update condition value
                        colProps: { span: conditionCardWidth > 500 ? 8 : 24 }, // Adjust column layout dynamically
                        formInfo: {
                          gridForm: false,
                          isFormItem: false,
                        },
                      }}
                      showLabel={false} // Hide the label to keep the UI clean
                    />
                  </Form>
                )}
              </Col>
            </Row>
          </CollapsibleCard>
        ))}
        <Checkbox onChange={handlePreviewToggle} checked={showQueryPreview} style={{ margin: '10px 0px 10px 0px' }}>
          Preview Query
        </Checkbox>
        <Button
          type="primary"
          onClick={handleAddCondition}
          disabled={(conditions.length !== 0 && !conditions[conditions.length - 1]?.isValid) || conditions?.length >= config?.length} // Disable Add Condition button if last condition is invalid
        >
          Add Condition
        </Button>
      </Space>

      {/* Generated Query Section */}
      {showQueryPreview ? (
        <React.Fragment>
          <Divider orientation="left" orientationMargin={0}>
            Generated Query
          </Divider>
          <Typography.Paragraph
            copyable
            style={{
              backgroundColor: 'rgba(150, 150, 150, 0.1)',
              padding: '0.4em 0.6em',
              borderRadius: '3px',
              border: '1px solid rgba(100, 100, 100, 0.2)',
              textAlign: 'left',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily: 'monospace',
            }}
          >
            {JSON.stringify(generateQuery(conditions), null, 2)}
          </Typography.Paragraph>
        </React.Fragment>
      ) : (
        <></>
      )}
    </Card>
  )
})

QueryBuilder.displayName = 'QueryBuilder'

export default QueryBuilder
