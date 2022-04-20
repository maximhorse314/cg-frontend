import Web3 from 'web3'
import { provider as ProviderType } from 'web3-core'
import { AbiItem } from 'web3-utils'
import LendingPool from 'config/abi/LendingPool.json'

export const getContract = (provider: ProviderType, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract((LendingPool as unknown) as AbiItem, address)
  return contract
}
