import { Icon } from "@iconify/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { safelockFactoryABI, safelockFactoryAddresses } from "../constants"
import { ethers } from "ethers"

const NavBar = ({ toggleShowNavBar, showNavBar }) => {
    const router = useRouter()
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const safelockFactoryAddress =
        chainId in safelockFactoryAddresses ? safelockFactoryAddresses[chainId][0] : null
    const [searchInput, setSearchInput] = useState()
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
        console.log("searching")
        if (searchInput) {
            if (ethers.utils.isAddress(searchInput)) {
                let idFromCall = await getSafelockIdByAddress()
                idFromCall = parseInt(idFromCall?.toString())

                if (idFromCall) {
                    router.push(`/safelocks/${searchInput}`)
                    return
                } else {
                    return
                }
            }
            if (!isNaN(parseInt(searchInput))) {
                console.log("Searching by Id")
                let addressFromCall = await getSafelockAddressById()
                addressFromCall = addressFromCall?.toString()
                if (addressFromCall) {
                    console.log("result found")
                    router.push(`/safelocks/${addressFromCall}`)
                    return
                } else {
                    console.log("result not found")
                    return
                }
            }
        }
    }

    return (
        <div className={showNavBar ? "navbar" : "navbar hidden"}>
            <div
                className="back-button"
                onClick={() => {
                    toggleShowNavBar()
                }}
            >
                <Icon icon="ant-design:close-circle-twotone" />
            </div>
            <div className="ul">
                <div
                    className="li"
                    onClick={() => {
                        router.push("/")
                    }}
                >
                    Home
                </div>
                <div
                    className="li"
                    onClick={() => {
                        router.push("/mysafelock")
                    }}
                >
                    My Safelock
                </div>
                <div className="li">
                    <input
                        placeholder="SAFELOCK ID/ADDRESS"
                        value={searchInput}
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                        }}
                    />

                    <div
                        onClick={() => {
                            search()
                        }}
                    >
                        <Icon icon="akar-icons:search" />
                    </div>
                </div>
                <div
                    className="li"
                    onClick={() => {
                        router.push("/about")
                    }}
                >
                    About Site
                </div>
            </div>
        </div>
    )
}

export default NavBar
