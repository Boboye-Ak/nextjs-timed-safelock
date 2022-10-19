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
    const [showNavBar, setShowNavBar] = useState(true)
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
                <div onClick={()=>{
                    toggleShowNavBar()
                }}>
                    <Icon icon="clarity:menu-line" />
                </div>
                <div>
                    <ConnectButton moralisAuth={false} />
                </div>
                <div className="search-area">
                    <div
                        className="search-bar"
                        onMouseEnter={() => {
                            setShowInfo(true)
                        }}
                        onMouseLeave={() => {
                            setShowInfo(false)
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Safelock Address or ID"
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value)
                            }}
                            onBlur={() => {
                                if (!searchInput) {
                                    setHasResult(false)
                                    setIsSearched(false)
                                }
                            }}
                        />
                        <span
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                search()
                            }}
                        >
                            <Icon icon="bi:search" />
                        </span>
                    </div>
                    {!hasResult && !isSearched && (
                        <div
                            className={`add-safe-info pc-only ${
                                (!showInfo || isSearched || hasResult) && "hidden"
                            }`}
                        >
                            Enter ID or Address of safelock you are looking for
                        </div>
                    )}
                    <div
                        className={`search-result ${(!isSearched || !hasResult) && "hidden"}`}
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            router.push(`/safelocks/${searchResultAddress}`)
                        }}
                    >
                        {searchResultAddress}
                    </div>
                    {
                        <div className={`search-result ${(!isSearched || hasResult) && "hidden"}`}>
                            No Safelock with that Address/ID
                        </div>
                    }
                </div>
            </div>
            <NavBar toggleShowNavBar={toggleShowNavBar} showNavBar={showNavBar} />
        </>
    )
}

export default Header
