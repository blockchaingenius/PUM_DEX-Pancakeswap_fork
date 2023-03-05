// import React, { useRef, useEffect } from 'react'
// import styled from 'styled-components'
// import {
//   Modal,
//   Text,
//   Button,
//   Flex,
//   ButtonMenu,
//   Checkbox,
//   BalanceInput,
//   HelpIcon,
//   ButtonMenuItem,
//   useTooltip,
// } from '@pancakeswap/uikit'
// import BigNumber from 'bignumber.js'
// import { useTranslation } from 'contexts/Localization'
// import { getBalanceNumber } from 'utils/formatBalance'
// import useActiveWeb3React from 'hooks/useActiveWeb3React'
// import RoiCalculatorFooter from './RoiCalculatorFooter'
// import RoiCard from './RoiCard'
// import useRoiCalculatorReducer, { CalculatorMode, EditingCurrency } from './useRoiCalculatorReducer'
// import AnimatedArrow from './AnimatedArrow'

// interface RoiCalculatorModalProps {
//   onDismiss?: () => void
//   onBack?: () => void
//   earningTokenPrice: number
//   apr: number
//   displayApr?: string
//   linkLabel: string
//   linkHref: string
//   stakingTokenBalance: BigNumber
//   stakingTokenSymbol: string
//   stakingTokenPrice: number
//   earningTokenSymbol?: string
//   multiplier?: string
//   autoCompoundFrequency?: number
//   performanceFee?: number
//   isFarm?: boolean
//   initialValue?: string
// }

// const StyledModal = styled(Modal)`
//   width: 345px;
//   & > :nth-child(2) {
//     padding: 0;
//   }
// `

// const ScrollableContainer = styled.div`
//   padding: 24px;
//   max-height: 500px;
//   overflow-y: auto;
//   ${({ theme }) => theme.mediaQueries.sm} {
//     max-height: none;
//   }
// `

// const FullWidthButtonMenu = styled(ButtonMenu)<{ disabled?: boolean }>`
//   width: 100%;

//   & > button {
//     width: 100%;
//   }

//   opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
// `

// const RoiCalculatorModal: React.FC<RoiCalculatorModalProps> = ({
//   onDismiss,
//   onBack,
//   earningTokenPrice,
//   apr,
//   displayApr,
//   linkLabel,
//   linkHref,
//   stakingTokenBalance,
//   stakingTokenSymbol,
//   stakingTokenPrice,
//   multiplier,
//   initialValue,
//   earningTokenSymbol = 'CAKE',
//   autoCompoundFrequency = 0,
//   performanceFee = 0,
//   isFarm = false,
// }) => {
//   const { t } = useTranslation()
//   const { account } = useActiveWeb3React()
//   const balanceInputRef = useRef<HTMLInputElement | null>(null)

//   const {
//     state,
//     setPrincipalFromUSDValue,
//     setPrincipalFromTokenValue,
//     setStakingDuration,
//     toggleCompounding,
//     toggleEditingCurrency,
//     setCompoundingFrequency,
//     setCalculatorMode,
//     setTargetRoi,
//   } = useRoiCalculatorReducer(stakingTokenPrice, earningTokenPrice, apr, autoCompoundFrequency, performanceFee)

//   const { compounding, activeCompoundingIndex, stakingDuration, editingCurrency } = state.controls
//   const { principalAsUSD, principalAsToken } = state.data

//   // Auto-focus input on opening modal
//   useEffect(() => {
//     if (balanceInputRef.current) {
//       balanceInputRef.current.focus()
//     }
//   }, [])

//   // If user comes to calculator from staking modal - initialize with whatever they put in there
//   useEffect(() => {
//     if (initialValue) {
//       setPrincipalFromTokenValue(initialValue)
//     }
//   }, [initialValue, setPrincipalFromTokenValue])

//   const { targetRef, tooltip, tooltipVisible } = useTooltip(
//     isFarm
//       ? t('“My Balance” here includes both LP Tokens in your wallet, and LP Tokens already staked in this farm.')
//       : t(
//           '“My Balance” here includes both %assetSymbol% in your wallet, and %assetSymbol% already staked in this pool.',
//           { assetSymbol: stakingTokenSymbol },
//         ),
//     { placement: 'top-end', tooltipOffset: [20, 10] },
//   )

//   const onBalanceFocus = () => {
//     setCalculatorMode(CalculatorMode.ROI_BASED_ON_PRINCIPAL)
//   }

