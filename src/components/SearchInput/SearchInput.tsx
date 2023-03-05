import React, { useState, useMemo } from 'react'
import { Input } from '@pancakeswap/uikit'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import { useTranslation } from 'contexts/Localization'
import SearchIcon from '@mui/icons-material/Search'

const StyledInput = styled(Input)`
  border-radius: 12px;
  // margin-left: auto;
  width: max-content;
  height: 48px;
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 24rem;
  }
`

const InputWrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const SearchInput: React.FC<Props> = ({ onChange: onChangeCallback, placeholder = 'Search' }) => {
  const [searchText, setSearchText] = useState('')

  const { t } = useTranslation()

  const debouncedOnChange = useMemo(
    () => debounce((e: React.ChangeEvent<HTMLInputElement>) => onChangeCallback(e), 500),
    [onChangeCallback],
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    debouncedOnChange(e)
  }

  return (
    <InputWrapper>
      <StyledInput value={searchText} onChange={onChange} placeholder={t(placeholder)} />
      <SearchIcon
        style={{
          backgroundColor: '#fff',
          color: '#05489c',
          padding: '1px 1px',
          border: 'none',
          position: 'absolute',
          top: '13px',
          right: '12px',
        }}
      />
    </InputWrapper>
  )
}

export default SearchInput
