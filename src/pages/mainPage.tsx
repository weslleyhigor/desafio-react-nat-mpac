import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { showAllVacancys } from "../services/vacancyServices";
import FormNewVacancy from "../components/FormNewVacancy";

import Header from "../components/Header";
import '../styles/mainPage.css'
import VacancyCard from "../components/VacancyCard";
import DetailsVacancy from "../components/DetailsVacancy";
import FormEditVacancy from "../components/FormEditVacancy";

interface Vacancy {
    id: number;
    company: string;
    role: string;
    salary: number;
}

function MainPage () {
    const navigate = useNavigate();
    const [userToken] = useState<string | null>(window.localStorage.getItem("userToken"));
    const [userEmail, setUserEmail] = useState<string | null>("");
    const [dataVacancy, setDataVacancy] = useState<Vacancy[]>([]);
    const [vacancyId, setVacancyId] = useState<number | null>(null)

    const [isOpenModalNewVacancy, setIsOpenModalNewVacancy] = useState<boolean>(false);    
    const [isOpenModalDetailsVacancy, setIsOpenModalDetailsVacancy] = useState<boolean>(false);
    const [isOpenModalEditVacancy, setIsOpenModalEditVacancy] = useState<boolean>(false);
    const [detailsVacancy, setDetailsVacancy] = useState([])


    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const checkAuth = () => {
            if (!localStorage.getItem("userToken")) {
                navigate("/login");
            } 
                
            if (userToken) {
                showAllVacancys(userToken, setDataVacancy, navigate, setLoading);
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
        <div className="container-mainPage">
            <Header logoutUser={logoutUser} userEmail={userEmail || ""}/>

            <main>
                <button className="create-vacancy-button" onClick={() => setIsOpenModalNewVacancy(true)}>Nova vaga</button>

                {
                    isOpenModalNewVacancy ? <FormNewVacancy userToken={userToken || ""} setIsOpenModalNewVacancy={setIsOpenModalNewVacancy}/> : null
                
                }
                
                {
                    isOpenModalDetailsVacancy ? <DetailsVacancy  setIsOpenModalDetailsVacancy={setIsOpenModalDetailsVacancy}  detailsVacancy={detailsVacancy} setDetailsVacancy={setDetailsVacancy}/> : null
                }

                {
                    isOpenModalEditVacancy ? <FormEditVacancy userToken={userToken} detailsVacancy={detailsVacancy} setIsOpenModalEditVacancy={setIsOpenModalEditVacancy} /> : null
                }

                <ul className="container-list-vacancys">
                    <h2 className="container-list-title">Lista de Vagas</h2>

                    <div className="container-list">
                        { 
                            loading ? (
                                dataVacancy.length > 0 ?  
                                dataVacancy.map((vacancy) => {
                                    return (
                                        <VacancyCard key={vacancy.id} vacancy={vacancy} userToken={userToken || ""} setIsOpenModalDetailsVacancy={setIsOpenModalDetailsVacancy} setIsOpenModalEditVacancy={setIsOpenModalEditVacancy} setVacancyId={setVacancyId} detailsVacancy={detailsVacancy} setDetailsVacancy={setDetailsVacancy} />
                                    )
                                } )
                                : <h2 className="not-vacancys-info">Não há vagas de emprego cadastradas</h2> 
                            ) : <h2>Carregando vagas...</h2>

                            
                        }          
                    </div>
                </ul>
            </main>
        </div>
    )
}

export default MainPage;