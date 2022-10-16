import Header from "../../components/Header"
import { useRouter } from "next/router"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { safelockFactoryAddresses, safelockFactoryABI, safelockABI } from "../../constants"
import Safelock from "../../components/Safelock"

const safelockPage = ({}) => {
    const router = useRouter()
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const safelockAddress = router.query.address ? router.query.address : null
    const chainId = parseInt(chainIdHex)
    const safelockFactoryAddress =
        chainId in safelockFactoryAddresses ? safelockFactoryAddresses[chainId][0] : null
    const [id, setId] = useState(0)
    const [safelockOwner, setSafelockOwner] = useState("")

    //Web3 Functions
    const { runContractFunction: getSafelockIdByAddress } = useWeb3Contract({
        abi: safelockFactoryABI,
        contractAddress: safelockFactoryAddress,
        functionName: "getSafelockIdByAddress",
        params: { safelockAddress: safelockAddress },
    })

    const { runContractFunction: getSafelockOwner } = useWeb3Contract({
        abi: safelockABI,
        contractAddress: safelockAddress,
        functionName: "getSafelockOwner",
        params: {},
    })

    //Web2 Functions

    const updateUI = async () => {
        let idFromCall = await getSafelockIdByAddress()
        idFromCall = parseInt(idFromCall?.toString())
        if (!isNaN(idFromCall) && idFromCall > 0) {
            setId(idFromCall)
        } else {
            router.push("/")
        }
    }

    const updateUI2 = async () => {
        let safelockOwnerFromCall = await getSafelockOwner()
        safelockOwnerFromCall = safelockOwnerFromCall?.toString()
        setSafelockOwner(safelockOwnerFromCall)
    }

    //Use Effects
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        if (id) {
            updateUI2()
        }
    }, [id])
    return (
        <div>
            <Header />
            {id && safelockOwner ? (
                <>
                    <Safelock
                        safelockOwner={safelockOwner}
                        safelockId={id}
                        safelockAddress={safelockAddress}
                    />
                </>
            ) : (
                <>404</>
            )}
        </div>
    )
}

export default safelockPage
