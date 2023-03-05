import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Pair } from '@pancakeswap/sdk'
import { Text, Flex, CardBody, CardFooter, Button, AddIcon } from '@pancakeswap/uikit'
import { Link } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import FullPositionCard from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import Dots from '../../components/Loader/Dots'
import { AppHeader, AppBody } from '../../components/App'
import Page from '../Page'
import QuestionHelper from '../../components/QuestionHelper'
// import Logo from "./logo_Pum.png"

const Body = styled(CardBody)`
  // background-color: ${({ theme }) => theme.colors.dropdownDeep};
  background-color: #fff; //K_K
`

export default function Pool() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const renderBody = () => {
    if (!account) {
      return (
        <Text color="#bdc2c4" fontSize="16px" fontWeight="400" fontFamily="Poppins" textAlign="center">
          {t('Connect to a wallet to view your liquidity.')}
        </Text>
      )
    }
    if (v2IsLoading) {
      return (
        <Text color="#bdc2c4" fontSize="16px" fontWeight="400" fontFamily="Poppins" textAlign="center">
          <Dots>{t('Loading')}</Dots>
        </Text>
      )
    }
    if (allV2PairsWithLiquidity?.length > 0) {
      return allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
        />
      ))
    }
    return (
      <Text color="#bdc2c4" fontSize="16px" fontWeight="400" fontFamily="Poppins" textAlign="center">
        {t('No liquidity found.')}
      </Text>
    )
  }

  return (
    <Page>
      {/* <Text
        style={{
          color: '#fff',
          fontFamily: 'Poppins',
          fontSize: '40px',
          fontWeight: 'bolder',
          margin: '0 0 40px 0',
        }}
      >
        Pum Swap
      </Text> */}
      {/* <img src='/logo_Pum.png' alt='LOGO' style={{width: '20%', margin: '10px 0 40px 0'}} /> */}
      <img src="/logo_Pum1.png" alt="LOGO" style={{ width: '250px', height: 'fit-content', margin: '10px 0 40px 0' }} />
      {/* <img src={Logo} alt='LOGO' style={{width: '20%', margin: '10px 0 40px 0'}} /> */}
      <AppBody style={{ margin: '20px' }}>
        <AppHeader title={t('Liquidity')} subtitle={t('')} noConfig="false" />
        <Body>
          <Button
            id="join-pool-button"
            as={Link}
            to="/add"
            style={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              padding: '20px 8px',
              letterSpacing: '0.03em',
              borderRadius: '20px',
              background: '#05195a',
              fontWeight: 500,
              fontFamily: 'Poppins',
              height: '30px',
              position: 'absolute',
              top: 33,
              right: 36,
            }}
          >
            {t('Add Liquidity')}
          </Button>
          <Flex flexDirection="column" style={{ padding: '10px 15px' }}>
            <Flex justifyContent="space-between" alignItems="center" style={{ margin: '10px 0 15px 0' }}>
              <Text
                style={{
                  color: '#04bbfb',
                  fontSize: '16px',
                  fontWeight: 400,
                  fontFamily: 'Poppins',
                  marginLeft: '10px',
                }}
              >
                {t('Your Liquidity')}
              </Text>
              <QuestionHelper
                text={t(
                  'When you add liquidity, you are given pool tokens that represent your share. If you donot see a pool you joined in this list, try importing a pool below.',
                )}
                placement="left"
                ml="4px"
                mr="10px"
              />
            </Flex>
            {renderBody()}
            <Flex alignItems="baseline" mt="20px">
              <Text
                style={{
                  color: '#05195a',
                  fontSize: '14px',
                  fontWeight: 400,
                  fontFamily: 'Poppins',
                }}
              >
                {t("Don't see a pool you joined?")}
              </Text>
              <Link
                id="import-pool-link"
                as={Link}
                to="/find"
                style={{
                  color: '#04bbfb',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  marginLeft: '5px',
                }}
              >
                {t('Import it')}
              </Link>
            </Flex>
            <Text
              style={{
                color: '#05195a',
                fontSize: '14px',
                fontWeight: 400,
                fontFamily: 'Poppins',
                marginTop: '15px',
              }}
            >
              {t('Or, if you staked your LP tokens in a farm, unstake them to see them here.')}
            </Text>
            <Text
              style={{
                color: '#04bbfb',
                fontSize: '14px',
                fontWeight: 900,
                fontFamily: 'Poppins',
                cursor: 'pointer',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              {t('How to add liquidity?')}
            </Text>
          </Flex>

          {/* {account && !v2IsLoading && (
            <Flex flexDirection="column" alignItems="center" mt="24px">
              <Text color="textSubtle" mb="8px">
                {t("Don't see a pool you joined?")}
              </Text>
              <Button id="import-pool-link" variant="secondary" scale="sm" as={Link} to="/find">
                {t('Find other LP tokens')}
              </Button>
            </Flex>
          )} */}
        </Body>
        {/* <CardFooter style={{ textAlign: 'center' }}>
          <Button id="join-pool-button" as={Link} to="/add" width="100%" startIcon={<AddIcon color="white" />}>
        </CardFooter> */}
      </AppBody>
    </Page>
  )
}
