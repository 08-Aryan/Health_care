import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";


// Auth pages (Dev1)
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

// Future pages for Dev2/Dev3/Dev4 (placeholders for now)
import PatientDashboard from "./pages/PatientDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import ProviderPatientDetails from "./pages/ProviderPatientDetails";
import Profile from "./pages/Profile";
import Goals from "./pages/Goals";
import PublicHealthInfo from "./pages/PublicHealthInfo";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/public/health" element={<PublicHealthInfo />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Patient Protected Routes */}
          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute roles={["patient"]}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient/profile"
            element={
              <ProtectedRoute roles={["patient"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient/goals"
            element={
              <ProtectedRoute roles={["patient"]}>
                <Goals />
              </ProtectedRoute>
            }
          />

          {/* Provider Protected Routes */}
          <Route
            path="/provider/dashboard"
            element={
              <ProtectedRoute roles={["provider"]}>
                <ProviderDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/provider/patient/:id"
            element={
              <ProtectedRoute roles={["provider"]}>
                <ProviderPatientDetails />
              </ProtectedRoute>
            }
          />

          {/* Default Route */}
          <Route path="*" element={<Login />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
