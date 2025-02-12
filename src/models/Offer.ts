export default interface Offer{
    id: number,
    title:string,
    description?:string,
    active:boolean,
    contactEmail?:string,
    location?:string,
    expired:string,
    published: string,
    idCategory?:number | null
}