import { Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user } = useAuth();

  return (
    <header className="top-header">
      <div>
        <strong>Expense Tracker</strong>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Bell size={20} color="#687386" />

        <div>
          <strong style={{ fontSize: "14px" }}>
            {user?.name || "User"}
          </strong>

          <div
            style={{
              fontSize: "11px",
              color: "#8a93a3",
            }}
          >
            {user?.email}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;