import Offer from "./Offer";

export default interface Category{
    id: number,
    name:string,
    offers?:Offer[],
    createdAt:Date,
    updatedAt:Date

}
    