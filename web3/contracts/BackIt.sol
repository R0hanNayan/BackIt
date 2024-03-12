// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BackIt {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donaters;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;  //TO MAP THROUGH Campaign structure => Campaign[0]

    uint256 public numberOfCampaigns = 0;   //keeping track of no. of campaign inorder to give them Ids
}