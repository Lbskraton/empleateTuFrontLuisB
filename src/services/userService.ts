
const API_URL_BASE=import.meta.env.VITE_API_URL_BASE+'/users'

export const getUsers=async ()=>{
    try {
        const response=await fetch(API_URL_BASE+'/userlist',
            {method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                    //token si hubiera
                },
                credentials: "include" //para poder inyectar la cookie si se puede
                
    
            })
        if(!response.ok){
            throw new Error("Error al inciar sesion")
        }
        return await response.json()
    } catch (error) {
        const msg= error instanceof Error ? error.message : "Error desconocido"
        throw new Error(msg)
    }
    
}