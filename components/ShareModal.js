import { Icon } from "@iconify/react"
import { useRouter } from "next/router"
import { baseURL } from "../constants"
import { useNotification } from "web3uikit"

const ShareModal = () => {
    const router = useRouter()
    const pageUrl = baseURL + router.asPath
    const dispatch = useNotification()
    return (
        <div className="share-modal">
            <div
                className="share-icon"
                onClick={() => {
                    navigator.clipboard.writeText(causeOwner)
                }}
            >
                <Icon icon="clarity:copy-line" />
            </div>
            <div className="share-icon">
                <Icon icon="ant-design:qrcode-outlined" />
            </div>
            <div className="share-icon">
                <Icon icon="carbon:email" />
            </div>
            <div className="share-icon">
                <Icon icon="akar-icons:twitter-fill" />
            </div>
            <div className="share-icon">
                <Icon icon="akar-icons:whatsapp-fill" />
            </div>
        </div>
    )
}

export default ShareModal
