import useResponsive from '@/hooks/useResponsive';
import { Select } from 'antd';
import React from 'react';
import languageOptions from './languageOptions';
import useLocale from '@/redux/locale/useLocale';

const LangSelector = () => {

    const { isMobile } = useResponsive();
    const { langCode, setLanguage } = useLocale();
    return (
        <Select
            showSearch
            defaultValue={langCode}
            loading={false}
            options={languageOptions()}
            onChange={(newLangCode) => setLanguage(newLangCode)}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().startsWith((optionB?.label ?? '').toLowerCase())
            }
            style={{
                width: isMobile ? '90px' : '130px',
                float: 'right',
                marginTop: '5px',
                cursor: 'pointer',
                direction: 'ltr',
            }}
            size='large'
        ></Select>
    )
}

export default LangSelector