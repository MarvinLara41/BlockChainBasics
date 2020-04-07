const SHA256 = require('crypto-js/sha256');

class Block {
	constructor(index, timestamp, data, previousHash = '') {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = '';
		this.hash = this.calculateHash();
	}

	calculateHash() {
		//using crptographic function to generate hash
		return SHA256(
			this.index +
				this.timestamp +
				this.previousHash +
				JSON.stringify(this.data)
		).toString();
	}
}

class BlockChain {
	constructor() {
		//the first variable of the array will be the genesis block, created manually
		this.chain = [this.createGenesisBlock()];
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
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
}

//creating two new blocks
let block = new Block(1, '4/6/2020', { mybalance: 100 });
let block2 = new Block(2, '4/6/2020', { mybalance: 50 });

//create a new block chain
let myBlockChain = new BlockChain();

//adding the new blocks to the block chain
myBlockChain.addBlock(block);
myBlockChain.addBlock(block2);

console.log(JSON.stringify(myBlockChain, null, 4));