//   const editingUnit = editingCurrency === EditingCurrency.TOKEN ? stakingTokenSymbol : 'USD'
//   const editingValue = editingCurrency === EditingCurrency.TOKEN ? principalAsToken : principalAsUSD
//   const conversionUnit = editingCurrency === EditingCurrency.TOKEN ? 'USD' : stakingTokenSymbol
//   const conversionValue = editingCurrency === EditingCurrency.TOKEN ? principalAsUSD : principalAsToken
//   const onUserInput = editingCurrency === EditingCurrency.TOKEN ? setPrincipalFromTokenValue : setPrincipalFromUSDValue

//   return (
//     <StyledModal
//       title={t('ROI Calculator')}
//       onDismiss={onBack || onDismiss}
//       onBack={onBack ?? null}
//       headerBackground="gradients.cardHeader"
//     >
//       <ScrollableContainer>
//         <Flex flexDirection="column" mb="8px">
//           <Text color="secondary" bold fontSize="12px" textTransform="uppercase">
//             {t('%asset% staked', { asset: stakingTokenSymbol })}
//           </Text>
//           <BalanceInput
//             currencyValue={`${conversionValue} ${conversionUnit}`}
//             innerRef={balanceInputRef}
//             placeholder="0.00"
//             value={editingValue}
//             unit={editingUnit}
//             onUserInput={onUserInput}
//             switchEditingUnits={toggleEditingCurrency}
//             onFocus={onBalanceFocus}
//           />
//           <Flex justifyContent="space-between" mt="8px">
//             <Button
//               scale="xs"
//               p="4px 16px"
//               width="68px"
//               variant="tertiary"
//               onClick={() => setPrincipalFromUSDValue('100')}
//             >
//               $100
//             </Button>
//             <Button
//               scale="xs"
//               p="4px 16px"
//               width="68px"
//               variant="tertiary"
//               onClick={() => setPrincipalFromUSDValue('1000')}
//             >
//               $1000
//             </Button>
//             <Button
//               disabled={stakingTokenBalance.lte(0) || !account}
//               scale="xs"
//               p="4px 16px"
//               width="128px"
//               variant="tertiary"
//               onClick={() =>
//                 setPrincipalFromUSDValue(getBalanceNumber(stakingTokenBalance.times(stakingTokenPrice)).toString())
//               }
//             >
//               {t('My Balance').toLocaleUpperCase()}
//             </Button>
//             <span ref={targetRef}>
//               <HelpIcon width="16px" height="16px" color="textSubtle" />
//             </span>
//             {tooltipVisible && tooltip}
//           </Flex>
//           <Text mt="24px" color="secondary" bold fontSize="12px" textTransform="uppercase">
//             {t('Staked for')}
//           </Text>
//           <FullWidthButtonMenu activeIndex={stakingDuration} onItemClick={setStakingDuration} scale="sm">
//             <ButtonMenuItem variant="tertiary">{t('1D')}</ButtonMenuItem>
//             <ButtonMenuItem variant="tertiary">{t('7D')}</ButtonMenuItem>
//             <ButtonMenuItem variant="tertiary">{t('30D')}</ButtonMenuItem>
//             <ButtonMenuItem variant="tertiary">{t('1Y')}</ButtonMenuItem>
//             <ButtonMenuItem variant="tertiary">{t('5Y')}</ButtonMenuItem>
//           </FullWidthButtonMenu>
//           {autoCompoundFrequency === 0 && (
//             <>
//               <Text mt="24px" color="secondary" bold fontSize="12px" textTransform="uppercase">
//                 {t('Compounding every')}
//               </Text>
//               <Flex alignItems="center">
//                 <Flex flex="1">
//                   <Checkbox scale="sm" checked={compounding} onChange={toggleCompounding} />
//                 </Flex>
//                 <Flex flex="6">
//                   <FullWidthButtonMenu
//                     disabled={!compounding}
//                     activeIndex={activeCompoundingIndex}
//                     onItemClick={setCompoundingFrequency}
//                     scale="sm"
//                   >
//                     <ButtonMenuItem>{t('1D')}</ButtonMenuItem>
//                     <ButtonMenuItem>{t('7D')}</ButtonMenuItem>
//                     <ButtonMenuItem>{t('14D')}</ButtonMenuItem>
//                     <ButtonMenuItem>{t('30D')}</ButtonMenuItem>
//                   </FullWidthButtonMenu>
//                 </Flex>
//               </Flex>
//             </>
//           )}
//         </Flex>
//         <AnimatedArrow calculatorState={state} />
//         <Flex>
//           <RoiCard
//             earningTokenSymbol={earningTokenSymbol}
//             calculatorState={state}
//             setTargetRoi={setTargetRoi}
//             setCalculatorMode={setCalculatorMode}
//           />
//         </Flex>
//       </ScrollableContainer>
//       <RoiCalculatorFooter
//         isFarm={isFarm}
//         apr={apr}
//         displayApr={displayApr}
//         autoCompoundFrequency={autoCompoundFrequency}
//         multiplier={multiplier}
//         linkLabel={linkLabel}
//         linkHref={linkHref}
//         performanceFee={performanceFee}
//       />
//     </StyledModal>
//   )
// }

