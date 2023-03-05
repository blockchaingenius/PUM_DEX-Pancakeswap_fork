import React from 'react'
import { HistoryIcon, Button, useModal } from '@pancakeswap/uikit'
import TransactionsModal from './TransactionsModal'

const Transactions = () => {
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  return (
    <>
      <Button variant="text" p={0} onClick={onPresentTransactionsModal}>
        <HistoryIcon color="#d8d8d8" width="25px" cursor= 'pointer' />
      </Button>
    </>
  )
}

export default Transactions
