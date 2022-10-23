import { useState } from "react"

const NotificationBar = ({ isShown, notificationText, notificationType }) => {
    const notificationTypes = { success: "notification success", error: "notification error" }
    return (
        <div className={isShown ? notificationTypes[notificationType] : "notification hidden"}>
            {notificationText}
        </div>
    )
}

export default NotificationBar
