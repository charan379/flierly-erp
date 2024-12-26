import React, { useState } from 'react'
import { AutoComplete, Flex } from 'antd'
import getMenuItems, { NavMenuItemType } from '../../utils/getMenuItems'
import { SearchOutlined } from '@ant-design/icons'

interface SearchableItem {
  menuKey: React.Key
  keywords: string[]
  isChild: boolean
  parentKey?: React.Key
}

const SearchableMenu: React.FC = () => {
  const [options, setOptions] = useState<{ label: JSX.Element; value: string }[]>([])

  const menuItems = getMenuItems()

  const getSearchableItems = (menuItems: NavMenuItemType[]): SearchableItem[] => {
    return menuItems.flatMap((item) => {
      const keywords: SearchableItem[] = []

      if (item.key && item.keywords) {
        keywords.push({
          menuKey: item.key,
          keywords: item.keywords,
          isChild: false,
        })
      }

      if (item.children) {
        item.children.forEach((child) => {
          if (child.key && child.keywords) {
            keywords.push({
              menuKey: child.key,
              keywords: child.keywords,
              isChild: true,
              parentKey: item.key,
            })
          }
        })
      }

      return keywords
    })
  }

  const searchableItems = getSearchableItems(menuItems)

  const handleSearch = (value: string) => {
    if (!value) {
      setOptions([])
      return
    }

    const lowerCaseValue = value.toLowerCase()

    const matchingItems = searchableItems.filter((item) => {
      const keywordMatch = item.keywords.some((keyword) => keyword.toLowerCase().includes(lowerCaseValue))
      return keywordMatch
    })

    const options = matchingItems.map((item) => ({
      label: <LabelRender item={item} menuItems={menuItems} />,
      value: item.menuKey.toString(),
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

const LabelRender: React.FC<{ item: SearchableItem; menuItems: NavMenuItemType[] }> = (props) => {
  const { item, menuItems } = props

  if (item.isChild) {
    const parentItem = menuItems.find((pMenuItem) => pMenuItem.key === item.parentKey)
    const childItem = parentItem?.children?.find((cMenuItem) => cMenuItem.key === item.menuKey)
    if (!childItem) return
    return (
      <Flex align="center" justify="flex-start" gap={5} key={childItem.key}>
        <span>{childItem?.icon}</span>
        {childItem?.label}
      </Flex>
    )
  }

  const menuItem = menuItems.find((menuItem) => menuItem.key === item.menuKey)

  if (!menuItem) return

  return (
    <div>
      <Flex
        align="center"
        justify="flex-start"
        gap={8}
        key={menuItem.key}
        style={{
          padding: '8px 0',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        <span>{menuItem?.icon}</span>
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{menuItem?.label}</span>
      </Flex>

      {menuItem?.children?.map?.((childItem) => (
        <Flex
          align="center"
          justify="flex-start"
          gap={8}
          key={childItem.key}
          style={{
            padding: '6px 0',
            marginLeft: 20, // Indentation for child items
            cursor: 'pointer',
          }}
        >
          <span>{childItem?.icon}</span>
          <span style={{ fontSize: '12px' }}>{childItem?.label}</span>
        </Flex>
      ))}
    </div>
  )
}

export default SearchableMenu
