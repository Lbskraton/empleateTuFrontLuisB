import { useEffect, useState } from "react"

import User from "../models/User"
import { UserService } from "../services/userService"



function ListUsers() {

  const [message,setMessage]=useState('')
  const [loading,setLoading]=useState(true)
  const [users,setUsers]=useState<User[]>([])

async function receiveList(){//Creo funcion por useEffect no puede async
  try {
    const usersList=await UserService.getUsers()
    setUsers(usersList)
  } catch (error) {
    const msg= error instanceof Error ? error.message : "Error desconocido"
      setMessage(msg)
  }finally{
    setLoading(false)
  }
}

  useEffect(()=>{
    //Llamada a la apy
    receiveList()
    
  },[]) //solo la 1º vez

  if(loading){
    return <div className="dark:text-white"> Loading....</div>
  }

  return (
    <>
      <div className="relative overflow-x-auto">
        <span className="dark:text-white">{message}</span>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Surname
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Rol
              </th>
              <th scope="col" className="px-6 py-3">
                Curso
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(user=><tr key={user.email} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
              </th>
              <td className="px-6 py-4">
                {user.surname}
              </td>
              <td className="px-6 py-4">
                {user.email}
              </td>
              <td className="px-6 py-4">
                {user.role}
              </td>
              <td className="px-6 py-4">
                {user.course}
              </td>
            </tr>)}
            
            
          </tbody>
        </table>
      </div>

    </>
  )
}

export default ListUsers
