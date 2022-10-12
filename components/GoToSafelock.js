import Link from "next/link"
const GoToSafelock = () => {
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
            <button>
                <Link href="/mysafelock">GO TO YOUR SAFELOCK</Link>
            </button>
        </div>
    )
}

export default GoToSafelock
