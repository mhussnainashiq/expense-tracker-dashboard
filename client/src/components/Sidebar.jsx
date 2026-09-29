import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  WalletCards,
  Tags,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();

  const links = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      to: "/transactions",
      label: "Transactions",
      icon: ArrowLeftRight,
    },
    {
      to: "/budgets",
      label: "Budgets",
      icon: WalletCards,
    },
    {
      to: "/categories",
      label: "Categories",
      icon: Tags,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        Expense<span>Flow</span>
      </div>

      <div className="nav-section">
        <div className="nav-title">Main</div>

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="nav-section">
        <div className="nav-title">Account</div>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <User size={18} />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>

        <button
          className="nav-link"
          onClick={logout}
          style={{
            width: "100%",
            border: 0,
            background: "transparent",
          }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;