const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;

const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "a5f3ef993c19ec715c4d3c395792df47ee3af7c84801391a5a0a089218abc80c"
);
const myWallet = myKey.getPublic("hex");

let messiCoin = new Blockchain();

const tx1 = new Transaction(myWallet, "other wallet", 10);
tx1.signTransaction(myKey);

messiCoin.addTransaction(tx1);

console.log("\n Starting the miner...");

messiCoin.minePendingTransactions(myWallet);

console.log(
  "\n Balance of miner is " + messiCoin.getBalanceOfAddress(myWallet)
);

// messiCoin.minePendingTransactions("messi");

// console.log("\n Balance of miner is " + messiCoin.getBalanceOfAddress("messi"));
