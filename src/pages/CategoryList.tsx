import { ChangeEvent, useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Category from "../models/Category"
import CategoryService from "../services/cat.service"
import toast from "react-hot-toast"


function CategoryList() {
    const [queryparams,setQueryParams]=useSearchParams()
    const searchTitle=queryparams.get('title') || ''
    

    const [categorys,setCategorys]=useState<Category[]>()
    const [error,setError]=useState<string | null>(null)
    const [loading,setLoading]=useState(true)
    
    useEffect(()=> {
        //promesas porque async await y iseEffect no son compatibles
        CategoryService.getAll(searchTitle)
        .then((categorys)=>setCategorys(categorys))
        .catch((error)=>setError(error.message))
        .finally(()=>setLoading(false))
        

    },[searchTitle])

    const handleChange=(e:ChangeEvent<HTMLInputElement>) =>{
        const newTitle=e.target.value
        setQueryParams(newTitle ? {title:newTitle} : {})
    }


    

    async function handleDelete(id:number) {
       if(!window.confirm('¿Estas seguro de que quieres borrar esta oferta?')) return
       try {
            await CategoryService.delete(id)
            //No llamo a la Api para recargar ofertas
            setCategorys(categorys?.filter(category=>category.id!=id))
            toast.success('Oferta borrada correctamente.')
       } catch (error) {
            setError(error instanceof Error ? error.message : "Error desconocido")
       }

    }

  return (
    <div>
        <h1>Listado de categorias</h1>
        <div>
            
                
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search By Title:</label>
                <input  id="title" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required name="title" value={searchTitle ?? ""} onChange={handleChange} />
                
                <Link to="/categorys/new">Add new category</Link>

        </div>
        
        {loading && <p>Loading....</p>}
        {error && <p>{error}</p>}
        {categorys?.length===0 && <p>Categorys not avaliable</p>}
        {categorys?.map(category=>
            <div key={category.id}>
                {category.name}
                <Link to={`/categorys/edit/${category.id}`}>Editar</Link>
                <Link to={`/categorys/${category.name}`}>Ver</Link>
                <button onClick={()=>handleDelete(category.id)}>Borrar</button>
            </div>
        )}
      
    </div>
  )
}

export default CategoryList
