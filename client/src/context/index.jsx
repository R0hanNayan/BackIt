import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';
import { contractAbi } from '../constants';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0xE964B57398b6Fd8a57aC01693E9D0446aD5fB1A4", contractAbi);
    const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign")
    const address = useAddress();
    const connect = useMetamask();  //to connect wallet
    // console.log(address);

    const publishCampaign = async (form) =>{
        try {
            const data = await createCampaign({
				args: [
					address, // owner
					form.title, // title
					form.description, // description
					form.target,
					Math.round(new Date(form.deadline).getTime()), // deadline,
					form.image,
				]
			});
            console.log("Contract call success", data);
        } catch (error) {
            console.log("Contract call failed", error);
        }        
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');
        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pid: i
        }));
        return (parsedCampaigns);
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign : publishCampaign,
                getCampaigns
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);