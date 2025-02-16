import { Drawer, Layout, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import ProfileDropdown from './components/ProfileDropdown'
import './header.css'
import { MenuFoldOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import NavigationMenu from '../Navigation/components/NavigationMenu'
import { useLocation } from 'react-router-dom'
import SearchableMenu from '../Navigation/components/SearchableMenu'
import ThemeDropdown from '@/modules/core/features/Theme/components/ThemeDropdown'
import LangSelector from '@/modules/core/features/Locale/components/LangSelector'
import BranchSelector from '@/modules/organization/features/BranchSelector/components/BranchSelector'

const AntHeader = Layout.Header

const Header: React.FC = () => {
  const location = useLocation()

  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const handleMenuOpen = (_e: React.MouseEvent | React.KeyboardEvent) => {
    setMenuOpen(true)
  }

  const handleMenuClose = (_e?: React.MouseEvent | React.KeyboardEvent) => {
    setMenuOpen(false)
  }

  // on route change
  useEffect(() => {
    handleMenuClose()
    window.scrollTo(0, 0)
  }, [location])

  return (
    <AntHeader
      id="dashboard-header"
      style={{
        position: 'relative',
        padding: '0px 10px 0px 0px',
        background: 'var(--dashboard-item-bg-color) !important',
        color: 'var(--dashboard-item-font-color) !important',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '10px',
        height: '40px',
        boxShadow: 'var(--floating-section-box-shadow)',
        overflow: 'hidden',
      }}
    >
      {/* nav and title */}
      <div className="dashboard-header-section" id="dashboard-header-left-section">
        {/* trigger */}
        <div id="dashboard-menu-trigger" onClick={handleMenuOpen}>
          <FontAwesomeIcon icon={faBars} size="xl" cursor="pointer" color="#fff" />
        </div>
        {/* title */}
        <div id="dashboard-title-section">
          <h3 id="app-title">Fliery ERP Web Portal</h3>
        </div>
        {/* drawer nav */}
        <Drawer
          placement="left"
          open={menuOpen}
          onClose={handleMenuClose}
          closeIcon={null}
          title={'Fliery ERP Web Portal'}
          styles={{
            body: { padding: 5 },
            header: { maxHeight: '40px', backgroundColor: 'var(--dashboard-item-bg-color)', color: 'var(--dashboard-item-font-color)' },
          }}
          width={320}
          extra={
            <Space>
              <MenuFoldOutlined style={{ fontSize: '26px', cursor: 'pointer' }} onClick={handleMenuClose} />
            </Space>
          }
        >
          {/* menu */}
          <SearchableMenu />
          <NavigationMenu />
        </Drawer>
      </div>
      {/* search */}
      <div className="dashboard-header-section" id="dashboard-header-center-section">
        <SearchableMenu />
      </div>
      {/* right side features */}
      <div className="dashboard-header-section" id="dashboard-header-right-section">
        <ThemeDropdown />
        <LangSelector />
        <BranchSelector />
        <ProfileDropdown />
      </div>
    </AntHeader>
  )
}

export default Header
