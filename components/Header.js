import { ConnectButton } from "web3uikit"

const Header = () => {
    return (
        <div
            style={{
                height: "10vh",
                borderBottom: "solid",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <ConnectButton moralisAuth={false} />
        </div>
    )
}

export default Header
