import Link from "next/link"
import { useRouter } from "next/router"

const YouDontHaveASafelock = () => {
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
            <div className="no-safelock-text">You Don't Have A Safelock. Please Create One</div>

            <button
                className="glow-on-hover"
                onClick={() => {
                    router.push("/createsafelock")
                }}
            >
                CREATE SAFELOCK
            </button>
        </div>
    )
}

export default YouDontHaveASafelock
