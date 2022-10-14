import Link from "next/link"
import { useRouter } from "next/router"
const GoToSafelock = () => {
    const router = useRouter()
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
            <button class="glow-on-hover" onClick={()=>{
                router.push("/mysafelock")
            }}>
                GO TO YOUR SAFELOCK
            </button>
        </div>
    )
}

export default GoToSafelock
