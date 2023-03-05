import React from 'react'
import { Button, useWalletModal, useMatchBreakpoints } from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const ConnectWalletLink = (props: any) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const { isMobile } = useMatchBreakpoints()

  return (
    <>
      {isMobile && (
        <Button
          onClick={onPresentConnectModal}
          {...props}
          style={{
            display: 'flex',
            textAlign: 'center',
            background: 'transparent',
            fontSize: '16px',
            fontFamily: 'Poppins',
            '&:hover': {
              fontSize: '17px',
            },
          }}
        >
          {t('Connect Wallet')}
        </Button>
      )}
      {!isMobile && (
        <Button
          onClick={onPresentConnectModal}
          {...props}
          style={{
            display: 'flex',
            textAlign: 'center',
            background: 'transparent',
            fontSize: '16px',
            fontFamily: 'Poppins',
            width: 'max-content',
            '&:hover': {
              fontSize: '17px',
            },
          }}
        >
          {t('Connect Wallet')}
        </Button>
      )}
    </>
  )
}

export default ConnectWalletLink
