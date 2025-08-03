import { Modal, Typography } from 'antd'
import React, { Suspense, useEffect, useState } from 'react'
import PageLoader from '../../../core/components/PageLoader'
import { useNavigate } from 'react-router-dom'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'

const LoginForm = React.lazy(() => import('@/modules/auth/forms/LoginForm'))

interface ReAuthenticate {
  tokenExpiresAt: string // Expiration time of the token
  onExpiryNavigateToURL: string
}

const ReAuthenticate: React.FC<ReAuthenticate> = ({ tokenExpiresAt, onExpiryNavigateToURL }) => {
  const [showModal, setShowModal] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [closeEnabled, setCloseEnabled] = useState(true)
  const [isClosedRecently, setIsClosedRecently] = useState(false)

  const { translate: t } = useLocale();

  const navigate = useNavigate()

  useEffect(() => {
    const tokenExpirationTime = new Date(tokenExpiresAt).getTime()

    const updateTimeLeft = () => {
      const currentTime = new Date().getTime()
      const timeRemaining = tokenExpirationTime - currentTime
      setTimeLeft(timeRemaining)

      if (timeRemaining <= 10 * 60 * 1000 && timeRemaining > 0) {
        setCloseEnabled(false) // Disable closing modal if < 10 minutes left
      } else {
        setCloseEnabled(true) // Enable closing modal otherwise
      }

      // Show modal if:
      // - Token is expiring within 1 hour AND was not recently closed
      // - OR Token is in the last 5 minutes
      if ((timeRemaining <= 60 * 60 * 1000 && timeRemaining > 0 && !isClosedRecently) || (timeRemaining <= 5 * 60 * 1000 && timeRemaining > 0)) {
        setShowModal(true)
      } else if (timeRemaining <= 0) {
        setShowModal(false)
        navigate(onExpiryNavigateToURL, { replace: true })
      }
    }

    // Initial check
    updateTimeLeft()

    // Start a timer to update the time left every second
    const intervalId = setInterval(updateTimeLeft, 1000)

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId)
  }, [tokenExpiresAt, isClosedRecently, navigate, onExpiryNavigateToURL])

  // Format the time left as a countdown string
  const formatTimeLeft = () => {
    if (timeLeft === null || timeLeft <= 0) return t('text.token_expired')

    const hours = Math.floor(timeLeft / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

    return `${hours}h ${minutes}m ${seconds}s ${t('text.time_remaining')}`
  }

  const handleSuccessLogin = () => {
    setShowModal(false);
  };

  return (
    <Modal
      open={showModal}
      closable={closeEnabled}
      footer={
        timeLeft !== null &&
        timeLeft > 0 && (
          <Typography.Paragraph type="danger" style={{ textAlign: 'left', display: 'block' }}>
            {`${t('text.your_session_expires_soon')}: ${formatTimeLeft()}. ${t('text.please_reauthenticate')}`}
          </Typography.Paragraph>
        )
      }
      styles={{
        mask: {
          backgroundColor: 'rgb(0 0 0 / 75%)',
        },
        body: {
          minHeight: 180,
        },
      }}
      onCancel={() => {
        if (closeEnabled) {
          setShowModal(false)
          setIsClosedRecently(true)

          // Reset `wasClosedRecently` after 10 minutes
          setTimeout(
            () => {
              setIsClosedRecently(false)
            },
            10 * 60 * 1000,
          )
        }
      }}
    >
      <Suspense fallback={<PageLoader />}>
        <LoginForm redirectOnLogin={false} isForPopup onLoginSuccess={handleSuccessLogin} />
      </Suspense>
    </Modal>
  )
}

export default ReAuthenticate
