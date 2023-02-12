import { useState } from "react"

const AddSafe = ({ onClick }) => {
    const [showInfo, setShowInfo] = useState(false)
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                onClick={onClick}
                onMouseEnter={() => {
                    setShowInfo(true)
                }}
                onMouseLeave={() => {
                    setShowInfo(false)
                }}
                className="add-safe-button"
                style={{
                    border: "solid",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                }}
            >
                +
            </div>
            <div className={`add-safe-info ${!showInfo && "hidden"}`}>
                Click to Create a New Safe
            </div>
        </div>
    )
}

export default AddSafe
