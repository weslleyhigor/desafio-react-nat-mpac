import { useState } from "react";
import { createVacancy } from "../../services/vacancyServices";

interface FormVacancyProps {
    userToken: string;
}

function FormVacancy ({userToken}: FormVacancyProps) {
    const [role, setRole] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [remote, setRemote] = useState<boolean>(false);
    const [link, setLink] = useState<string>("")
    const [salary, setSalary] = useState<string>("")
    const [messageFeedback, setMessageFeedback] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  

        const newSalary = Number(salary);

        if (isNaN(newSalary)) {
            setMessageFeedback('Digite apenas números')
        } else {
            createVacancy(userToken, {
                role: role,
                company: company,
                location: location,
                remote: remote,
                link: link,
                salary: newSalary
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastre uma nova vaga:</h2>

            <div>
                <label htmlFor="role">Nome da vaga</label>
                <input id="role" type="text" placeholder="Informe o cargo ou função da vaga" required value={role} onChange={(e) => setRole(e.target.value)}/>
            </div>
            
            <div>
                <label htmlFor="company">Nome da empresa</label>
                <input id="company" type="text" placeholder="Informe o nome da empresa" required value={company} onChange={(e) => setCompany(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="Localização da vaga"></label>
                <input id="location" type="text" placeholder="Informe a localização da vaga" required value={location} onChange={(e) => setLocation(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="remote">A vaga é remota?</label>
                <input id="remote" type="checkbox" placeholder="Indica se a vaga é remota" checked={remote} onChange={(e) => setRemote(e.target.checked)}/>
            </div>

            <div>
                <label htmlFor="link">Link da vaga</label>
                <input id="link" type="text" placeholder="Link para candidatura ou mais informações" required value={link} onChange={(e) => setLink(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="salary">Salário</label>
                <input id="salary" type="text" placeholder="Salário oferecido" required value={salary} onChange={(e) => setSalary(e.target.value)}/>
                <span>{messageFeedback}</span>
            </div>

            <button type="submit">Cadastrar vaga</button>

        </form>
    )
}

export default FormVacancy;