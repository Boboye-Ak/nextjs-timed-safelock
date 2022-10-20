import { Icon } from "@iconify/react"
import { ethers } from "ethers"
import { useState } from "react"
import { ConnectButton } from "web3uikit"
import { safelockFactoryABI, safelockFactoryAddresses } from "../constants"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { useRouter } from "next/router"
import NavBar from "./NavBar"

const Header = () => {
    const router = useRouter()
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const safelockFactoryAddress =
        chainId in safelockFactoryAddresses ? safelockFactoryAddresses[chainId][0] : null
    const [showInfo, setShowInfo] = useState(false)
    const [hasResult, setHasResult] = useState(false)
    const [isSearched, setIsSearched] = useState(false)
    const [showNavBar, setShowNavBar] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [searchResultAddress, setSearchResultAddress] = useState("")

    //Web3 Functions
    const { runContractFunction: getSafelockAddressById } = useWeb3Contract({
        abi: safelockFactoryABI,
        contractAddress: safelockFactoryAddress,
        functionName: "getSafelockAddressById",
        params: { id: searchInput },
    })
    const { runContractFunction: getSafelockIdByAddress } = useWeb3Contract({
        abi: safelockFactoryABI,
        contractAddress: safelockFactoryAddress,
        functionName: "getSafelockIdByAddress",
        params: { safelockAddress: searchInput },
    })

    //Web2 Functions
    const search = async () => {
        if (searchInput) {
            if (ethers.utils.isAddress(searchInput)) {
                let idFromCall = await getSafelockIdByAddress()
                idFromCall = parseInt(idFromCall?.toString())

                if (idFromCall) {
                    setIsSearched(true)
                    setHasResult(true)
                    setSearchResultAddress(searchInput)
                    return
                } else {
                    setIsSearched(true)
                    setHasResult(false)
                    return
                }
            }
            if (!isNaN(parseInt(searchInput))) {
                let addressFromCall = await getSafelockAddressById()
                addressFromCall = addressFromCall?.toString()
                if (addressFromCall) {
                    setIsSearched(true)
                    setHasResult(true)
                    setSearchResultAddress(addressFromCall)
                    return
                } else {
                    setIsSearched(true)
                    setHasResult(false)
                    return
                }
            }
        }
    }

    const toggleShowNavBar = () => {
        setShowNavBar(!showNavBar)
    }

    return (
        <>
            <div
                style={{
                    display: "flex",
                    height: "10vh",
                    borderBottom: "solid",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
                className="header"
            >
                <div
                    className="menu-button"
                    onClick={() => {
                        toggleShowNavBar()
                    }}
                >
                    <Icon icon="clarity:menu-line" />
                </div>
                <div>
                    <ConnectButton moralisAuth={false} />
                </div>
                
            </div>
            <NavBar toggleShowNavBar={toggleShowNavBar} showNavBar={showNavBar} />
        </>
    )
}

export default Header
