import React from "react"

const YouDontHaveASafelock = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems:"center",
                height: "100vh",
            }}
        >
            <div>You Don't Have A Safelock. Please Create One</div>
            <button>CREATE SAFELOCK</button>
        </div>
    )
}

export default YouDontHaveASafelock
