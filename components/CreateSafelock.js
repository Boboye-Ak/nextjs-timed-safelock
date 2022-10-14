import { safelockFactoryAddresses, safelockFactoryABI, safelockABI } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useState } from "react"

const CreateSafelock = ({updateUI}) => {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const safelockFactoryAddress =
        chainId in safelockFactoryAddresses ? safelockFactoryAddresses[chainId][0] : null
    const [firstName, setFirstName] = useState("")
    const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false)

    //Web3 Functions
    const {
        runContractFunction: createSafelock,
        isFetching: createSafelockIsFetching,
        isLoading: createSafelockIsLoading,
    } = useWeb3Contract({
        abi: safelockFactoryABI,
        contractAddress: safelockFactoryAddress,
        functionName: "createSafelock",
        params: { firstName: firstName },
    })

    //Web2 Functions
    const handleCreate = async () => {
        await createSafelock({
            onSuccess: async (tx) => {
                setIsAwaitingConfirmation(true)
                await tx.wait(1)
                setIsAwaitingConfirmation(false)
                updateUI()
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
            <input
                type="text"
                placeholder="YOUR FIRST NAME"
                value={firstName}
                onChange={(e) => {
                    setFirstName(e.target.value)
                }}
            />
            <button
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
    )
}

export default CreateSafelock
