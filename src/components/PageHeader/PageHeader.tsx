import React from 'react'
import styled from 'styled-components'
import { Box } from '@pancakeswap/uikit'
import Container from '../Layout/Container'
import { PageHeaderProps } from './types'

const Outer = styled(Box)<{ background?: string }>`
  // background: ${({ theme, background }) => background || theme.colors.gradients.bubblegum};
  // background: linear-gradient(250deg,#0b195a 20%,#0b195a);   //K_K
  background-color: #071441;
  margin-top: -1px;
  display: flex;
  justify-content: center;
`

const Inner = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
`

const PageHeader: React.FC<PageHeaderProps> = ({ background, children, ...props }) => (
  <Outer background={background} {...props}>
    <Inner>{children}</Inner>
  </Outer>
)

export default PageHeader
