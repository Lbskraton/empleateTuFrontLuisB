import User from "../models/User"
import fetchAPI from "../utils/FetchAPI"

const API_URL_BASE=import.meta.env.VITE_API_URL_BASE+'/auth'



export const loginUser= async (email:string,password:string)=>{
    console.log(import.meta.env.VITE_API_URL_BASE)
    console.log(API_URL_BASE)

     return await fetchAPI(API_URL_BASE+'/login',{method: 'POST',
        headers:{
            'Content-Type': 'application/json'
            //token si hubiera
        },
        body: JSON.stringify({email,password}),
        credentials: "include" //para poder inyectar la cookie si se puede
        

    })
    

}

export const registerUser=async(user:Partial<User>)=>{
    return await fetchAPI(API_URL_BASE+'/register',{method: 'POST',
        headers:{
            'Content-Type': 'application/json'
            //token si hubiera
        },
        body: JSON.stringify(user),
        credentials: "include" //para poder inyectar la cookie si se puede
        

    })
}