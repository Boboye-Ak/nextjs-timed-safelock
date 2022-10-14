const AddSafe = ({ onClick }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                onClick={onClick}
                className="add-safe-button"
                style={{
                    border: "solid",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                }}
            >
                +
            </div>
        </div>
    )
}

export default AddSafe
