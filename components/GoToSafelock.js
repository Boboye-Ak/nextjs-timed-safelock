import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import Loader from "./Loader"
const GoToSafelock = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "90vh",
                }}
            >
                {isLoading&&<Loader/>}
                <button
                    class="glow-on-hover"
                    onClick={() => {
                        setIsLoading(true)
                        router.push("/mysafelock")
                    }}
                >
                    GO TO YOUR SAFELOCK
                </button>
            </div>
        </>
    )
}

export default GoToSafelock