// export default RoiCalculatorModal

import React from 'react'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex, Box } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { tokenEarnedPerThousandDollarsCompounding, getRoi } from 'utils/compoundApyHelpers'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  onBack?: () => void
  tokenPrice: number
  earningTokenPrice: number
  apr: number
  linkLabel: string
  linkHref: string
  earningTokenSymbol?: string
  roundingDecimals?: number
  compoundFrequency?: number
  performanceFee?: number
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 24px;
`

const GridItem = styled.div`
  margin-bottom: '10px';
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  onBack,
  tokenPrice,
  earningTokenPrice,
  apr,
  linkLabel,
  linkHref,
  earningTokenSymbol = 'PUM',
  roundingDecimals = 2,
  compoundFrequency = 1,
  performanceFee = 0,
}) => {
  const { t } = useTranslation()
  const oneThousandDollarsWorthOfToken = 1000 / earningTokenPrice

  const tokenEarnedPerThousand1D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 1,
    farmApr: apr,
    earningTokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand7D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 7,
    farmApr: apr,
    earningTokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand30D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 30,
    farmApr: apr,
    earningTokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 365,
    farmApr: apr,
    earningTokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })

  return (
    <Modal title={t('ROI')} 
      onDismiss={onBack || onDismiss}
      onBack={onBack ?? null}
    >
      <Grid>
        <GridItem>
          <Text fontSize="12px" bold color="#05489c" fontFamily="Poppins" textTransform="uppercase" mb="20px">
            {t('Timeframe')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="#05489c" fontFamily="Poppins" textTransform="uppercase" mb="20px">
            {t('ROI')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="#05489c" fontFamily="Poppins" textTransform="uppercase" mb="20px">
            {t('%symbol% per $1,000', { symbol: earningTokenSymbol })}
          </Text>
        </GridItem>
        {/* 1 day row */}
        <GridItem>
          <Text color="#05195a" fontFamily="Poppins">
            {t('%num%d', { num: 1 })}
          </Text>
        </GridItem>
        <GridItem>
          <Text color="#05195a" fontFamily="Poppins">
            {getRoi({ amountEarned: tokenEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfToken }).toFixed(
              roundingDecimals,
            )}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text color="#05195a" fontFamily="Poppins">
            {tokenEarnedPerThousand1D}
          </Text>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <Text color="#05195a" fontFamily="Poppins">
            {t('%num%d', { num: 7 })}
          </Text>
        </GridItem>
        <GridItem>
          <Text color="#05195a" fontFamily="Poppins">
            {getRoi({ amountEarned: tokenEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfToken }).toFixed(
              roundingDecimals,
            )}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text color="#05195a" fontFamily="Poppins">
            {tokenEarnedPerThousand7D}
          </Text>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <Text color="#05195a" fontFamily="Poppins">
            {t('%num%d', { num: 30 })}
          </Text>
        </GridItem>
        <GridItem>
          <Text color="#05195a" fontFamily="Poppins">
            {getRoi({
              amountEarned: tokenEarnedPerThousand30D,
              amountInvested: oneThousandDollarsWorthOfToken,
            }).toFixed(roundingDecimals)}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text color="#05195a" fontFamily="Poppins">
            {tokenEarnedPerThousand30D}
          </Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem>
          <Text color="#05195a" fontFamily="Poppins">
            {t('365d')}
          </Text>
        </GridItem>
        <GridItem>
          <Text color="#05195a" fontFamily="Poppins">
            {getRoi({
              amountEarned: tokenEarnedPerThousand365D,
              amountInvested: oneThousandDollarsWorthOfToken,
            }).toFixed(roundingDecimals)}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text color="#05195a" fontFamily="Poppins">
            {tokenEarnedPerThousand365D}
          </Text>
        </GridItem>
      </Grid>
      <Box mb="28px" maxWidth="280px">
        <Text fontSize="12px" color="#05489c" fontFamily="Poppins">
          {t(
            'Calculated based on current rates. Compounding %freq%x daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
            { freq: compoundFrequency.toLocaleString() },
          )}
        </Text>
        {/* {performanceFee > 0 && (
          <Text mt="14px" fontSize="12px" color="#05489c" fontFamily="Poppins">
            {t('All estimated rates take into account this pool’s %fee%% performance fee', { fee: performanceFee })}
          </Text>
        )} */}
      </Box>
      <Flex justifyContent="center">
        <LinkExternal href={linkHref} color="#05195a" fontFamily="Poppins">
          {linkLabel}
        </LinkExternal>
      </Flex>
    </Modal>
  )
}

export default ApyCalculatorModal
