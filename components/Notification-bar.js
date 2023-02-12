import { Icon } from "@iconify/react"
import { useState } from "react"

const NotificationBar = ({ isShown, notificationText, notificationType }) => {
    const notificationTypes = { success: "notification success", error: "notification error" }
    return (
        <div className={isShown ? notificationTypes[notificationType] : "notification hidden"}>
            {notificationType == "error" && <Icon icon="clarity:error-standard-line" />}
            {notificationText}
        </div>
    )
}

export default NotificationBar
