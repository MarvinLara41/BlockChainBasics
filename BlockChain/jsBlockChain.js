const SHA256 = require('crypto-js/sha256');

class Transaction {
	constructor(fromAddress, toAddress, amount) {
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
	}
}

class Block {
	constructor(timestamp, transactions, previousHash = '') {
		this.timestamp = timestamp;
		this.transactions = transactions;
		this.previousHash = previousHash;
		this.hash = '';
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash() {
		//using crptographic function to generate hash
		return SHA256(
			this.timestamp +
				this.previousHash +
				JSON.stringify(this.transactions) +
				this.nonce
		).toString();
	}

	mineNewBlock(difficulty) {
		while (
			this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
		) {
			this.nonce++;
			this.hash = this.calculateHash();
		}
		console.log('a new block was mined ' + this.hash);
	}
}

class BlockChain {
	constructor() {
		//the first variable of the array will be the genesis block, created manually
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 4;
		this.pendingTransctions = [];
		this.miningReward = 10;
	}

	createGenesisBlock() {
		return new Block('4/7/2020', 'this is the genesis block', '0');
	}

	getLastestBlock() {
		//returns the lastest block in the array
		//hash of previous block
		return this.chain[this.chain.length - 1];
	}

	minePendingTransactions(miningRewardAddress) {
		let block = new Block(
			Date.now(),
			this.pendingTransctions,
			this.getLastestBlock().hash
		);

		block.mineNewBlock(this.difficulty);

		console.log('Block mined success');

		this.chain.push(block);
		this.pendingTransctions = [
			new Transaction(null, miningRewardAddress, this.miningReward),
		];
	}

	createTransaction(transaction) {
		this.pendingTransctions.push(transaction);
	}

	getBalanceAddress(address) {
		let balance = 0;

		for (const block of this.chain) {
			for (const trans of block.transactions) {
				if (trans.fromAddress === address) {
					balance = balance - trans.amount;
				}
				if (trans.toAddress === address) {
					balance = balance + trans.amount;
				}
			}
		}
		return balance;
	}

	checkBlockChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}
		return true;
	}
}

let bittyCoin = new BlockChain();

transaction1 = new Transaction('tom', 'jerry', 100);
bittyCoin.createTransaction(transaction1);

transaction2 = new Transaction('jerry', 'tom', 30);
bittyCoin.createTransaction(transaction2);

console.log('started mining');
bittyCoin.minePendingTransactions('donald');

console.log('balance for tom is ' + bittyCoin.getBalanceAddress('tom'));

console.log('balance for jerry is ' + bittyCoin.getBalanceAddress('jerry'));

console.log(
	'balance for miner donald is ' + bittyCoin.getBalanceAddress('donald')
);

console.log('started mining by the miner...');
bittyCoin.minePendingTransactions('donald');
console.log(
	'balance for miner donald is  ' + bittyCoin.getBalanceAddress('donald')
);

console.log('started mining by the miner...');
bittyCoin.minePendingTransactions('donald');
console.log(
	'balance for miner donald is  ' + bittyCoin.getBalanceAddress('donald')
);
