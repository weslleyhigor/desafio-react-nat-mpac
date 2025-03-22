import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginPage";


const RoutesMain = () => {
     
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )

}

export default RoutesMain;