import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Dashboard from "../pages/Dashboard";
import Feedback from "../pages/Feedback";
import InsightsPage from "../features/insights/InsightsPage";
import Media from "../pages/Media";
import ProtectedRoute from "../auth/ProtectedRoute";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />

        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <InsightsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/media"
          element={
            <ProtectedRoute>
              <Media />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
