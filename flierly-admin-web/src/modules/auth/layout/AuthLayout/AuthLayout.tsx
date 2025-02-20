import React, { useEffect } from 'react'
import SideContent from '../../components/SideContent'
import { Layout, Col, Row } from 'antd'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@/modules/core/components/ErrorFallback'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import LangSelector from '@/modules/core/features/Locale/components/LangSelector'
import ThemeToggler from '@/modules/core/features/Theme/components/ThemeToggler'
import { Outlet, useLocation } from 'react-router-dom'

const { Header, Footer } = Layout;
/**
 * AuthLayout component to display authentication forms with layout and localization.
 *
 */
const AuthLayout: React.FC = () => {
  const { langDirection } = useLocale()
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    return () => {

    }
  }, [pathname])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Layout
        style={{
          textAlign: langDirection === 'rtl' ? 'right' : 'left',
          direction: langDirection,
          minHeight: '100vh',
        }}
      >
        {/* Header */}
        <Header
          style={{
            padding: '15px',
            display: 'flex',
            flexDirection: langDirection === 'rtl' ? 'row' : 'row-reverse',
            alignItems: 'center',
            gap: '15px',
            background: 'var(--bg-color-secondary-flierly) !important',
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <LangSelector />
          <ThemeToggler />
        </Header>
        <Row
          style={{
            minHeight: '100vh',
          }}
        >
          {/* Right-side content */}
          <Col
            xs={0}
            sm={0}
            md={12}
            lg={14}
            style={{
              borderRight: '1px solid rgba(5, 5, 5, 0.06)',
              minHeight: "100dvh",

            }}
          >
            <SideContent />
          </Col>
          {/* Main authentication content */}
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={10}
            style={{
              padding: "10px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around"

            }}
          >
            {/* Main Content */}
            <Outlet />
          </Col>
        </Row>
        <Footer style={{ textAlign: 'center' }}>
          Flierly ©2024 Created by Flierly Team
        </Footer>
      </Layout>
    </ErrorBoundary>
  )
}

export default AuthLayout
