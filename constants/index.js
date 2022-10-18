const safelockABI = require("./SafelockABI.json").abi
const safelockFactoryABI = require("./SafelockFactoryABI.json").abi
const safelockFactoryAddresses = require("./SafelockFactoryAddress.json")
const baseURL = "http://localhost:3000"

module.exports = { safelockABI, safelockFactoryABI, safelockFactoryAddresses, baseURL }
