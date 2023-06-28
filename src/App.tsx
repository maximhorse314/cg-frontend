


import { useEffect } from 'react';
import './App.css';
import { provider } from 'web3-core'
import { useWallet } from '@binance-chain/bsc-use-wallet';
import { borrowNFT, repayLoan } from 'utils/callHelpers'
import { useWalletModal, Button } from '@pancakeswap-libs/uikit';
import { getContract } from 'utils/lendingPool'
import { ethers } from 'ethers'
import * as dotenv from 'dotenv';

dotenv.config();

function sortAddress(add) {
  const sortAdd = `${add.slice(0, 6)}...${add.slice(add.length - 4)}`;
  return sortAdd;
}

function App() {
  const { account, connect, reset, status, ethereum } = useWallet();
  const { LENDING_POOL_ADDRESS, NFT_ID } = process.env;
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
    (data) => connect(data),
    () => reset(),
    account
  );
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected');
    }
  }, [account, connect]);
  
  const onBorrow = async ()=>{
    const lendingPool = getContract(ethereum as provider, LENDING_POOL_ADDRESS)
    const tx = await borrowNFT(lendingPool, NFT_ID, account)
    console.log(tx)
  }

  const onRepay = async ()=>{
    const lendingPool = getContract(ethereum as provider, LENDING_POOL_ADDRESS)
    const tx = await repayLoan(lendingPool, NFT_ID, account)
    console.log(tx)
  }

  return (
    <div className='App'>
      {status === 'connected' ? (
        <>
          <Button onClick={onPresentAccountModal}>
            {sortAddress(account)}
          </Button>
          <Button onClick={onBorrow}>
            Borrow
          </Button>
          <Button onClick={onRepay}>
            Repay
          </Button>
        </>
      ) : (
        <Button onClick={onPresentConnectModal}>Connect</Button>
      )}
    </div>
  );
}

export default App;

