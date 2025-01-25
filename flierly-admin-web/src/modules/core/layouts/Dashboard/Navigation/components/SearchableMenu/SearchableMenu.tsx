import React, { useState } from 'react'
import { AutoComplete, Flex } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import createSiteMapItems, { SiteMapItem } from '@/modules/core/utils/create-sitemap-items'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'

const SearchableMenu: React.FC = () => {
  const [options, setOptions] = useState<{ label: JSX.Element; value: string }[]>([])
  const { translate } = useLocale()
  const { hasPermission } = useAuth();
  const siteMapItems = createSiteMapItems(translate, hasPermission);

  const handleSearch = (value: string) => {
    if (!value) {
      setOptions([])
      return
    }

    const lowerCaseValue = value.toLowerCase()

    const matchingItems = siteMapItems.filter((item) => {
      const keywordMatch = item.keywords.some((keyword) => keyword.toLowerCase().includes(lowerCaseValue))
      return keywordMatch
    })

    const options = matchingItems.map((item) => ({
      label: <LabelRender item={item} />,
      value: item.id.toString(),
    }))

    setOptions(options)
  }

  return (
    <AutoComplete
      style={{ width: '100%', minWidth: '300px' }}
      options={options}
      onSearch={handleSearch}
      placeholder="Search menu..."
      prefix={<SearchOutlined />}
      dropdownRender={(menu) => {
        return <div>{menu}</div>
      }}
    />
  )
}

const LabelRender: React.FC<{ item: SiteMapItem }> = (props) => {
  const { item } = props

  return (
    <Flex
      align="center"
      justify="flex-start"
      gap={8}
      key={item.id}
      style={{
        padding: '8px 0',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
    >
      <span>{item?.icon}</span>
      <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{item?.name}</span>
    </Flex>
  )
}

export default SearchableMenu
