// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecisionRegistry {
    event DecisionAnchored(bytes32 decisionHash, uint256 timestamp);

    function anchorDecision(bytes32 decisionHash) public {
        emit DecisionAnchored(decisionHash, block.timestamp);
    }
}
