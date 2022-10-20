import { Icon } from "@iconify/react"
import { useRouter } from "next/router"
import { baseURL } from "../constants"
import { useNotification } from "web3uikit"
import { useEffect, useState } from "react"
import QRCode from "qrcode"
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
    const router = useRouter()
    const pageUrl = baseURL + router.asPath
    const whatsappShareText = `Check out my Safelock with address ${safelockAddress} at ${pageUrl}`
    const dispatch = useNotification()
    const [qrCode, setQrCode] = useState("")

    const generateQRCode = () => {
        QRCode.toDataURL(pageUrl, (err, qrUrl) => {
            if (err) {
                return console.error(err)
            }
            setQrCode(qrUrl)
        })
    }

    useEffect(() => {
        generateQRCode()
    }, [])
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
            <div className="share-methods">
                <div
                    className="share-method"
                    onClick={() => {
                        navigator.clipboard.writeText(pageUrl)
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
                    <a href={`whatsapp://send?text=${whatsappShareText}`} target="_blank">
                        <span>Whatsapp</span>
                        <span>
                            <Icon icon="akar-icons:whatsapp-fill" />
                        </span>
                    </a>
                </div>

                <div className="share-method socials">
                    <div>
                        <EmailShareButton url={pageUrl}>
                            <Icon icon="clarity:email-line" />
                        </EmailShareButton>
                    </div>
                    <div>
                        <FacebookShareButton>
                            <Icon icon="akar-icons:facebook-fill"/>
                        </FacebookShareButton>
                    </div>
                    <div>
                        <TwitterShareButton url={pageUrl}>
                            <Icon icon="akar-icons:twitter-fill" />
                        </TwitterShareButton>
                    </div>
                    <div>
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
