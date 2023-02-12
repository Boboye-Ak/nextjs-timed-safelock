import Header from "../../components/Header"
import { useRouter } from "next/router"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { safelockFactoryAddresses, safelockFactoryABI, safelockABI } from "../../constants"
import Safelock from "../../components/Safelock"
import styles from "../../styles/Home.module.css"
import Loader from "../../components/Loader"

const SafelockPage = ({}) => {
    const router = useRouter()
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const safelockAddress = router.query.address ? router.query.address : null
    const chainId = parseInt(chainIdHex)
    const safelockFactoryAddress =
        chainId in safelockFactoryAddresses ? safelockFactoryAddresses[chainId][0] : null
    const [id, setId] = useState(0)
    const [safelockOwner, setSafelockOwner] = useState("")
    const [isLoading, setIsLoading] = useState(false)

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
        setIsLoading(true)
        let idFromCall = await getSafelockIdByAddress()
        idFromCall = parseInt(idFromCall?.toString())
        if (!isNaN(idFromCall) && idFromCall > 0) {
            setId(idFromCall)
            setIsLoading(false)
        } else {
            router.push("/")
        }
    }

    const updateUI2 = async () => {
        setIsLoading(true)
        let safelockOwnerFromCall = await getSafelockOwner()
        safelockOwnerFromCall = safelockOwnerFromCall?.toString()
        setSafelockOwner(safelockOwnerFromCall)
        setIsLoading(false)
    }

    //Use Effects
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled, account, chainId])

    useEffect(() => {
        if (id) {
            updateUI2()
        }
    }, [id])
    return (
        <div className={styles.container}>
            <Header />
            {isLoading && <Loader />}
            {id && safelockOwner ? (
                <>
                    <Safelock
                        safelockOwner={safelockOwner}
                        safelockId={id}
                        safelockAddress={safelockAddress}
                    />
                </>
            ) : (
                <>
                    <Loader />
                </>
            )}
        </div>
    )
}

export default SafelockPage
