import { safelockABI } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useState } from "react"

const WithdrawButton = ({ safeIndex, safelockAddress, isBroken }) => {
    const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false)
    //Web3 functions
    const {
        runContractFunction: withdraw,
        isFetching: withdrawIsFetching,
        isLoading: withdrawIsLoading,
    } = useWeb3Contract({
        abi: safelockABI,
        contractAddress: safelockAddress,
        functionName: "withdraw",
        params: { index: safeIndex },
    })

    //Web2 functions
    const handleWithdraw = async () => {
        await withdraw({
            onSuccess: async (tx) => {
                setIsAwaitingConfirmation(true)
                await tx.wait(1)
                setIsAwaitingConfirmation(false)
            },
        })
    }
    return (
        <div>
            <button
                onClick={handleWithdraw}
                disabled={
                    withdrawIsFetching || withdrawIsLoading || isAwaitingConfirmation || isBroken
                }
            >
                WITHDRAW
            </button>
        </div>
    )
}

export default WithdrawButton
