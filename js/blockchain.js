/***********************
 * Simple Blockchain
 ***********************/

// Simple hash function (intro-level, acceptable for class)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
}

function getTimestamp() {
  return new Date().toLocaleString(); // readable date & time
}

// Block structure
class Block {
  constructor(index, timestamp, data, prevHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return simpleHash(
      this.index +
      this.timestamp +
      JSON.stringify(this.data) +
      this.prevHash
    );
  }
}

// Blockchain array (load from storage or create new)
let blockchain = JSON.parse(localStorage.getItem("yamChain"));

if (!blockchain) {
  blockchain = [];
  const genesisBlock = new Block(
    0,
    getTimestamp(),
    { info: "Genesis Block" },
    "0"
  );
  blockchain.push(genesisBlock);
  saveChain();
}

// Save blockchain to browser storage
function saveChain() {
  localStorage.setItem("yamChain", JSON.stringify(blockchain));
}

// Add new block
function addBlock(data) {
  const lastBlock = blockchain[blockchain.length - 1];
  const newBlock = new Block(
    blockchain.length,
    getTimestamp(),
    data,
    lastBlock.hash
  );

  blockchain.push(newBlock);
  saveChain();
}
/************************
 * Smart Contract Logic
 ************************/

const YamSmartContract = {
  MAX_QTY: 50,

  validateTransaction(tx) {
    if (!tx.name || tx.name.trim().length < 2) {
      return { valid: false, reason: "Invalid buyer name" };
    }

    if (tx.quantity <= 0 || tx.quantity > this.MAX_QTY) {
      return { valid: false, reason: "Invalid quantity" };
    }

    if (tx.totalPrice !== tx.quantity * tx.pricePerTuber) {
      return { valid: false, reason: "Price mismatch" };
    }

    return { valid: true };
  }
};

// Purchase handler
function makePurchase() {
  const name = document.getElementById("name").value;
  const qty = parseInt(document.getElementById("qty").value);
  const yamType = document.getElementById("yamType").innerText;
  const price = parseInt(document.getElementById("yamPrice").innerText);

  const transaction = {
    name,
    yamType,
    quantity: qty,
    pricePerTuber: price,
    totalPrice: qty * price,
    timestamp: getTimestamp()
  };

  // SMART CONTRACT CHECK
  const result = YamSmartContract.validateTransaction(transaction);

  if (!result.valid) {
    alert("Transaction rejected by smart contract: " + result.reason);
    return;
  }

  addBlock(transaction);

  alert("Transaction approved and recorded on blockchain!");
  window.location.href = "transactions.html";
}
