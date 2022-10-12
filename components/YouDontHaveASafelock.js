import Link from "next/link"

const YouDontHaveASafelock = () => {
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
            <div>You Don't Have A Safelock. Please Create One</div>
            <button>
                <Link href="/createsafelock">CREATE SAFELOCK</Link>
            </button>
        </div>
    )
}

export default YouDontHaveASafelock
