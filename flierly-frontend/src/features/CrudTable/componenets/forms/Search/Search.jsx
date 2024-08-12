import useLocale from '@/locale/useLocale';
import { SearchOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components'
import { Button } from 'antd';
import React from 'react'

const Search = ({ formFields, title = "search" }) => {

    const { langDirection, translate } = useLocale();
    return (
        <ModalForm
            // Title of modal
            title={title}
            // trigger button to toggle form
            trigger={
                <Button
                    type="primary"
                    key={`model-search-form-trigger`}
                    icon={<SearchOutlined />}
                    style={{ backgroundColor: "#722ed1" }}
                >
                    {translate("search")}
                </Button>
            }
            // modal props
            modalProps={{
                destroyOnClose: true,
                centered: true
            }}
            // submitter configuration
            submitter={{ searchConfig: { resetText: translate("cancel"), submitText: translate("search") } }}
        >
            {formFields}
        </ModalForm>
    )
}

export default Search