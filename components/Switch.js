import { useState } from "react"

const Switch = ({ isToggled, onToggle }) => {
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
            <div
                className={`add-safe-info ${!showInfo && "hidden"}`}
                style={{
                    position: "absolute",
                    right: "50px",
                }}
            >
                Toggle to See Opened Safes
            </div>
        </div>
    )
}

export default Switch
