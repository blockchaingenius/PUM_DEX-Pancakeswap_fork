import React, { useCallback, useEffect, useState } from 'react'
import { Currency, ETHER, JSBI, TokenAmount } from '@pancakeswap/sdk'
import { Button, ChevronDownIcon, Text, AddIcon, useModal } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { LightCard } from '../../components/Card'
import { AutoColumn, ColumnCenter } from '../../components/Layout/Column'
import { CurrencyLogo } from '../../components/Logo'
import { MinimalPositionCard } from '../../components/PositionCard'
import Row from '../../components/Layout/Row'
import CurrencySearchModal from '../../components/SearchModal/CurrencySearchModal'
import { PairState, usePair } from '../../hooks/usePairs'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { usePairAdder } from '../../state/user/hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import StyledInternalLink from '../../components/Links'
import { currencyId } from '../../utils/currencyId'
import Dots from '../../components/Loader/Dots'
import { AppHeader, AppBody } from '../../components/App'
import Page from '../Page'

enum Fields {
  TOKEN0 = 0,
  TOKEN1 = 1,
}

const StyledButton = styled(Button)`
  // background-color: ${({ theme }) => theme.colors.input};
  background-color: rgb(5, 25, 90) !important;
  // color: ${({ theme }) => theme.colors.text};
  color: #fff !important;
  box-shadow: none;
  border-radius: 16px;
`

export default function PoolFinder() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)
  const [currency0, setCurrency0] = useState<Currency | null>(ETHER)
  const [currency1, setCurrency1] = useState<Currency | null>(null)

  const [pairState, pair] = usePair(currency0 ?? undefined, currency1 ?? undefined)
  const addPair = usePairAdder()
  useEffect(() => {
    if (pair) {
      addPair(pair)
    }
  }, [pair, addPair])

  const validPairNoLiquidity: boolean =
    pairState === PairState.NOT_EXISTS ||
    Boolean(
      pairState === PairState.EXISTS &&
        pair &&
        JSBI.equal(pair.reserve0.raw, JSBI.BigInt(0)) &&
        JSBI.equal(pair.reserve1.raw, JSBI.BigInt(0)),
    )

  const position: TokenAmount | undefined = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const hasPosition = Boolean(position && JSBI.greaterThan(position.raw, JSBI.BigInt(0)))

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      if (activeField === Fields.TOKEN0) {
        setCurrency0(currency)
      } else {
        setCurrency1(currency)
      }
    },
    [activeField],
  )

  const prerequisiteMessage = (
    <LightCard padding="8px 10px">
      <Text
        style={{
          textAlign: 'center',
          color: '#04bbfb',
          fontFamily: 'Poppins',
          fontSize: '16px',
        }}
      >
        {!account ? t('Connect to a wallet to find pools') : t('Select a token to find your liquidity.')}
      </Text>
    </LightCard>
  )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={handleCurrencySelect}
      showCommonBases
      selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
    />,
    true,
    true,
    'selectCurrencyModal',
  )

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
      <AppBody>
        <AppHeader
          title={t('Import Pool')}
          subtitle={t('')}
          backTo="/pool"
          noConfig="false"
          helper="Use this tool to find pairs that do not automatically appear in the interface."
        />
        <AutoColumn style={{ padding: '3rem' }} gap="md">
          <StyledButton
            onClick={() => {
              onPresentCurrencyModal()
              setActiveField(Fields.TOKEN0)
            }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            {currency0 ? (
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <CurrencyLogo currency={currency0} />
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Poppins',
                    marginLeft: '8px',
                  }}
                >
                  {currency0.symbol}
                </Text>
                <ChevronDownIcon color="#fff" />
              </Row>
            ) : (
              <Row style={{ display: 'flex', justifyContent: 'center', width: 'auto' }}>
                <Text
                  as={Row}
                  style={{
                    color: '#fff',
                    fontFamily: 'Poppins',
                    paddingLeft: '33px',
                  }}
                >
                  {t('Select a Token')}
                </Text>
                <ChevronDownIcon color="#fff" />
              </Row>
            )}
          </StyledButton>

          <ColumnCenter>
            <AddIcon />
          </ColumnCenter>

          <StyledButton
            endIcon={<ChevronDownIcon />}
            onClick={() => {
              onPresentCurrencyModal()
              setActiveField(Fields.TOKEN1)
            }}
          >
            {currency1 ? (
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <CurrencyLogo currency={currency1} />
                <Text
                  style={{
                    color: '#fff',
                    marginLeft: '8px',
                    fontFamily: 'Poppins',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {currency1.symbol}
                </Text>
                <ChevronDownIcon color="#fff" />
              </Row>
            ) : (
              <Row style={{ display: 'flex', justifyContent: 'center', width: 'auto' }}>
                <Text
                  as={Row}
                  style={{
                    color: '#fff',
                    fontFamily: 'Poppins',
                    paddingLeft: '33px',
                  }}
                >
                  {t('Select a Token')}
                </Text>
                <ChevronDownIcon color="#fff" />
              </Row>
            )}
          </StyledButton>

          {hasPosition && (
            <ColumnCenter
              style={{ justifyItems: 'center', backgroundColor: '', padding: '12px 0px', borderRadius: '12px' }}
            >
              <Text textAlign="center">{t('Pool Found!')}</Text>
              <StyledInternalLink to="/pool">
                <Text textAlign="center">{t('Manage this pool.')}</Text>
              </StyledInternalLink>
            </ColumnCenter>
          )}

          {currency0 && currency1 ? (
            pairState === PairState.EXISTS ? (
              hasPosition && pair ? (
                <MinimalPositionCard pair={pair} />
              ) : (
                <LightCard padding="45px 10px">
                  <AutoColumn gap="sm" justify="center">
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#04bbfb',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                      }}
                    >
                      {t('You don’t have liquidity in this pool yet.')}
                    </Text>
                    <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#04bbfb',
                          fontFamily: 'Poppins',
                          fontSize: '16px',
                        }}
                      >
                        {t('Add Liquidity')}
                      </Text>
                    </StyledInternalLink>
                  </AutoColumn>
                </LightCard>
              )
            ) : validPairNoLiquidity ? (
              <LightCard padding="45px 10px">
                <AutoColumn gap="sm" justify="center">
                  <Text textAlign="center">{t('No pool found.')}</Text>
                  <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                    {t('Create pool.')}
                  </StyledInternalLink>
                </AutoColumn>
              </LightCard>
            ) : pairState === PairState.INVALID ? (
              <LightCard padding="45px 10px">
                <AutoColumn gap="sm" justify="center">
                  <Text textAlign="center" fontWeight={500}>
                    {t('Invalid pair.')}
                  </Text>
                </AutoColumn>
              </LightCard>
            ) : pairState === PairState.LOADING ? (
              <LightCard padding="45px 10px">
                <AutoColumn gap="sm" justify="center">
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#04bbfb',
                      fontFamily: 'Poppins',
                      fontSize: '16px',
                    }}
                  >
                    {t('Loading')}
                    <Dots />
                  </Text>
                </AutoColumn>
              </LightCard>
            ) : null
          ) : (
            prerequisiteMessage
          )}
        </AutoColumn>

        {/* <CurrencySearchModal
          isOpen={showSearch}
          onCurrencySelect={handleCurrencySelect}
          onDismiss={handleSearchDismiss}
          showCommonBases
          selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
        /> */}
      </AppBody>
    </Page>
  )
}
