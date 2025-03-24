import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
    message: string;
}

export const postUserLogin = async (email:string, password:string, setTokenLogin:string, setUserToken:string, setMessageFeedback:string) => {

    const navigate = useNavigate()

    try {
        const { data } = await api.post<LoginResponse>("/login", {email, password});

        setUserToken(data.message);
        setTokenLogin(data.message)

        localStorage.setItem("userToken", data.message);
        localStorage.setItem("userEmail", email)
        
        navigate("/");
    } catch (error) {
        console.error(error);
        setMessageFeedback("Email ou senha incorretos");
    }
};