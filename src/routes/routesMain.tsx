import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import MainPage from "../pages/mainPage";


const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MainPage />} />
        </Routes>
    )
}

export default RoutesMain;