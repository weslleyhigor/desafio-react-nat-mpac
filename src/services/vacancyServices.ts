import { api } from "./api";

export async function showAllVacancys (userToken: string, setDataVacancy: (data: object) => void, navigate: (path: string) => void, setLoading: (loading: boolean) => void){

    try {
        setLoading(true)
        const { data } = await api.get("/openings", {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })

        setDataVacancy(data.message)

    } catch (error) {

        if (error.response.data.message === "No openings found for this user") {
            setDataVacancy([])
        }

        if (error.response.data.message === "Invalid or expired token") {
            localStorage.removeItem('userToken')
            localStorage.removeItem('userEmail')
            navigate("/login")
        }
    } finally {
        setLoading(true)
    }
}


export async function showVacancy (userToken: string, idVacancy:number, detailsVacancy, setDetailsVacancy ) {
    try {
        const { data } = await api.get(`/opening?id=${idVacancy}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })

        setDetailsVacancy(data.message)

    } catch (error) {
        console.log(error)
    }
}

export async function createVacancy (userToken: string, dataFormVacancy: Record<string, void>) {
    try {
        const { data } = await api.post("/opening", dataFormVacancy, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })

    } catch (error) {
        console.log(error)
    }
}

export async function editVacancy (userToken: string, idVacancy, dataEditVacancy: Record<string, void>) {
    try {
        const { data } = await api.put(`/opening?id=${idVacancy}`, dataEditVacancy, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })

    } catch (error) {
        console.log(error)
    }
}

export async function deleteVacancy (userToken: string, idVacancy: number) {
    try {
        const { data } = await api.delete(`/opening?id=${idVacancy}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })

        return data.message
    } catch (error) {
        console.log(error)
    }
}
