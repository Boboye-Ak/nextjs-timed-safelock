import { useState } from "react"

const Switch = ({ isToggled, onToggle, info }) => {
    const [showInfo, setShowInfo] = useState(false)
    return (
        <div>
            <label
                className="switch"
                onMouseEnter={() => {
                    setShowInfo(true)
                }}
                onMouseLeave={() => {
                    setShowInfo(false)
                }}
            >
                <input type="checkbox" checked={isToggled} onChange={onToggle} />
                <span className="slider" />
            </label>
            {info && (
                <div
                    className={`add-safe-info pc-only ${!showInfo && "hidden"}`}
                    style={{
                        position: "absolute",
                        right: "50px",
                    }}
                >
                    {info}
                </div>
            )}
        </div>
    )
}

export default Switch
