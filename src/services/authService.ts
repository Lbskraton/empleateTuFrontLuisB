const URL_BASE="http://localhost:3000/api/"

export const loginUser= async (email:string,password:string)=>{
    try {
        const response= await fetch(URL_BASE+"auth/login",
            {method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                    //token si hubiera
                },
                body: JSON.stringify({email,password}),
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