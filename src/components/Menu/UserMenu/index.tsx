import React from 'react'
import { useWeb3React } from '@web3-react/core'
import {
  Flex,
  LogoutIcon,
  useModal,
  UserMenu as UIKitUserMenu,
  UserMenuDivider,
  UserMenuItem,
} from '@pancakeswap/uikit'
import history from 'routerHistory'
import useAuth from 'hooks/useAuth'
import { useProfile } from 'state/profile/hooks'
import ConnectWalletButton from 'components/ConnectWalletButton'
import ConnectWalletLink from 'components/ConnectWalletLink'
import { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import WalletModal, { WalletView, LOW_BNB_BALANCE } from './WalletModal'
import ProfileUserMenuItem from './ProfileUserMenutItem'
import WalletUserMenuItem from './WalletUserMenuItem'

const UserMenu = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { logout } = useAuth()
  const { balance, fetchStatus } = useGetBnbBalance()
  const { isInitialized, isLoading, profile } = useProfile()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const hasProfile = isInitialized && !!profile
  const avatarSrc = profile?.nft?.image?.thumbnail
  const hasLowBnbBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_BNB_BALANCE)

  if (!account) {
    // return <ConnectWalletButton scale="sm" />
    return <ConnectWalletLink scale="sm" />
  }

  return (
    <UIKitUserMenu account={account} avatarSrc={avatarSrc} onPresentWalletModal={onPresentWalletModal}>
      {/* <WalletUserMenuItem hasLowBnbBalance={hasLowBnbBalance} onPresentWalletModal={onPresentWalletModal} />
      <UserMenuItem as="button" onClick={onPresentTransactionModal}>
        {t('Transactions')}
      </UserMenuItem>
      <UserMenuDivider />
      <UserMenuItem as="button" onClick={() => history.push(`${nftsBaseUrl}/profile/${account.toLowerCase()}`)}>
        {t('Your NFTs')}
      </UserMenuItem>
      <ProfileUserMenuItem isLoading={isLoading} hasProfile={hasProfile} />
      <UserMenuDivider />
      <UserMenuItem as="button" onClick={logout}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          {t('Disconnect')}
          <LogoutIcon />
        </Flex>
      </UserMenuItem> */}
    </UIKitUserMenu>
  )
}

export default UserMenu