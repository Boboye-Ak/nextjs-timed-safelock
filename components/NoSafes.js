const NoSafes = ({ isOwner }) => {
    return (
        <div
            style={{
                border: "solid",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
            }}
            className="no-safes"
        >
            {isOwner?<>YOU DO NOT HAVE ANY SAFES...YET</>:<>NO SAFES IN THIS SAFELOCK...YET</>}
        </div>
    )
}

export default NoSafes
