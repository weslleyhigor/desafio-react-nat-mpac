import './style.css';
import { deleteVacancy } from '../../services/vacancyServices';
import { showVacancy } from '../../services/vacancyServices';

interface Vacancy {
    id: number;
    role: string;
    company: string;
    salary: number;
    location: string;
}

function VacancyCard ({vacancy, userToken, setIsOpenModalDetailsVacancy, setIsOpenModalEditVacancy, setVacancyId, detailsVacancy, setDetailsVacancy}: { vacancy: Vacancy, userToken: string }) {

    return (
        <li key={vacancy.id} className='card'>
            <div className='description-container'>
                <p className='job-name'>{vacancy.role}</p>
                <p>{vacancy.location}</p>
            </div>

            <div className='buttons-container'>
                <button 
                id='details-button' 
                onClick={ ()=> { 
                    setIsOpenModalDetailsVacancy(true) 
                    showVacancy(userToken, vacancy.id, detailsVacancy, setDetailsVacancy)
                }}>Detalhes</button>

                <button id='edit-button' onClick={()=> {
                    setIsOpenModalEditVacancy(true)
                    }}>Editar</button>
                <button id='delete-button' onClick={()=> deleteVacancy(userToken, vacancy.id)}>Deletar</button>
            </div>
        </li>
    )
}

export default VacancyCard;