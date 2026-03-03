// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

contract Transactions{

uint256 TransactionCount = 0;

event TransactionAdded(address from, address receiver, uint amount, string message ,uint256 timestamp,string keyword );

  struct TransferStruct{
    address sender;
    address receiver;
    uint amount;
    string message;
    uint256 timestamp;
    string keyword;
  }

  TransferStruct[] transactions;

  function addToBlockchain(address payable receiver, uint amount , string memory message, string memory keyword ) public {
        TransactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount,message, block.timestamp, keyword));

       emit TransactionAdded(msg.sender, receiver, amount, message, block.timestamp, keyword); 
  }

  function getAllTransactions() public view returns(TransferStruct[] memory) {
    return transactions;
  }

  function getTransactionCount() public view returns(uint256){
    return TransactionCount;
  }

}

