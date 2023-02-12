import CountdownTimer from "./CountdownTimer"
import { convertToEth } from "../utils/converter"
import { RiSafe2Line } from "react-icons/ri"
import { Icon } from "@iconify/react"

const Safe = ({
    safeIndex,
    safeAmount,
    endTime,
    safelockAddress,
    safelockOwner,
    isBroken,
    beneficiary,
    isOwner,
    updateUI,
    isHidden,
}) => {
    return (
        <div
            className={isHidden ? "safe hidden" : "safe"}
            style={{
                border: "solid",
                borderWidth: "thin",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <div className="safe-index pc-only">Safe #{safeIndex + 1}</div>
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
                isOwner={isOwner}
                isBroken={isBroken}
                beneficiary={beneficiary}
                updateUI={updateUI}
            />
        </div>
    )
}

export default Safe
