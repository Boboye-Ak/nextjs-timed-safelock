import CountdownTimer from "./CountdownTimer"
import { convertToEth } from "../utils/converter"
import { RiSafe2Line } from "react-icons/ri"
import { Icon } from "@iconify/react"

const Safe = ({ safeIndex, safeAmount, endTime, safelockAddress, isBroken, updateUI }) => {
    return (
        <div
            className="safe"
            style={{
                border: "solid",
                borderWidth: "thin",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                Safe #{safeIndex + 1}
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {convertToEth(safeAmount)} <Icon icon="cryptocurrency:matic" />
            </div>
            
                <div style={{ opacity: isBroken ? "1" : "0" }}>
                    <RiSafe2Line size="2em" />
                </div>
            
            <CountdownTimer
                endTime={endTime}
                safeIndex={safeIndex}
                safelockAddress={safelockAddress}
                isBroken={isBroken}
                updateUI={updateUI}
            />
        </div>
    )
}

export default Safe
