import { ConnectButton } from "web3uikit"

const PleaseConnectWallet = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "90vh",
            }}
        >
            <div>Please Connect Your Wallet</div>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}

export default PleaseConnectWallet
