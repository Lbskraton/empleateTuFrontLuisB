import { useEffect, useState } from "react"
import { OfferService } from "../services/offer.service"
import { useParams } from "react-router-dom"
import Offer from "../models/Offer"


function OfferDetail() {
  const {id}=useParams()
  const [offer,setOffer]=useState<Offer>()
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string|null>(null)

useEffect(()=>{
  setLoading(true)
  
 
  OfferService.getById(Number(id))
  .then(setOffer)
  .catch(error=>setError(error.message))
  .finally(()=>setLoading(false))
})

  if(loading) return <div>Loading....</div>
  if(error) return <div>Error: {error}</div>
  if(!offer) return <div>Ofertas no encontradas</div>

  return (
    <div className="text-white">
      <div>Titulo: {offer.title}</div>
      <div>Description: {offer.description}</div>
      <div>Titulo: {offer.active ? 'Si' : 'NO'}</div>
      <div>Email de contacto: {offer.contactEmail}</div>
      <div>Fecha Publicacion: {new Date(offer.published).toLocaleString()}</div>
      <div>Fecha de Finalización: {new Date(offer.expired).toLocaleString()}</div>
      <iframe width="100%" height="100%" loading="lazy" src={`https://www.google.com/maps?q=${offer.location}$output=embed`}></iframe>
      
    </div>
  )
}

export default OfferDetail
