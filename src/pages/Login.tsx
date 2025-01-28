import { FormEvent, useState } from "react"
import useFormHook from "../components/FormHook"
import { loginUser } from "../services/authService"

function Login() {
    const{datosForm,handlechange,...o}=useFormHook({email:"algo",password:""})
    const [message,setMessage]=useState("")

    console.log(o.error)

    const handleSubmit=async (e:FormEvent)=>{
        e.preventDefault()
        try {
          await loginUser(datosForm.email,datosForm.password)
          setMessage("login succesful")
          //redirigir a otra pagina
        } catch (error) {
          const msg= error instanceof Error ? error.message : "Error desconocido"
          setMessage(msg)
          
        }
    }

  return (
    <>


<form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" value={datosForm.email}  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@flowbite.com" required name="email" onChange={handlechange}  />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" value={datosForm.password} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  name="password" onChange={handlechange}/>
  </div>
  <div className="flex items-start mb-5">
    <div className="flex items-center h-5">
      <input id="remember" type="checkbox"  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required onChange={handlechange} />
    </div>
    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  <div>{message}</div>
</form>

    </>
  )
}

export default Login
