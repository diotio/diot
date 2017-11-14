class Block {
  constructor(cb, scope) {
    this.genesisBlock = scope.genesisBlock;
  }
  getCommonBlock(){}
  count(){}
  getBlock(){}
  loadBlocksData(){}
  loadBlocksPart(){}
  loadBlocksOffset(){}
  setLastBlock(){}
  getLastBlock(){}
  verifyBlock(){}
  verifyBlockVotes(){}
  applyBlock(){}
  processBlock(){}
  simpleDeleteAfterBlock(){}
  parseBlock(){}
  loadBlocksFromPeer(){}
  deleteBlocksBefore(){}
  generateBlock(){}
  sandboxApi(){}
  onReceiveBlock(){}
  onReceivePropose(){}
  onReceiveVotes(){}
  getSupply(){}
  getCirculatingSupply(){}
  onBind(){}
  cleanup(){}
}

export default Block;
