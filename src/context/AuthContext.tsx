import { createContext, useContext, useEffect, useState } from "react";
import User from "../models/User";

import { loginUser } from "../services/auth.service";

const API_URL_BASE=import.meta.env.VITE_API_URL_BASE+'/auth'

//interfaz de datos del jwt, alternativa  a partial<User>
/*
interface UserPayLoad{ 
  id:number
  email:string
  role:string
}
*/
interface AuthContextType{
  user:Partial<User> | null
  isAuthenticated:boolean
  isAdmin:boolean
  login: (email:string, password:string)=>Partial<User> | null | Promise<void>
  logout:()=>void
}


const AuthContext=createContext<AuthContextType | null>(null)

export function AuthProvider({children}:{children:React.ReactNode}){

  useEffect(()=>{
    async function callBack(){
      const response=await fetch(import.meta.env.VITE_API_URL_BASE+'/users/profile',{credentials:"include"})
      const data=response.json()
      setUser(data)

    }
    callBack()
    
    
  },[])

  const [user,setUser]=useState<Partial<User> | null>(null)

  const login=async (email:string,password:string)=>{
      try {
        const tokenJWT=await loginUser(email,password)
        setUser(tokenJWT)
      } catch (error) {
        throw new Error('Error en el login '+error?.message)
      }
  }

  const logout=async ()=>{
    await fetch(API_URL_BASE,{method:'POST',credentials:"include"})
    setUser(null)
  }

  return <AuthContext.Provider value={{user,login,logout,isAdmin: user?.role==='admin', isAuthenticated: !!user}}>
    {children}
  </AuthContext.Provider>
}

export function useAuth(){
  const context=useContext(AuthContext)
  if(!context) throw new Error('No puedes acceder al contexto fuera del Auth Provider')
  return context
}
