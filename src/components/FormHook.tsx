import { ChangeEvent, useState } from 'react'

interface Props{
    [key:string]:string
    
}

function useFormHook<T extends Props>(initialform:T) {

   //Estados
   const [datosForm,setDatosForm]=useState(initialform)
   const [error,setError]=useState('')
   const [loading,setLoading]=useState(false)

   //Control formulario

   const handlechange=(e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>{
       
       const {value,name}=e.target
       setDatosForm((prevForm) => ({
        ...prevForm,
        [name]: value
      }));
       
     }

     const reset=()=>{setDatosForm(initialform)}

     return { datosForm,handlechange,error,setError,loading,setLoading,reset}
}

export default useFormHook
