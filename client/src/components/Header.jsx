function Header() {
  return (
    <header
      style={{
        height: "76px",
        background: "white",
        borderBottom: "1px solid #e8ebf0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 35px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div>
        <strong
          style={{
            fontSize: "18px",
          }}
        >
          Expense Tracker
        </strong>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "#eeedff",
            color: "#4f46e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
          }}
        >
          U
        </div>

        <div>
          <strong
            style={{
              fontSize: "14px",
            }}
          >
            Demo User
          </strong>

          <div
            style={{
              fontSize: "11px",
              color: "#8a93a3",
            }}
          >
            demo@example.com
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;