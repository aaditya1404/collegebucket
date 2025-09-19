import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./Components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import BuyPage from "./pages/BuyPage";
import SellPage from "./pages/SellPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div >
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
