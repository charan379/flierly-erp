import React, { ReactNode, CSSProperties } from 'react'
import ErrorFallback from '@/components/ErrorFallback'
import { Layout, Menu, Typography } from 'antd'
import { ErrorBoundary } from 'react-error-boundary'
import createMenuItems from '../../layout/Dashboard/Navigation/utils/create-menu-items'
import useTheme from '@/features/Theme/hooks/useTheme'
import useLocale from '@/features/Locale/hooks/useLocale'
import CrudModuleContextProvider from './context/CrudModuleContextProvider'
import { useAuth } from '@/modules/auth/hooks/useAuth'

const { Header, Content, Footer } = Layout

type CrudModuleProps = {
  header?: boolean
  title?: string | ReactNode
  extra?: ReactNode[]
  menuKeys?: React.Key[]
  footer?: ReactNode
  children: ReactNode
}

/**
 * CrudModule is HOC component to structure a layout with optional header, footer, and error boundary and wraps under CrudModuleContextProvider.
 * footer wont be dispalyed in this layout
 */
const CrudModule: React.FC<CrudModuleProps> = ({ header, footer, extra, title, menuKeys, children }) => {
  const { theme } = useTheme()
  const { translate: t } = useLocale()
  const { hasPermission } = useAuth();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CrudModuleContextProvider>
        <Layout style={styles.layout}>
          {header && (
            <Header style={styles.header}>
              {typeof title === 'string' ? (
                <Typography.Title level={4} style={{ marginBottom: '1em' }}>
                  {title}
                </Typography.Title>
              ) : (
                title
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '10px',
                }}
              >
                {menuKeys && menuKeys?.length > 0 ? (
                  <Menu
                    theme={theme}
                    className="no-scrollbar"
                    items={createMenuItems(t, hasPermission).filter((m) => menuKeys.includes(m.key))}
                    mode="horizontal"
                    selectable={false}
                    style={{
                      maxHeight: 'inherit',
                      width: '100%',
                      minWidth: '200px',
                      backgroundColor: 'inherit',
                      border: 'none',
                      display: 'flex',
                      flexDirection: 'row-reverse',
                    }}
                  />
                ) : null}
                {extra}
              </div>
            </Header>
          )}
          <Content className="sb-thumb-md" style={styles.content}>
            {children}
          </Content>
          {footer && <Footer style={styles.footer}>{footer}</Footer>}
        </Layout>
      </CrudModuleContextProvider>
    </ErrorBoundary>
  )
}

export default CrudModule

const styles: Record<string, CSSProperties> = {
  layout: {
    height: '100%',
    width: '100%',
  },
  header: {
    padding: '0px 10px',
    display: 'flex',
    backgroundColor: 'inherit',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'hidden',
    maxHeight: '40px',
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'center',
    padding: '1px 5px',
    flexWrap: 'wrap',
    overflow: 'auto',
  },
  footer: {
    width: '100%',
    display: 'none',
    padding: '0px',
  },
}
