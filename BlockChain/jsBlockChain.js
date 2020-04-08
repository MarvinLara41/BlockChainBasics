const SHA256 = require('crypto-js/sha256');

class Block {
	constructor(index, timestamp, data, previousHash = '') {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = '';
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash() {
		//using crptographic function to generate hash
		return SHA256(
			this.index +
				this.timestamp +
				this.previousHash +
				JSON.stringify(this.data) +
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
	}

	createGenesisBlock() {
		return new Block(0, '4/7/2020', 'this is the genesis block', '0');
	}

	getLastestBlock() {
		//returns the lastest block in the array
		//hash of previous block
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLastestBlock().hash;
		newBlock.mineNewBlock(this.difficulty);
		this.chain.push(newBlock);
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

//creating two new blocks
let block = new Block(1, '4/6/2020', { mybalance: 100 });
let block2 = new Block(2, '4/6/2020', { mybalance: 50 });

//create a new block chain
let myBlockChain = new BlockChain();

//adding the new blocks to the block chain
console.log('The first block creation');
myBlockChain.addBlock(block);
console.log('The second block creation');
myBlockChain.addBlock(block2);

console.log(JSON.stringify(myBlockChain, null, 4));
