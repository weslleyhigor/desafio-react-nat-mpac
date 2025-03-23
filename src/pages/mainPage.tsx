import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { showAllVacancys } from "../services/vacancyServices";
import FormVacancy from "../components/FormVacancy";

import Header from "../components/Header";
import '../styles/mainPage.css'

interface Vacancy {
    id: string;
    company: string;
    role: string;
    salary: number;
}

function MainPage () {
    const navigate = useNavigate();
    const [userToken] = useState<string | null>(window.localStorage.getItem("userToken"));
    const [userEmail, setUserEmail] = useState<string | null>("");
    const [dataVacancy, setDataVacancy] = useState<Vacancy[]>([]);
    

    useEffect(() => {
        const checkAuth = () => {
            if (!localStorage.getItem("userToken")) {
                navigate("/login");
            } 
                
            if (userToken) {
                showAllVacancys(userToken, setDataVacancy);
                setDataVacancy(dataVacancy)
                setUserEmail(window.localStorage.getItem("userEmail"))
            }
        };
    
        window.addEventListener("storage", checkAuth);
        checkAuth(); 
    
        return () => {
          window.removeEventListener("storage", checkAuth);
        };

    }, [navigate, userToken, dataVacancy]);

    const logoutUser = () => {
        localStorage.removeItem("userToken")
        localStorage.removeItem("userEmail")
        navigate("/login")
    }


    return (
        <div>
            <Header logoutUser={logoutUser} userEmail={userEmail || ""}/>

            <main>
                <FormVacancy userToken={userToken || ""}/>

                <ul>
                    { 
                        dataVacancy ?  
                        dataVacancy.map((vacancy) => {
                            return (
                                <li key={vacancy.id}>
                                    <p>ID: {vacancy.id}</p>
                                    <p>Nome da vaga: {vacancy.role}</p>
                                    <p>Nome da empresa: {vacancy.company}</p>
                                    <p>Salário: R$ {vacancy.salary.toFixed(2).replace(".",",")}</p>

                                </li>
                            )
                        } )
                        : <h2>Não há vagas de emprego cadastradas</h2> 
                        
                    }
                </ul>
            </main>
        </div>
    )
}

export default MainPage;