import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'PumSwap',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PumSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://PumSwap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('PumSwap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('PumSwap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('PumSwap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('PumSwap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('PumSwap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('PumSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('PumSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('PumSwap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('PumSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('PumSwap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('PumSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('PumSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('PumSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('PumSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('PumSwap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('PumSwap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('PumSwap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('PumSwap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('PumSwap Info & Analytics')}`,
        description: 'View statistics for PumSwap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('PumSwap Info & Analytics')}`,
        description: 'View statistics for PumSwap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('PumSwap Info & Analytics')}`,
        description: 'View statistics for PumSwap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('PumSwap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('PumSwap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('PumSwap')}`,
      }
    case '/pum-squad':
      return {
        title: `${t('pum Squad')} | ${t('PumSwap')}`,
      }
    default:
      return null
  }
}
