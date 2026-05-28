import LoginPage from "../features/auth/LoginPage";
import DashboardPage from "../features/dashboard/DashboardPage";
import LandingPage from "../features/landing/LandingPage";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpeakingPage from "../features/speaking/SpeakingPage";
 
  export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/speaking" element={<SpeakingPage />} />
          {/* <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="/schedule" element={<SchedulePage />} /> */}
        </Routes>
      </BrowserRouter>
    );
 }

