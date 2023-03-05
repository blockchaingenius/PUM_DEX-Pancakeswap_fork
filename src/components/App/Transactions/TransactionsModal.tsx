import React, { useCallback } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import { Modal, ModalBody, Text, Button, Flex, InjectedModalProps } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { orderBy } from 'lodash'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import { AppDispatch } from 'state'
import { clearAllTransactions } from 'state/transactions/actions'
import { AutoRow } from '../../Layout/Row'
import Transaction from './Transaction'
import ConnectWalletButton from '../../ConnectWalletButton'

function renderTransactions(transactions: TransactionDetails[]) {
  return (
    <Flex flexDirection="column">
      {transactions.map((tx) => {
        return <Transaction key={tx.hash + tx.addedTime} tx={tx} />
      })}
    </Flex>
  )
}

const TransactionsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const allTransactions = useAllTransactions()

  const { t } = useTranslation()

  const sortedRecentTransactions = orderBy(
    Object.values(allTransactions).filter(isTransactionRecent),
    'addedTime',
    'desc',
  )

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt)
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt)

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }))
  }, [dispatch, chainId])

  return (
    <Modal title={t('Recent Transactions')} headerBackground="#fff" onDismiss={onDismiss}>
      {account ? (
        <ModalBody style={{ margin: 'auto' }}>
          {!!pending.length || !!confirmed.length ? (
            <>
              <AutoRow mb="1rem" style={{ justifyContent: 'space-between' }}>
                <Text>{t('Recent Transactions')}</Text>
                <Button variant="tertiary" scale="xs" onClick={clearAllTransactionsCallback}>
                  {t('clear all')}
                </Button>
              </AutoRow>
              {renderTransactions(pending)}
              {renderTransactions(confirmed)}
            </>
          ) : (
            <Flex flexDirection="column" justifyContent="center">
              <Text style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 600, fontFamily: 'Poppins' }}>
                {t('No recent transactions')}
              </Text>
              <Button
                variant="tertiary"
                scale="sm"
                style={{
                  background: 'rgb(4, 187, 251)',
                  color: 'white',
                  fontSize: '16px',
                  width: 'fit-content',
                  margin: 'auto',
                }}
                onClick={onDismiss}
              >
                {t('close')}
              </Button>
            </Flex>
          )}
        </ModalBody>
      ) : (
        // <ConnectWalletButton />
        <Flex flexDirection="column" justifyContent="center">
          <Text
            style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 600, fontFamily: 'Poppins', color: '#05195a' }}
          >
            {t('Please connect your wallet to view your recent transactions')}
          </Text>
          <Button
            variant="tertiary"
            scale="sm"
            style={{
              background: 'rgb(4, 187, 251)',
              color: 'white',
              fontSize: '16px',
              width: 'fit-content',
              margin: 'auto',
              fontFamily: 'Poppins',
            }}
            onClick={onDismiss}
          >
            {t('close')}
          </Button>
        </Flex>
      )}
    </Modal>
  )
}

export default TransactionsModal
