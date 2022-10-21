import { safelockFactoryAddresses, safelockFactoryABI, safelockABI } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useRouter } from "next/router"
import { useState } from "react"
import Loader from "./Loader"

const CreateSafelock = ({ updateUI }) => {
    const router = useRouter()
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const safelockFactoryAddress =
        chainId in safelockFactoryAddresses ? safelockFactoryAddresses[chainId][0] : null
    const [firstName, setFirstName] = useState("")
    const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    //Web3 Functions
    const {
        runContractFunction: createSafelock,
        isFetching: createSafelockIsFetching,
        isLoading: createSafelockIsLoading,
    } = useWeb3Contract({
        abi: safelockFactoryABI,
        contractAddress: safelockFactoryAddress,
        functionName: "createSafelock",
        params: { safelockOwnerName: firstName },
    })

    //Web2 Functions
    const handleCreate = async () => {
        console.log({ firstName, safelockFactoryABI, safelockFactoryAddress })
        await createSafelock({
            onSuccess: async (tx) => {
                setIsLoading(true)
                setIsAwaitingConfirmation(true)
                await tx.wait(1)
                setIsAwaitingConfirmation(false)
                await updateUI()
                router.push("/mysafelock")
            },
        })
    }
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
            {isLoading && <Loader />}
            <div className="create-safelock-form">
                <input
                    className="name-input-bar"
                    type="text"
                    placeholder="YOUR FIRST NAME"
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value)
                    }}
                />
                <button
                    className="create-safelock-button glow-on-hover"
                    onClick={handleCreate}
                    disabled={
                        !firstName ||
                        createSafelockIsFetching ||
                        createSafelockIsLoading ||
                        isAwaitingConfirmation
                    }
                >
                    CREATE SAFELOCK
                </button>
            </div>
        </div>
    )
}

export default CreateSafelock
