import { useEffect, useState } from "react"
import Offer from "../models/Offer"
import { OfferService } from "../services/offer.service"
import { Link } from "react-router-dom"




function OfferList() {


    

    const [offers,setOffers]=useState<Offer[]>()
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(true)
    useEffect(()=> {
        //promesas porque async await y iseEffect no son compatibles
        OfferService.getAll()
        .then((offers)=>setOffers(offers))
        .catch((error)=>setError(error.message))
        .finally(()=>setLoading(false))
        

    },[])


  return (
    <div>
        <h1>Listado de ofertas</h1>
        <Link to="/offers/new">Add new offer</Link>
        {loading && <p>Loading....</p>}
        {error && <p>{error}</p>}
        {offers?.length===0 && <p>Offers not avaliable</p>}
        {offers?.map(offer=>
            <div key={offer.id}>
                {offer.title}
                <Link to={`/offers/edit/${offer.id}`}>Editar</Link>
                <Link to={`/offers/${offer.id}`}>Ver</Link>
            </div>
        )}
      
    </div>
  )
}

export default OfferList
