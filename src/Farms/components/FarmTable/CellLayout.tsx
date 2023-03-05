import React from 'react'
import styled from 'styled-components'

const Label = styled.div`
  font-size: 14px;
  // color: ${({ theme }) => theme.colors.textSubtle};
  text-align: left;
  font-family: Poppins;
  color: #04bbfb;
`

const ContentContainer = styled.div`
  min-height: 24px;
  display: flex;
  align-items: center;
`

interface CellLayoutProps {
  label?: string
}

const CellLayout: React.FC<CellLayoutProps> = ({ label = '', children }) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <ContentContainer>{children}</ContentContainer>
    </div>
  )
}

export default CellLayout
