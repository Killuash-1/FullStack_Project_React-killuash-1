import LandingPage from "../pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SecureRoutes from "../components/SecureRoutes";

const Browsing = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route element={<SecureRoutes/>}>

      <Route path="/HomePage" element={<HomePage/>}/>
      </Route>
      
    </Routes>
  );
};

export default Browsing;
