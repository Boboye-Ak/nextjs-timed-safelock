import { Icon } from "@iconify/react"
import { useRouter } from "next/router"
import { baseURL } from "../constants"
import { useNotification } from "web3uikit"

const ShareModal = ({ toggleShowShareModal, showShareModal }) => {
    const router = useRouter()
    const pageUrl = baseURL + router.asPath
    const dispatch = useNotification()
    return (
        <div className={showShareModal ? "share-modal" : "share-modal hidden"}>
            <div className="back-button">
                <div
                    className="actual-back-button"
                    onClick={() => {
                        toggleShowShareModal()
                    }}
                >
                    x
                </div>
            </div>
        </div>
    )
}

export default ShareModal
