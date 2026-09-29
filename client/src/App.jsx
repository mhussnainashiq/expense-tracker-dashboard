import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";
import Login from "./pages/Login";
import Register from "./pages/Register";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="main-content">
        <Header />

        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
                path="/transactions"
                element={<Transactions />}
              />
              <Route
                  path="/transactions/add"
                  element={<AddTransaction />}
                />
                <Route
              path="/transactions/edit/:id"
              element={<EditTransaction />}
            />
          <Route
            path="/budgets"
            element={
              <div className="page-content">
                <h1 className="page-title">
                  Budgets
                </h1>

                <p className="page-description">
                  Manage your monthly budgets.
                </p>
              </div>
            }
          />

          <Route
            path="/categories"
            element={
              <div className="page-content">
                <h1 className="page-title">
                  Categories
                </h1>

                <p className="page-description">
                  Manage your expense categories.
                </p>
              </div>
            }
          />

          <Route
            path="/profile"
            element={
              <div className="page-content">
                <h1 className="page-title">
                  Profile
                </h1>

                <p className="page-description">
                  Manage your profile.
                </p>
              </div>
            }
          />

          <Route
            path="/settings"
            element={
              <div className="page-content">
                <h1 className="page-title">
                  Settings
                </h1>

                <p className="page-description">
                  Manage application settings.
                </p>
              </div>
            }
          />

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
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;