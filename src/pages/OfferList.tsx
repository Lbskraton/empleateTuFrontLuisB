import { ChangeEvent,  useEffect, useState } from "react"
import Offer from "../models/Offer"
import { OfferService } from "../services/offer.service"
import { Link,   useSearchParams } from "react-router-dom"
import toast from "react-hot-toast"




function OfferList() {

    
    const [queryparams,setQueryParams]=useSearchParams()
    const searchTitle=queryparams.get('title') || ''
    

    const [offers,setOffers]=useState<Offer[]>()
    const [error,setError]=useState<string | null>(null)
    const [loading,setLoading]=useState(true)
    
    useEffect(()=> {
        //promesas porque async await y iseEffect no son compatibles
        OfferService.getAll(searchTitle)
        .then((offers)=>setOffers(offers))
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
            await OfferService.delete(id)
            //No llamo a la Api para recargar ofertas
            setOffers(offers?.filter(offer=>offer.id!=id))
            toast.success('Oferta borrada correctamente.')
       } catch (error) {
            setError(error instanceof Error ? error.message : "Error desconocido")
       }

    }

  return (
    <div>
        <h1 className="dark:text-white">Listado de ofertas</h1>
        <div>
            
                
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search By Title:</label>
                <input  id="title" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required name="title" value={searchTitle ?? ""} onChange={handleChange} />
                
                <Link to="/offers/new">Add new offer</Link>

        </div>
        
        {loading && <p className="dark:text-white">Loading....</p>}
        {error && <p className="dark:text-white">{error}</p>}
        {offers?.length===0 && <p className="dark:text-white">Offers not avaliable</p>}
        {offers?.map(offer=>
            <div key={offer.id}>
                {offer.title}
                <Link to={`/offers/edit/${offer.id}`}>Editar</Link>
                <Link to={`/offers/${offer.id}`}>Ver</Link>
                <button onClick={()=>handleDelete(offer.id)}>Borrar</button>
            </div>
        )}
      
    </div>
  )
}

export default OfferList
