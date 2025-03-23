import { api } from "./api";

export async function showAllVacancys (userToken: string, setDataVacancy: (data: any) => void){
    try {
        const { data } = await api.get("/openings", {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })

        setDataVacancy(data.message)

    } catch (error) {
        console.log(error)
    } 
}

export async function showVacancy (userToken) {
    
}

export async function createVacancy (userToken: string, dataFormVacancy: Record<string, any>) {
    try {
        const { data } = await api.post("/opening", dataFormVacancy, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })

        return data;
    } catch (error) {
        console.log(error)
    }
}

export function editVacancy (userToken) {

}

export function deleteVacancy (userToken) {

}
