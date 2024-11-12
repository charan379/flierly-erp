import React from 'react';
import { Select } from 'antd';
import useResponsive from '@/hooks/useResponsive';
import useLocale from '@/features/Locale/hooks/useLocale';
import languageOptions from '../../config/languageOptions';

const LangSelector: React.FC = () => {
    const { isMobile } = useResponsive();
    const { langCode, setLanguage } = useLocale();

    return (
        <Select
            showSearch
            defaultValue={langCode}
            loading={false}
            options={languageOptions()}
            onChange={(newLangCode: string) => setLanguage(newLangCode)}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            style={{
                width: isMobile ? '90px' : '130px',
                float: 'right',
                cursor: 'pointer',
                direction: 'ltr',
            }}
            size="large"
        />
    );
};

export default LangSelector;
