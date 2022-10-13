import { useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { safelockFactoryAddresses, safelockFactoryABI, safelockABI } from "../constants"

const Safelock = ({ mySafelockId, mySafelockAddress }) => {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const safelockFactoryAddress =
        chainId in safelockFactoryAddresses ? safelockFactoryAddresses[chainId][0] : null
    const updateUI = async () => {}

    useEffect(() => {
        if(isWeb3Enabled, mySafelockAddress){
            
        }
    }, [mySafelockAddress, isWeb3Enabled])
    return (
        <div>
            My SafelockId:{mySafelockId}
            My Safelock Address:{mySafelockAddress}
        </div>
    )
}

export default Safelock
