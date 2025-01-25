import React from 'react'
import SideContent from '../../components/SideContent'
import { Layout, Typography, Col, Divider, Row } from 'antd'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@/modules/core/components/ErrorFallback'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import LangSelector from '@/modules/core/features/Locale/components/LangSelector'
import ThemeToggler from '@/modules/core/features/Theme/components/ThemeToggler'

const { Content, Header } = Layout
const { Title } = Typography

/**
 * AuthLayout component to display authentication forms with layout and localization.
 *
 */
const AuthLayout: React.FC<{
  children: React.ReactNode
  title: string
  isForSignUp?: boolean
}> = ({ children, title, isForSignUp = false }) => {
  const { translate, langDirection } = useLocale()

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Layout
        style={{
          textAlign: langDirection === 'rtl' ? 'right' : 'left',
          direction: langDirection,
        }}
      >
        <Row>
          {/* Right-side content */}
          <Col
            xs={0}
            sm={0}
            md={11}
            lg={12}
            style={{
              minHeight: '100vh',
              background: 'var(--bg-color-secondary-flierly) !important',
            }}
          >
            <SideContent />
          </Col>

          {/* Main authentication content */}
          <Col
            xs={24}
            sm={24}
            md={13}
            lg={12}
            style={{
              minHeight: '100vh',
              background: 'var(--bg-color-primary-lite-flierly) !important',
            }}
          >
            {/* Header */}
            <Header
              style={{
                padding: '15px',
                background: 'var(--bg-color-primary-lite-flierly)',
                display: 'flex',
                flexDirection: langDirection === 'rtl' ? 'row' : 'row-reverse',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <LangSelector />
              <ThemeToggler />
            </Header>

            {/* Main Content */}
            <Content
              style={{
                padding: isForSignUp ? '40px 30px 30px' : '100px 30px 30px',
                maxWidth: '440px',
                margin: '0 auto',
              }}
            >
              <Col xs={24} sm={24} md={0}>
                <img src="/vite.svg" alt="Flierly" style={{ margin: '0 auto 20px', display: 'block' }} height={63} width={220} />
                <div className="space10" />
              </Col>
              <Title level={1}>{translate(title)}</Title>
              <Divider />
              <div className="site-layout-content">{children}</div>
            </Content>
          </Col>
        </Row>
      </Layout>
    </ErrorBoundary>
  )
}

export default AuthLayout
