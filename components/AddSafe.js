const AddSafe = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                border: "solid",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                cursor:"pointer"
            }}
        >
            +
        </div>
    )
}

export default AddSafe
