import { FormEvent, useEffect, useState } from "react"
import CategoryService from "../services/cat.service"
import CategoryManagerList from "./CategoryManagerList"
import Category from "../models/Category"
import CategoryManagerForm from "./CategoryManagerForm"


function CategoryManager() {
    const [categories,setCategories]=useState<Category[]>([])

    useEffect(()=>{
        CategoryService.getAll().then(setCategories).catch().finally()
    },[])

    const handleCreate=async (e:FormEvent,name:string)=>{
        e.preventDefault()
        console.log(name)
        /*
        const newcat=await CategoryService.create({name})
        const newCategories=categories.push(newcat)
        
        setCategories(categories.push(newCategories))*/
    }

    const handleDelete=(id:number)=>{
        CategoryService.delete(id).catch().finally()
    }

  return (
    <div className="text-white">
            <h2 className="text-4xl font-extrabold dark:text-white">Category Manager</h2>
            <CategoryManagerForm onSubmit={handleCreate} ></CategoryManagerForm>
            <CategoryManagerList categories={categories} onDelete={handleDelete}></CategoryManagerList>
            
      
    </div>
  )
}

export default CategoryManager
