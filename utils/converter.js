import { ethers } from "ethers"

const convertToEth = (wei) => {
    let result = Number(wei) / 1000000000000000000
    result = result.toFixed(4).toString()
    return result
}

const convertToWei = (eth) => {
    let result
    if (eth != "") {
        result = ethers.utils.parseEther(eth)
    } else {
        result = "0"
    }
    return result
}

const convertweiToEthNum = (eth) => {
    let result
    if (eth != "") {
        result = ethers.utils.parseEther(eth)
    } else {
        result = "0"
    }
    return parseFloat(result)
}

module.exports = { convertToEth, convertToWei, convertweiToEthNum }
