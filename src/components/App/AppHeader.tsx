import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Heading, IconButton, ArrowBackIcon, NotificationDot, Box } from '@pancakeswap/uikit'
import { Link } from 'react-router-dom'
import { useExpertModeManager } from 'state/user/hooks'
import GlobalSettings from 'components/Menu/GlobalSettings'
import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'
import { useTranslation } from '../../contexts/Localization'

interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string
  noConfig?: boolean
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 35px 40px 0px 40px;
  width: 100%;
  // border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};

  position: relative; //K_K
`

const AppHeader: React.FC<Props> = ({ title, subtitle, helper, backTo, noConfig = false }) => {
  const [expertMode] = useExpertModeManager()
  const { t } = useTranslation()

  return (
    <AppHeaderContainer>
      <Flex alignItems="center" mr={noConfig ? 0 : '16px'}>
        {backTo && (
          <IconButton as={Link} to={backTo}>
            <ArrowBackIcon width="24px" color="rgb(4, 187, 251)" />
          </IconButton>
        )}
        <Flex flexDirection="row" justifyContent="space-between">
          <Heading
            as="h2"
            mb="8px"
            color="#05195a"
            fontSize="20px"
            fontFamily="Poppins"
            marginTop="9px"
            fontWeight="500"
          >
            {title}
          </Heading>
          <Flex alignItems="center">
            {helper && (
              <QuestionHelper
                text={helper}
                mr="4px"
                placement="left"
                fontFamily="Poppins"
                style={{ position: 'absolute', top: '45px', right: '35px' }}
              />
            )}
            <Text color="textSubtle" fontSize="14px">
              {subtitle}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {!noConfig && (
        <Flex alignItems="center">
          <NotificationDot show={expertMode}>
            <GlobalSettings />
          </NotificationDot>
          <Transactions />
        </Flex>
      )}
      {/* {(backTo === '/pool') && (
        <Flex alignItems="center">
          <QuestionHelper
            text={t('Use this tool to find pairs that do not automatically appear in the interface.')}
            placement="left"
            ml="4px"
          />   
        </Flex>
      )} */}
    </AppHeaderContainer>
  )
}

export default AppHeader
