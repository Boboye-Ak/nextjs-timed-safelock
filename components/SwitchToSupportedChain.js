import { supportedChains } from "../constants"
import { dec2Hex } from "../utils/converter"
import { useChain } from "react-moralis"

const SwitchToSupportedChain = () => {
    const { switchNetwork, chainId, chain, account } = useChain()
    return (
        <div className="unsupported-chain">
            You are currently on a Chain that is not supported. Please Switch to a supported chain
            and connect wallet. Supported chains are:{" "}
            {supportedChains.map((chain, index) => {
                return (
                    <span
                        key={index}
                        onClick={() => {
                            switchNetwork(`0x${dec2Hex(chain.chainId)}`)
                        }}
                    >
                        {index != 0 && ", "}
                        {chain.name}
                    </span>
                )
            })}
        </div>
    )
}

export default SwitchToSupportedChain
