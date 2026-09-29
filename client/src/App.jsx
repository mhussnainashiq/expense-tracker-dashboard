import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";

function SimplePage({ title, description }) {
  return (
    <div className="page-content">
      <h1 className="page-title">
        {title}
      </h1>

      <p className="page-description">
        {description}
      </p>

      <div className="card">
        <h3
          style={{
            marginBottom: "10px",
          }}
        >
          Coming Soon
        </h3>

        <p
          style={{
            color: "#7b8495",
          }}
        >
          This section will be built next.
        </p>
      </div>
    </div>
  );
}

function DashboardLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#f5f7fb",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          marginLeft: "250px",
          minWidth: 0,
        }}
      >
        <Header />

        <Routes>
          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* TRANSACTIONS */}
          <Route
            path="/transactions"
            element={<Transactions />}
          />

          {/* ADD TRANSACTION */}
          <Route
            path="/transactions/add"
            element={<AddTransaction />}
          />

          {/* EDIT TRANSACTION */}
          <Route
            path="/transactions/edit/:id"
            element={<EditTransaction />}
          />

          {/* BUDGETS */}
          <Route
            path="/budgets"
            element={
              <SimplePage
                title="Budgets"
                description="Manage your monthly budgets."
              />
            }
          />

          {/* CATEGORIES */}
          <Route
            path="/categories"
            element={
              <SimplePage
                title="Categories"
                description="Manage your expense categories."
              />
            }
          />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={
              <SimplePage
                title="Profile"
                description="Manage your profile information."
              />
            }
          />

          {/* SETTINGS */}
          <Route
            path="/settings"
            element={
              <SimplePage
                title="Settings"
                description="Manage your application settings."
              />
            }
          />

          {/* UNKNOWN URL */}
          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={<DashboardLayout />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;