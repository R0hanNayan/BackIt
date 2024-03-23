/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: 'sepolia',
    networks: {
      hardhat: {
        chainId: 11155111,
      },
      sepolia: {
        url: 'https://rpc.ankr.com/eth_sepolia',
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      }
    },
    settings: {
      optimizer: {
        enabled: true2,
        runs: 200,
      },
    },
  },
};

