// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*
  YamSmartContract
  Demonstrates how purchase rules would be enforced on-chain
*/

contract YamSmartContract {

    uint public constant MAX_QTY = 50;

    function validatePurchase(
        uint quantity,
        uint pricePerTuber,
        uint totalPrice
    )
        public
        pure
        returns (bool)
    {
        if (quantity == 0 || quantity > MAX_QTY) {
            return false;
        }

        if (totalPrice != quantity * pricePerTuber) {
            return false;
        }

        return true;
    }
}
