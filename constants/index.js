const safelockABI = require("./SafelockABI.json").abi
const safelockFactoryABI = require("./SafelockFactoryABI.json").abi
const safelockFactoryAddresses = require("./SafelockFactoryAddress.json")
const baseURL = "http://localhost:3000"
const chains = require("./chains.json").chains

const supportedChains = chains.filter((chain) => {
    if (safelockFactoryAddresses[chain.chainId]) {
        return chain
    }
})

module.exports = {
    safelockABI,
    safelockFactoryABI,
    safelockFactoryAddresses,
    baseURL,
    supportedChains,
    chains
}
