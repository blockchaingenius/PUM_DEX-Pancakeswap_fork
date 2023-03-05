import React from 'react'
import { Button, useWalletModal } from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const ConnectWalletButton = (props: any) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <Button
      onClick={onPresentConnectModal}
      {...props}
      style={{
        background: '#3acaff',
        fontSize: '16px',
        fontFamily: 'Poppins',
        borderRadius: '24px',
      }}
    >
      {t('Connect Wallet')}
    </Button>
  )
}

export default ConnectWalletButton
