import useLocale from '@/features/Language/hooks/useLocale';
import { GlobalOutlined, InfoCircleOutlined, NumberOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Select, Tag } from 'antd';
import React from 'react'

const AddCustomer = () => {
    const { translate, langDirection } = useLocale(); // Using the custom hook to get translation function and language direction

    const options = [
        { label: "Red", color: "red", value: "red", },
        { label: "Blue", color: "blue", value: "blue", },
        { label: "Green", color: "green", value: "green", },
        { label: "Gold", color: "gold", value: "gold", },
    ];

    return (
        <div style={{ direction: langDirection }}>
            {/* name */}
            <Form.Item
                label={translate("name")}
                name="name"
                rules={[
                    // Validation rules
                    { required: true, message: translate("name_is_required") },
                    { type: "string" },
                ]}
                tooltip={{
                    title: translate("name_is_required"), // Tooltip text
                    icon: <InfoCircleOutlined />, // Tooltip icon
                }}
            >
                <Input
                    placeholder={translate("name")}
                    size="large" // Size of the input field
                />
            </Form.Item>
            {/* age */}
            <Form.Item
                label={translate("age")}
                name="age"
                rules={[
                    // Validation rules
                    { required: true, message: translate("age_is_required") },
                    { min: 12, message: translate("age_should_be_greater_then_12"), warningOnly: true, type: 'number' },
                    { type: "number" },
                ]}
                tooltip={{
                    title: translate("age_is_required"), // Tooltip text
                    icon: <InfoCircleOutlined />, // Tooltip icon
                }}
            >
                <InputNumber
                    style={{ width: "100%" }}
                    prefix={<NumberOutlined className="site-form-item-icon" />} // Prefix icon for the input field
                    placeholder={translate("age")}
                    size="large" // Size of the input field
                />
            </Form.Item>
            {/* address */}
            <Form.Item
                label={translate("address")}
                name="address"
                rules={[
                    // Validation rules
                    { required: true, message: translate("address_is_required") },
                    { type: "string" },
                ]}
                tooltip={{
                    title: translate("address_is_required"), // Tooltip text
                    icon: <InfoCircleOutlined />, // Tooltip icon
                }}
            >
                <Input
                    prefix={<GlobalOutlined className="site-form-item-icon" />} // Prefix icon for the input field
                    placeholder={translate("address")}
                    size="large" // Size of the input field
                />
            </Form.Item>
            {/* tags */}
            <Form.Item
                label={translate("tags")}
                name="tags"
                rules={[
                    // Validation rules
                    { required: true, message: translate("tags_is_required") },
                    { type: "array" },
                ]}
                tooltip={{
                    title: translate("tags_is_required"), // Tooltip text
                    icon: <InfoCircleOutlined />, // Tooltip icon
                }}
            >
                <Select
                    mode='tags'
                    options={options}
                    style={{
                        width: '100%',
                    }}
                    tagRender={(props) => {
                        const { label, value, closable, onClose } = props;
                        const onPreventMouseDown = (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                        };
                        return (
                            <Tag
                                color={value}
                                onMouseDown={onPreventMouseDown}
                                closable={closable}
                                onClose={onClose}
                                style={{
                                    marginInlineEnd: 4,
                                }}
                            >
                                {label}
                            </Tag>
                        );
                    }}
                />
            </Form.Item>
        </div>)
}

export default AddCustomer;