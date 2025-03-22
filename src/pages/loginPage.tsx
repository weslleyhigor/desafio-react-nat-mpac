import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import FormLogin from "../components/FormLogin";
import '../styles/loginPage.css';

interface LoginResponse {
    message: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const [messageFeedback, setMessageFeedback] = useState<string>("");
    const [userToken, setUserToken] = useState<string | null>(localStorage.getItem("userToken"));


    useEffect(() => {
        if (userToken) {    
            navigate("/");
        }

    }, [navigate, userToken]);

    const postUserLogin = async (email:string, password:string) => {
        try {
            const { data } = await api.post<LoginResponse>("/login", {email, password});

            setUserToken(data.message);

            localStorage.setItem("userToken", data.message);
            
            navigate("/");
        } catch (error) {
            console.error(error);
            setMessageFeedback("Email ou senha incorretos");
        }
    };


    return (
        <div className="container-content">
            <FormLogin postUserLogin={postUserLogin} messageFeedback={messageFeedback} />
        </div>
    );
};

export default LoginPage;
