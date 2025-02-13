
import { FormEvent } from "react"
import useFormHook from "../components/FormHook"
import Category from "../models/Category"

interface CategoryFormProps{
    onSubmit: (e:FormEvent,name:string)=>void
    
}



function CategoryManagerForm({onSubmit}:CategoryFormProps) {

    const { datosForm, handleChange} = useFormHook<Partial<Category>>({ 
        name:""
      })
  return (
    <div>

        <form onSubmit={(e)=>onSubmit(e,datosForm.name || '')}>
            <label htmlFor="name">Nombre:</label>
            <input id="name" name="name" value={datosForm.name} onChange={handleChange}></input>

        </form>

      
    </div>
  )
}

export default CategoryManagerForm
