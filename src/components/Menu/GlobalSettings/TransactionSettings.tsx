import React, { useState } from 'react'
import { Text, Button, Input, Flex, Box } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useUserSlippageTolerance, useUserTransactionTTL } from 'state/user/hooks'
import QuestionHelper from '../../QuestionHelper'

enum SlippageError {
  InvalidInput = 'InvalidInput',
  RiskyLow = 'RiskyLow',
  RiskyHigh = 'RiskyHigh',
}

enum DeadlineError {
  InvalidInput = 'InvalidInput',
}

const SlippageTabs = () => {
  const [userSlippageTolerance, setUserSlippageTolerance] = useUserSlippageTolerance()
  const [ttl, setTtl] = useUserTransactionTTL()
  const [slippageInput, setSlippageInput] = useState('')
  const [deadlineInput, setDeadlineInput] = useState('')

  const { t } = useTranslation()

  const slippageInputIsValid =
    slippageInput === '' || (userSlippageTolerance / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2)
  const deadlineInputIsValid = deadlineInput === '' || (ttl / 60).toString() === deadlineInput

  let slippageError: SlippageError | undefined
  if (slippageInput !== '' && !slippageInputIsValid) {
    slippageError = SlippageError.InvalidInput
  } else if (slippageInputIsValid && userSlippageTolerance < 50) {
    slippageError = SlippageError.RiskyLow
  } else if (slippageInputIsValid && userSlippageTolerance > 500) {
    slippageError = SlippageError.RiskyHigh
  } else {
    slippageError = undefined
  }

  let deadlineError: DeadlineError | undefined
  if (deadlineInput !== '' && !deadlineInputIsValid) {
    deadlineError = DeadlineError.InvalidInput
  } else {
    deadlineError = undefined
  }

  const parseCustomSlippage = (value: string) => {
    setSlippageInput(value)

    try {
      const valueAsIntFromRoundedFloat = Number.parseInt((Number.parseFloat(value) * 100).toString())
      if (!Number.isNaN(valueAsIntFromRoundedFloat) && valueAsIntFromRoundedFloat < 5000) {
        setUserSlippageTolerance(valueAsIntFromRoundedFloat)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const parseCustomDeadline = (value: string) => {
    setDeadlineInput(value)

    try {
      const valueAsInt: number = Number.parseInt(value) * 60
      if (!Number.isNaN(valueAsInt) && valueAsInt > 0) {
        setTtl(valueAsInt)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" mb="24px">
        <Flex mb="12px" alignItems="center">
          <Text style={{ color: '#05489c', fontWeight: 600, fontFamily: 'Poppins', fontSize: '16px' }}>
            {t('Slippage Tolerance')}
          </Text>
          <QuestionHelper
            text={t('Your transaction will revert if the price changes unfavorably by more than this percentage.')}
            placement="right"
            ml="4px"
          />
        </Flex>
        <Flex flexWrap="wrap">
          <Button
            mt="4px"
            mr="4px"
            scale="sm"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(10)
            }}
            variant={userSlippageTolerance === 10 ? 'primary' : 'tertiary'}
            style={{
              padding: '24px',
              borderRadius: '16px',
              background: '#d8d8d8',
              color: '#05489c',
              fontFamily: 'Roboto Mono, monospace',
              '&:hover': {
                opacity: 0.65,
              },
              '&:focus': {
                background: '#05489c',
                color: '#fff !important',
              },
            }}
          >
            0.1%
          </Button>
          <Button
            mt="4px"
            mr="4px"
            scale="sm"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(50)
            }}
            variant={userSlippageTolerance === 50 ? 'primary' : 'tertiary'}
            style={{
              padding: '24px',
              borderRadius: '16px',
              background: '#d8d8d8',
              color: '#05489c',
              fontFamily: 'Roboto Mono, monospace',
            }}
          >
            0.5%
          </Button>
          <Button
            mr="4px"
            mt="4px"
            scale="sm"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(100)
            }}
            variant={userSlippageTolerance === 100 ? 'primary' : 'tertiary'}
            style={{
              padding: '24px',
              borderRadius: '16px',
              background: '#d8d8d8',
              color: '#05489c',
              fontFamily: 'Roboto Mono, monospace',
            }}
          >
            1.0%
          </Button>
          <Flex alignItems="center">
            <Box width="auto" mt="4px">
              <Input
                scale="md"
                placeholder={(userSlippageTolerance / 100).toFixed(2)}
                value={slippageInput}
                onBlur={() => {
                  parseCustomSlippage((userSlippageTolerance / 100).toFixed(2))
                }}
                onChange={(e) => parseCustomSlippage(e.target.value)}
                isWarning={!slippageInputIsValid}
                isSuccess={![10, 50, 100].includes(userSlippageTolerance)}
                style={{
                  width: 'auto',
                  height: '48px',
                  borderRadius: '16px',
                  background: '#d8d8d8',
                  color: '#05489c !important',
                  fontFamily: 'Roboto Mono, monospace',
                }}
              />
            </Box>
            <Text
              color="primary"
              bold
              ml="2px"
              style={{ color: '#05489c', fontFamily: 'Roboto Mono, monospace', fontSize: '18px' }}
            >
              %
            </Text>
          </Flex>
        </Flex>
        {!!slippageError && (
          <Text fontSize="14px" color={slippageError === SlippageError.InvalidInput ? 'red' : '#F3841E'} mt="8px">
            {slippageError === SlippageError.InvalidInput
              ? t('Enter a valid slippage percentage')
              : slippageError === SlippageError.RiskyLow
              ? t('Your transaction may fail')
              : t('Your transaction may be frontrun')}
          </Text>
        )}
      </Flex>
      <Box flexDirection="column" alignItems="center" mb="24px">
        <Flex alignItems="center">
          <Text style={{ color: '#05489c', fontWeight: 600, fontFamily: 'Poppins', fontSize: '16px' }}>
            {t('Transaction deadlines')}
          </Text>
          <QuestionHelper
            text={t('Your transaction will revert if it is pending for more than this long.')}
            placement="right"
            ml="4px"
          />
        </Flex>
        <Flex alignItems="center">
          <Box width="100px" mt="10px" mr="10px">
            <Input
              scale="sm"
              color={deadlineError ? 'red' : undefined}
              onBlur={() => {
                parseCustomDeadline((ttl / 60).toString())
              }}
              placeholder={(ttl / 60).toString()}
              value={deadlineInput}
              onChange={(e) => parseCustomDeadline(e.target.value)}
              style={{
                borderRadius: '16px',
                height: '44px',
                background: '#d8d8d8',
                color: '#05489c',
                fontFamily: 'Roboto Mono, monospace',
              }}
            />
          </Box>
          <Text style={{ color: '#05489c', fontSize: '14px', fontWeight: 400, fontFamily: 'Poppins' }}>
            {t('Minutes')}
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}

export default SlippageTabs
