import closeModalImg from '../../assets/menu-close-modal.svg'
import { useState, useEffect } from 'react';
import { editVacancy } from '../../services/vacancyServices';

function FormEditVacancy ({userToken, detailsVacancy, setIsOpenModalEditVacancy, setDetailsVacancy}) {

    const [role, setRole] = useState<string>(detailsVacancy?.role || '');
    const [company, setCompany] = useState<string>(detailsVacancy?.company || '');
    const [location, setLocation] = useState<string>(detailsVacancy?.location || '');
    const [remote, setRemote] = useState<boolean>(detailsVacancy?.remote || false);
    const [link, setLink] = useState<string>(detailsVacancy?.link || '');
    const [salary, setSalary] = useState<string>(detailsVacancy?.salary || '');
  
    const [messageFeedback, setMessageFeedback] = useState<string>('');

    useEffect(() => {
      if (detailsVacancy) { 
        setRole(detailsVacancy.role || '');
        setCompany(detailsVacancy.company || '');
        setLocation(detailsVacancy.location || '');
        setRemote(detailsVacancy.remote || false);
        setLink(detailsVacancy.link || '');
        setSalary(detailsVacancy.salary || '');
      }
    }, [detailsVacancy]);
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDetailsVacancy([])

        const newSalary = Number(salary);

        if (isNaN(newSalary)) {  
            setMessageFeedback("Digite apenas números");
        } else {

            editVacancy(userToken, detailsVacancy.id, {
                role: role,
                company: company,
                location: location,
                remote: remote,
                link: link,
                salary: newSalary,
            })
            
        }

        setRole("");
        setCompany("");
        setLocation("");
        setRemote(false);
        setLink("");
        setSalary("");
        setMessageFeedback("")
    };
    

    return (
        <div className="modalOverlay">
      <form onSubmit={handleSubmit} className="modalBox">
        <h2>Editar vaga</h2>

        <button type="button" className="closeButton" onClick={() => setIsOpenModalEditVacancy(false)}>
            <img src={closeModalImg} />
        </button>

        <div className="role-container">
          <label htmlFor="role">Nome da vaga</label>
          <input
            id="role"
            type="text"
            placeholder="Informe o cargo ou função da vaga"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="company-container">
          <label htmlFor="company">Nome da empresa</label>
          <input
            id="company"
            type="text"
            placeholder="Informe o nome da empresa"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="location-container">
          <label htmlFor="location">Localização da vaga</label>
          <input
            id="location"
            type="text"
            placeholder="Informe a localização da vaga"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="remote-container">
          <label htmlFor="remote">A vaga é remota?</label>
          <input
            id="remote"
            type="checkbox"
            placeholder="Indica se a vaga é remota"
            checked={remote}
            onChange={(e) => setRemote(e.target.checked)}
          />
        </div>

        <div className="link-container">
          <label htmlFor="link">Link da vaga</label>
          <input
            id="link"
            type="text"
            placeholder="Link para candidatura ou informações"
            required
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="salary-container">
          <label htmlFor="salary">Salário</label>
          <input
            id="salary"
            type="text"
            placeholder="Salário oferecido"
            required
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <span>{messageFeedback}</span>
        </div>

        <button className="submit-button" type="submit">Editar vaga</button>
      </form>
    </div>
    )
}

export default FormEditVacancy;