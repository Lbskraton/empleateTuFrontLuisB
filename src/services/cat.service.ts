import Category from "../models/Category"
import fetchAPI from "../utils/FetchAPI"
const API_URL_BASE=import.meta.env.VITE_API_URL_BASE

export class CategoryService{

        static async delete(id: number) {
            return await  fetchAPI(API_URL_BASE+'/categories/'+id,{method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                    //token si hubiera
                },
                credentials: "include" //para poder inyectar la cookie si se puede
                
    
            })
    
    
    
        }
        static async getById(id: number) {
            return await fetchAPI(API_URL_BASE+'/categories/'+id)
        }
    
        static async getAll(title?:string){
            let url=API_URL_BASE+'/categories?'
            if(title) url+= 'title='+title
            console.log(await fetchAPI(url))
            return await fetchAPI(url)
        }
    
    
        static async create(offer:Partial<Category>){
    
            return await fetchAPI(API_URL_BASE+'/categories',{method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                    //token si hubiera
                },
                body: JSON.stringify(offer),
                credentials: "include" //para poder inyectar la cookie si se puede
                
    
            })
        }
    
        static async update(id:number,offer:Partial<Category>){
            return await fetchAPI(API_URL_BASE+'/categories/'+id,{method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                    //token si hubiera
                },
                body: JSON.stringify(offer),
                credentials: "include" //para poder inyectar la cookie si se puede
                
    
            })
        }




}

export default CategoryService