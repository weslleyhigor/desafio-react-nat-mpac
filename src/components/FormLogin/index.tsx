import { useState, useEffect } from "react";
import eyeOff from "../../assets/eye-off.svg";
import eyeOn from "../../assets/eye-on.svg";
import './style.css';



interface FormLoginProps {
    postUserLogin: (email: string, password: string) => void;
    messageFeedback: string;
}

function FormLogin ({ postUserLogin, messageFeedback }: FormLoginProps) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [typePassword, setTypePassword] = useState<string>("password");
    const [borderAlert, setBorderAlert] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  

        postUserLogin(email, password);
    };


    useEffect(() => {
        if (messageFeedback) {
            setBorderAlert("border-alert");
        } else {
            setBorderAlert("");
        }
    }, [messageFeedback, borderAlert]);

    const showPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (typePassword === "password") {
            setTypePassword("text");
        } else {
            setTypePassword("password");

        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-login">
                <h1>Login</h1>
            
                <div className="input-container" >
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email"
                        className={`input ${borderAlert}`}
                        type="email" 
                        placeholder="Digite aqui seu email" 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div className="input-container" >
                    <label htmlFor="password">Senha</label>
                    <div>
                        <input 
                        id="password"
                        className={`input ${borderAlert}`}
                        type={typePassword}	 
                        placeholder="Digite aqui sua senha" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="show-password" onClick={showPassword}>
                            {
                                typePassword === "password" ?
                                <img src={eyeOff} /> :
                                <img src={eyeOn} />
                            }
                        </button>
                    </div>

                </div>

                <span className="messageFeedback">{messageFeedback}</span>
                <button className="submit-button" type="submit">Login</button>
            </form>
    );
}

export default FormLogin;