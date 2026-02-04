// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract YamSmartContract {
    struct Purchase {
        address buyer;
        uint quantity;
        uint price;
        uint timestamp;
    }

    Purchase[] public purchases;

    function buyYam(uint _quantity, uint _price) public {
        require(_quantity > 0, "Quantity must be greater than zero");

        purchases.push(
            Purchase(
                msg.sender,
                _quantity,
                _price,
                block.timestamp
            )
        );
    }

    function getPurchasesCount() public view returns (uint) {
        return purchases.length;
    }
}
