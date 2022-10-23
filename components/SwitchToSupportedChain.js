import { supportedChains } from "../constants"
import { dec2Hex } from "../utils/converter"
import { useChain } from "react-moralis"

const SwitchToSupportedChain = () => {
    const { switchNetwork, chainId, chain, account } = useChain()
    return (
        <div className="unsupported-chain">
            <div>
                You are currently on a Chain that is not supported. Please Switch to a supported
                chain and connect wallet.
            </div>{" "}
            <div>Supported chains are:</div>
            <ul>
                {supportedChains.map((chain, index) => {
                    return (
                        <li
                            className="chain-name"
                            key={index}
                            onClick={() => {
                                switchNetwork(`0x${dec2Hex(chain.chainId)}`)
                            }}
                        >
                            {chain.name}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SwitchToSupportedChain
