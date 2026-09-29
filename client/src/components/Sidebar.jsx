import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "white",
        borderRight: "1px solid #e8ebf0",
        padding: "25px 16px",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          fontSize: "22px",
          fontWeight: "800",
          padding: "0 12px",
          marginBottom: "35px",
        }}
      >
        Expense
        <span style={{ color: "#4f46e5" }}>
          Flow
        </span>
      </div>

      {/* MAIN */}
      <div style={{ marginBottom: "30px" }}>
        <div
          style={{
            fontSize: "11px",
            color: "#9aa3b2",
            textTransform: "uppercase",
            fontWeight: "700",
            padding: "0 12px",
            marginBottom: "8px",
          }}
        >
          Main
        </div>

        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            display: "block",
            padding: "11px 12px",
            borderRadius: "9px",
            marginBottom: "4px",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
            color: isActive
              ? "#4f46e5"
              : "#687386",
            background: isActive
              ? "#eeedff"
              : "transparent",
          })}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          style={({ isActive }) => ({
            display: "block",
            padding: "11px 12px",
            borderRadius: "9px",
            marginBottom: "4px",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
            color: isActive
              ? "#4f46e5"
              : "#687386",
            background: isActive
              ? "#eeedff"
              : "transparent",
          })}
        >
          Transactions
        </NavLink>

        <NavLink
          to="/budgets"
          style={({ isActive }) => ({
            display: "block",
            padding: "11px 12px",
            borderRadius: "9px",
            marginBottom: "4px",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
            color: isActive
              ? "#4f46e5"
              : "#687386",
            background: isActive
              ? "#eeedff"
              : "transparent",
          })}
        >
          Budgets
        </NavLink>

        <NavLink
          to="/categories"
          style={({ isActive }) => ({
            display: "block",
            padding: "11px 12px",
            borderRadius: "9px",
            marginBottom: "4px",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
            color: isActive
              ? "#4f46e5"
              : "#687386",
            background: isActive
              ? "#eeedff"
              : "transparent",
          })}
        >
          Categories
        </NavLink>
      </div>

      {/* ACCOUNT */}
      <div>
        <div
          style={{
            fontSize: "11px",
            color: "#9aa3b2",
            textTransform: "uppercase",
            fontWeight: "700",
            padding: "0 12px",
            marginBottom: "8px",
          }}
        >
          Account
        </div>

        <NavLink
          to="/profile"
          style={({ isActive }) => ({
            display: "block",
            padding: "11px 12px",
            borderRadius: "9px",
            marginBottom: "4px",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
            color: isActive
              ? "#4f46e5"
              : "#687386",
            background: isActive
              ? "#eeedff"
              : "transparent",
          })}
        >
          Profile
        </NavLink>

        <NavLink
          to="/settings"
          style={({ isActive }) => ({
            display: "block",
            padding: "11px 12px",
            borderRadius: "9px",
            marginBottom: "4px",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
            color: isActive
              ? "#4f46e5"
              : "#687386",
            background: isActive
              ? "#eeedff"
              : "transparent",
          })}
        >
          Settings
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;