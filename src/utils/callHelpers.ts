export const borrowNFT = async (contract, nftId, account) => {
  return contract.methods
    .borrowNFT(nftId)
    .send({from: account})
}

export const repayLoan = async (contract, nftId, account) => {
  return contract.methods
    .repayLoan(nftId)
    .send({from: account})
}
