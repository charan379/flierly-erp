import { ItemType, MenuItemType } from 'antd/es/menu/interface'
import { Link } from 'react-router-dom'
import React from 'react'
import createSiteMapItems from '@/modules/core/utils/create-sitemap-items'

export type NavMenuItemType = {
  keywords?: string[]
  key: React.Key
  icon?: React.ReactNode
  label: React.ReactNode
  disabled?: boolean
  children?: NavMenuItemType[]
} & ItemType<MenuItemType>

// Must be called in a react component only
const createMenuItems = (t: (value: string) => string, hasPermission: (requiredPermissionRegex: RegExp) => boolean): NavMenuItemType[] => {

  const getLinkStyle = (permissionRegex?: RegExp): React.CSSProperties => {
    if (permissionRegex) {
      return {
        color: 'inherit',
        pointerEvents: hasPermission(permissionRegex) ? 'all' : 'none',
      }
    }

    return {
      color: 'inherit',
    }
  }

  const items: NavMenuItemType[] = [];

  const siteMapItems = createSiteMapItems(t, hasPermission);

  for (const siteMapItem of siteMapItems) {
    if (siteMapItem.parentItemId) continue;

    const children = siteMapItems.filter((item) => item.parentItemId === siteMapItem.id)

    items.push({
      key: siteMapItem.id,
      icon: siteMapItem.icon,
      label: siteMapItem?.resourcePath
        ? <Link to={siteMapItem.resourcePath} style={getLinkStyle(siteMapItem.permission)}>
          {siteMapItem.name}
        </Link>
        : siteMapItem.name,
      disabled: siteMapItem.isDisabled,
      keywords: siteMapItem.keywords,
      children: children.length > 0 ? children?.map((child) => ({
        key: child.id,
        icon: child.icon,
        label: child?.resourcePath
          ? <Link to={child.resourcePath} style={getLinkStyle(child.permission)}>
            {child.name}
          </Link>
          : child.name,
        disabled: child.isDisabled,
        keywords: child.keywords,
      }),
      ) : undefined,
    })
  };

  return items
}

export default createMenuItems
