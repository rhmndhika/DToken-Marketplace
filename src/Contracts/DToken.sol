// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DToken is ERC20 {
     constructor(uint256 _initialSupply) ERC20("DToken", "DT") {
        _mint(msg.sender, _initialSupply * 10**uint(decimals()));
    }
    function decimals() public pure override returns (uint8) {
        return 2;
    }
}