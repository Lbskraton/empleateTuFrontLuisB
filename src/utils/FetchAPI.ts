export default async function fetchAPI(endpoint:string,options={}){

    try {
        const response=await fetch(endpoint,
            options)

        if(response.status==401){
            window.location.href='/login'
            throw new Error('Sesion expirada, logea de nuevo')
        }
        if(!response.ok) {
            const errordata=await response.json().catch(()=>null) //guardo dato fallo y pongo a nulo
            throw new Error(errordata?.message || 'Error desconocido')
        }
        const data=await response.json()
        return data
    } catch (error) {
        const msg=error instanceof Error ? error.message : "Error desconocido"
        throw new Error(msg) //devuelve un json
    }


}