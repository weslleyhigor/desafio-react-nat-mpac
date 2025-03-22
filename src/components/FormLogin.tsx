import { useState } from "react";

interface FormLoginProps {
    postUserLogin: (email: string, password: string) => void;
    messageFeedback: string;
}

function FormLogin ({ postUserLogin, messageFeedback }: FormLoginProps) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  

        postUserLogin(email, password);
    };
    
    return (
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
    );
}

export default FormLogin;