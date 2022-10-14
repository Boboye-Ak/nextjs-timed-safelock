const NewSafeForm = () => {
    return (
        <div
            style={{
                border: "solid",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width:"100%",
                    border: "solid",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <input type="number" placeholder="AMOUNT" />
                <div>
                    <input type="number" placeholder="DAYS" />
                    <input type="number" placeholder="HOURS" />
                    <input type="number" placeholder="MINUTES" />
                    <input type="number" placeholder="SECONDS" />
                </div>
            </div>
            <button>CREATE SAFE</button>
        </div>
    )
}

export default NewSafeForm
