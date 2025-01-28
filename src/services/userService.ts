const URL_BASE="http://localhost:3000/api/"
export const getUsers=async ()=>{
    try {
        const response=await fetch(URL_BASE+'users/userlist',
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