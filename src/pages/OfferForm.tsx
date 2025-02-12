import { FormEvent, useEffect, useState } from "react"
import useFormHook from "../components/FormHook"
import Offer from "../models/Offer"
import { OfferService } from "../services/offer.service"
import { useNavigate, useParams } from "react-router-dom"
import { Temporal } from "temporal-polyfill"
import toast from "react-hot-toast"
import Category from "../models/Category"
import CategoryService from "../services/cat.service"


function OfferForm() {

  const now=Temporal.Now.plainDateTimeISO().toString().slice(0,16)
  const ThreeMonthsLater=Temporal.Now.plainDateTimeISO().add({months: 3}).toString().slice(0,16)

  //partial Offer para ahorrarse el id
  //const ThreeMonthsLater=new Date().setMonth(new Date().getMonth()+3)
  const { datosForm, handleChange,handleChangeCheckbox,setDatosForm } = useFormHook<Partial<Offer>>({ 
      title: "", 
      description: "",
      active: true,
      contactEmail:'',
      published:now,
      expired:ThreeMonthsLater,
      location:'',
      idCategory:undefined 
    })

    const [error,setError]=useState<string|null>(null)
    const [categories,setCategories]=useState<Category[]>()
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()

    const {id}=useParams()
    
    useEffect(()=>{
      if(id){OfferService.getById(Number(id))
        .then((data)=>setDatosForm({
            ...data,
           published:new Date(data.published || '').toISOString().slice(0,16),
            expired:new Date(data.expired || '').toISOString().slice(0,16),
        }))
        .catch((error:Error)=>setError(error.message))
        .finally(()=>setLoading(false))
      }else{setLoading(false)}
    },[id, setDatosForm])

    useEffect(()=>{
      CategoryService.getAll().then(setCategories).catch(error=>setError(error.message))
    },[])

    const handleSubmit = (e: FormEvent) => {
        try {

          e.preventDefault()
          const formData={
            ...datosForm,
            published:new Date(datosForm.published || '').toISOString(),
            expired:new Date(datosForm.expired || '').toISOString(),
          }
        if(id) OfferService.update(Number(id),formData)
        else OfferService.create(formData)
        navigate("/offers")
        toast.success('Oferta guardada correctamente')
        } catch (error) {
          setError(error instanceof Error ? error.message : "Error desconocido")
          toast.error('Error al guardar la oferta')
        }finally{
          setLoading(false)
        }
      }


      if(loading) return <p>Loading...</p>//da fallos
      

  return (
    <>
      <div>
        <h1>Insercion de una nueva forma</h1>
        <form onSubmit={handleSubmit} >
          {error && <p>{error}</p>}
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your title</label>
          <input  id="title" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="name@flowbite.com" required name="title" value={datosForm.title} onChange={handleChange} />
        </div>
        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your description</label>
          <input  id="description" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required name="description" value={datosForm.description} onChange={handleChange} />
        </div>
        <div className="mb-5">
          <label htmlFor="published" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Published</label>
          <input type="datetime-local" id="pusblished" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"  name="pusblished" value={datosForm.published} onChange={handleChange} />
        </div>
        <div className="mb-5">
          <label htmlFor="expired" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiration</label>
          <input type="datetime-local" id="expired" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"  name="expired" value={datosForm.expired} onChange={handleChange} />
        </div>
        <div className="mb-5">
          <label htmlFor="active" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiration</label>
          <input type="checkbox" id="active" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"  name="active" checked={datosForm.active} onChange={handleChangeCheckbox} />
        </div>

        <div>id Categoria</div>
        <select name="idCategory" value={datosForm.idCategory} onChange={handleChange}>
          <option>Selecciona Categoria</option>
          {categories?.map(category=>
            <option key={category.id} value={category.id}>{category.name}</option>
          )}
        </select>

        <button>Guardar</button>
        

        </form>

      </div>

    </>
  )
}

export default OfferForm
