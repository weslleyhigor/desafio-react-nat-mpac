import closeModalImg from '../../assets/menu-close-modal.svg'
import './style.css'

function DetailsVacancy ({setIsOpenModalDetailsVacancy, detailsVacancy, setDetailsVacancy}) {

    return (
        <div className="modalOverlay">
            <div className="modalBox">
                <button type="button" className="closeButton" onClick={() => {
                    setDetailsVacancy([])

                    setIsOpenModalDetailsVacancy(false)
                }}>
                    <img src={closeModalImg} />
                </button>

                
                <div className='content-container'>
                    <h1>{detailsVacancy.role}</h1>
                    
                    <div className='content-container-vacancy'>
                        <p><span>Empresa:</span> {detailsVacancy.company}</p>
                        <p><span>Local:</span> {detailsVacancy.location}</p>
                        <p><span>Remoto?</span> {detailsVacancy.remote == false? 'Não':'Sim'}</p>
                        <p><span>Link da candidatura:</span> {detailsVacancy.link}</p>
                        <p><span>Salário:</span> R$ {detailsVacancy.salary}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsVacancy;