import { Icon } from "@iconify/react"
import { useRouter } from "next/router"
import { baseURL } from "../constants"
import { useNotification } from "web3uikit"
import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { useMoralis } from "react-moralis"
import { safelockFactoryAddresses, chains } from "../constants"
import NotificationBar from "./Notification-bar"
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterIcon,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
} from "react-share"

const ShareModal = ({ toggleShowShareModal, showShareModal, safelockId, safelockAddress }) => {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const safelockFactoryAddress =
        chainId in safelockFactoryAddresses ? safelockFactoryAddresses[chainId][0] : null
    let activeChain = chains.filter((chain) => {
        if (chain.chainId == chainId) {
            return chain
        }
    })
    activeChain = activeChain[0]
    const router = useRouter()
    const pageUrl = baseURL + router.asPath
    const whatsappShareText = `Check out my Safelock with address ${safelockAddress} at ${pageUrl}`
    const dispatch = useNotification()
    const [qrCode, setQrCode] = useState("")
    const [notificationText, setNotificationText] = useState("")
    const [showNotificationBar, setShowNotificationBar] = useState(false)

    const generateQRCode = () => {
        QRCode.toDataURL(pageUrl, (err, qrUrl) => {
            if (err) {
                return console.error(err)
            }
            setQrCode(qrUrl)
        })
    }
    const showNotification = (text) => {
        setNotificationText(text)
        setShowNotificationBar(true)
        setTimeout(() => {
            setShowNotificationBar(false)
            setNotificationText("")
        }, 5000)
        
    }

    useEffect(() => {
        generateQRCode()
    }, [])
    return (
        <div className={showShareModal ? "share-modal" : "share-modal hidden"}>
            <NotificationBar isShown={showNotificationBar} notificationText={notificationText} />
            <div className="back-button">
                <div
                    className="actual-back-button"
                    onClick={() => {
                        toggleShowShareModal()
                    }}
                >
                    X
                </div>
            </div>
            <div className="share-methods">
                <div
                    className="share-method"
                    onClick={() => {
                        navigator.clipboard.writeText(pageUrl)
                        showNotification("Safelock URL copied to clipboard")
                    }}
                >
                    <span>Copy To Clipboard</span>
                    <span>
                        <Icon icon="clarity:copy-to-clipboard-line" />
                    </span>
                </div>
                <div className="share-method">
                    <a
                        href={qrCode}
                        download={`safelock #${safelockId}-${safelockAddress}-QRCode.png`}
                    >
                        <span>Download QRCode</span>
                        <span>
                            <Icon icon="carbon:qr-code" />
                        </span>
                    </a>
                </div>

                <div className="share-method">
                    <a
                        href={`whatsapp://send?text=${whatsappShareText}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span>Whatsapp</span>
                        <span>
                            <Icon icon="akar-icons:whatsapp-fill" />
                        </span>
                    </a>
                </div>
                <div className="share-method">
                    <a
                        href={`${activeChain.blockExplorerUrl}/address/${safelockAddress}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span>{activeChain.blockExplorerName}</span>
                        <span>
                            <Icon icon="openmoji:polar-explorer" />
                        </span>
                    </a>
                </div>

                <div className="share-method socials">
                    <div className="socials-icon">
                        <EmailShareButton url={pageUrl}>
                            <Icon icon="clarity:email-line" />
                        </EmailShareButton>
                    </div>
                    <div className="socials-icon">
                        <FacebookShareButton>
                            <Icon icon="akar-icons:facebook-fill" />
                        </FacebookShareButton>
                    </div>
                    <div className="socials-icon">
                        <TwitterShareButton url={pageUrl}>
                            <Icon icon="akar-icons:twitter-fill" />
                        </TwitterShareButton>
                    </div>
                    <div className="socials-icon">
                        <TelegramShareButton url={pageUrl}>
                            <Icon icon="akar-icons:telegram-fill" />
                        </TelegramShareButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareModal
