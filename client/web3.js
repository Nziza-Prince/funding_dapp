const contractAddress = "0xe5F74d6035BD0b603C0cA8D1b4f91FD6A380F3a5"; // Replace with your actual deployed contract address

const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "applicant",
          "type": "address"
        }
      ],
      "name": "Applied",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "donor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Donated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "FundsReleased",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "applicants",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalDonations",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "donate",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "applyForScholarship",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "releaseFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

let web3;
let contract;
let accounts;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById('account').innerText = `Connected: ${accounts[0]}`;
      contract = new web3.eth.Contract(contractABI, contractAddress);
    } catch (error) {
      console.error("User denied account access", error);
    }
  } else {
    alert("Please install MetaMask!");
  }
}

async function donate() {
  const amount = document.getElementById('donationAmount').value;
  if (!amount) {
    alert("Please enter an amount");
    return;
  }
  const weiValue = web3.utils.toWei(amount, 'ether');
  try {
    await contract.methods.donate().send({ from: accounts[0], value: weiValue });
    alert("Donation successful!");
  } catch (error) {
    console.error("Donation failed", error);
    alert("Donation failed: " + error.message);
  }
}

async function applyForScholarship() {
  try {
    await contract.methods.applyForScholarship().send({ from: accounts[0] });
    alert("Application submitted!");
  } catch (error) {
    console.error("Application failed", error);
    alert("Application failed: " + error.message);
  }
}

async function releaseFunds() {
  const recipient = document.getElementById('recipientAddress').value;
  const amount = web3.utils.toWei('1', 'ether'); // fixed 1 ETH for demo
  try {
    await contract.methods.releaseFunds(recipient, amount).send({ from: accounts[0] });
    alert("Funds released!");
  } catch (error) {
    console.error("Fund release failed", error);
    alert("Fund release failed: " + error.message);
  }
}
