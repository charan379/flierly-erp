import { ProColumns } from "@ant-design/pro-components"
import { Tag } from "antd";
import formatDateToLocaleTimezone from "./format-date-time-to-locale-timezone";

export const createIdColumn = (translate: (value: string) => string, config?: { width?: number }): ProColumns => {

    return {
        title: translate("id"),
        dataIndex: 'id',
        key: 'id',
        valueType: 'digit',
        search: false,
        width: config?.width ?? 80,
        sorter: true,
        defaultSortOrder: 'ascend',
    };
};

export const createNameColumn = (translate: (value: string) => string, config?: { width?: number }): ProColumns => {

    return {
        title: translate('name'),
        dataIndex: 'name',
        key: 'name',
        valueType: 'text',
        sorter: true,
        width: config?.width ?? 250,
    };
};

export const createDescriptionColumn = (translate: (value: string) => string, config?: { width?: number }): ProColumns => {

    return {
        title: translate('description'),
        dataIndex: 'description',
        key: 'description',
        valueType: 'text',
        ellipsis: true,
        width: config?.width ?? 250,
    };
};

export const createEntityColumn = (translate: (value: string) => string, config?: { width?: number }): ProColumns => {

    return {
        title: translate('entity'),
        dataIndex: 'entity',
        key: 'entity',
        valueType: 'text',
        sorter: true,
        width: config?.width ?? 180,
    };
};

export const createCodeColumn = (translate: (value: string) => string, config?: { width?: number }): ProColumns => {

    return {
        title: translate('code'),
        dataIndex: 'code',
        key: 'code',
        valueType: 'text',
        copyable: true,
        width: config?.width ?? 250,
    };
};

export const createMobileColumn = (translate: (value: string) => string, config?: { width?: number }): ProColumns => {

    return {
        title: translate('mobile'),
        dataIndex: 'mobile',
        key: 'mobile',
        valueType: 'text',
        sorter: true,
        copyable: true,
        width: config?.width ?? 150,
    };
};

export const createEmailColumn = (translate: (value: string) => string, config?: { width?: number }): ProColumns => {

    return {
        title: translate('email'),
        dataIndex: 'email',
        key: 'email',
        valueType: 'text',
        sorter: true,
        copyable: true,
        width: config?.width ?? 200,
    };
};

export const createBooleanColumn = (translate: (value: string) => string, config?: { width?: number, title?: string, dataIndex?: string }): ProColumns => {
    return {
        title: config?.title ?? translate('status'),
        dataIndex: config?.dataIndex ?? 'isActive',
        key: config?.dataIndex ?? 'isActive',
        valueType: 'switch',
        width: config?.width ?? 80,
        align: 'center',
        render: (_text, entity) => {
            return !entity.isActive ? <Tag color="red">{translate("in_active")}</Tag> : <Tag color="green">{translate('active')}</Tag>
        },
    };
};


export const createTimeStampColumn = (translate: (value: string) => string, config?: { width?: number, title: string, dataIndex: string }): ProColumns => {

    return {
        title: config?.title ?? translate('time_stamp'),
        dataIndex: config?.dataIndex ?? 'timeStamp',
        key: config?.dataIndex ?? 'timeStamp',
        valueType: 'text',
        sorter: true,
        width: config?.width ?? 150,
        renderText(text, _record, _index, _action) {
            return formatDateToLocaleTimezone(text, 'DD-MM-YYYY HH:mm:ss', true)
        },
    };
};