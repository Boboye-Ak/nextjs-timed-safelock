import { supportedChains } from "../constants"

const SwitchToSupportedChain = () => {
    return (
        <div className="unsupported-chain">
            You are currently on a Chain that is not supported. Please Switch to a supported chain
            and connect wallet. Supported chains are: {" "}
            {supportedChains.map((chain, index) => {
                return (
                    <span key={index}>
                        {index != 0 && ", "}
                        {chain.name}
                    </span>
                )
            })}
        </div>
    )
}

export default SwitchToSupportedChain
