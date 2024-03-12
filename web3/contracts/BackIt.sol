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

    mapping(uint256 => Campaign) public campaigns;  //TO create MAP for campaign structure => Campaign[0]

    uint256 public numberOfCampaigns = 0;   //keeping track of no. of campaign inorder to give them Ids

    function createCampaign(address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image) public returns (uint256){
        //memory keyword required with every string
        Campaign storage campaign = campaigns[numberOfCampaigns];

        //to ckeck if everything is okay?
        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1; //index of the most newly created campaign
    }

    function donateToCampaign(uint256 _id) public payable { //payable -> keyword to denote crypto transaction -> returns two values
        uint256 amount = msg.value; //coming from frontend

        Campaign storage campaign = campaigns[_id];
        campaign.donaters.push(msg.sender); //pushing the address of the sender
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");  //to verify if transaction is successful or not
        if(sent){
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function getDonators() {
        
    }

    function getCampaigns() {
        
    }
}