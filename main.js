const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data + this.nonce)
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce += 1;
      this.hash = this.calculateHash();
    }

    console.log("Blocked mined: " + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  createGenesisBlock() {
    return new Block(0, "06/10/2021", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);

    // more validation ...

    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; ++i) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.calculateHash() !== currentBlock.hash) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      return true;
    }
  }
}

let messiCoin = new Blockchain();

console.log("Mining block 1...");
messiCoin.addBlock(new Block(1, "07/10/2021", { amount: 7 }));

console.log("Mining block 2...");
messiCoin.addBlock(new Block(2, "08/10/2021", { amount: 10 }));

console.log(JSON.stringify(messiCoin, null, 4));

// !Validation

// console.log("is chain valid? : " + messiCoin.isChainValid());

// messiCoin.chain[1].data = { amount: 100 };

// console.log("is chain valid? : " + messiCoin.isChainValid());
