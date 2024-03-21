import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';
import { contractAbi } from '../constants';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0xE964B57398b6Fd8a57aC01693E9D0446aD5fB1A4", contractAbi)
    //To use write function of the smart contract
    const { mutateAsync : createCampaign } = useContractWrite(contract, 'createCampaign');
    const address = useAddress();
    const connect = useMetamask();  //to connect wallet

    const publishCampaign = async (form) =>{
        try {
            const data = await createCampaign([
                address, //owner
                form.title, //title of campaign
                form.description, //description
                form.target, 
                new Date(form.deadline).getTime(),
                form.image
            ]);

            console.log("Contract call success", data);
        } catch (error) {
            console.log("Contract call failed", error);
        }        
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                createCampaign : publishCampaign
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);