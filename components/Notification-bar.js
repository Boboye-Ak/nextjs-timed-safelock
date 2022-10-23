const NotificationBar = ({isShown, notificationText}) => {
    return <div className={isShown ? "notification" : "notification hidden"}>{notificationText}</div>
}

export default NotificationBar
