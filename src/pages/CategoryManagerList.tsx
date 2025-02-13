import Category from "../models/Category"

interface CategoryListProps{
    categories:Category[]
    onDelete: (id:number)=>void
}

function CategoryManagerList({categories,onDelete}:CategoryListProps) {
  return (
    <div>
        {categories.map(categorie=>
            <div key={categorie.id}>{categorie.name}
            <button onClick={()=>onDelete(categorie.id)}></button></div>
        )}
      
    </div>
  )
}

export default CategoryManagerList
