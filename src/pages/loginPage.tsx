import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../services/api";

interface LoginResponse {
    message: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [messageFeedback, setMessageFeedback] = useState<string>("");
    const [userToken, setUserToken] = useState<string | null>(localStorage.getItem("userToken"));


    useEffect(() => {
        if (userToken) {
            navigate("/");
        }
    }, [navigate, userToken]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const { data } = await api.post<LoginResponse>("/login", { email, password });

            setUserToken(data.message);

            localStorage.setItem("userToken", data.message);
            
            navigate("/");
        } catch (error) {
            console.error(error);
            setMessageFeedback("Email ou senha incorretos");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span>{messageFeedback}</span>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
