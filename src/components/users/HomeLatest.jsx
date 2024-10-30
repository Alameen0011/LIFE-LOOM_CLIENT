import { useGetProductsQuery } from "@/app/service/productApiSlice";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";


const HomeLatest = () => {

    const {data:trending, isLoading}   = useGetProductsQuery()
    const navigate = useNavigate()
 
    if(isLoading){
     <h4>Loading...</h4>
    }
 
    
   const handleProductDetails = (id) => {
     console.log(`Navigate to product details of ID: ${id}`);
     navigate(`/products/${id}`);
   };
 




  return (
    <div>
    <section className='py-12'>
   <div className='container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
     <h2 className='text-2xl font-semibold mb-6 font-primary'>Latest </h2>
     <div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
       {trending?.products?.map((product) => (
         <Card
           onClick={() => handleProductDetails(product._id)}
           key={product._id}
           className="bg-white  overflow-hidden flex flex-col group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:bg-gray-50"
         >
           <div className="relative pb-[300px] overflow-hidden">
             <img
               src={product.images[0]}
               alt={product.productName}
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
             />
           </div>

           <CardContent className="p-4 flex-grow">
             <p className="text-sm font-semibold group-hover:text-primary transition-colors duration-300 truncate">
               {product.productName}
             </p>

             <p className="text-sm text-gray-500 truncate">
               {product.category.categoryName}
             </p>
             {product.totalStock === 0 ? (
               <div className="flex pt-2 justify-end">
                 <Badge
                   variant="destructive"
                   className="group-hover:animate-pulse text-red-50"
                 >
                   Out of stock!
                 </Badge>
               </div>
             ) : (
               product.totalStock <= 5 && (
                 <div className="flex pt-2 justify-end">
                   <Badge
                     variant="destructive"
                     className="group-hover:animate-pulse"
                   >
                     Only {product.totalStock} left!
                   </Badge>
                 </div>
               )
             )}

             <p className="text-sm font-bold mt-2 group-hover:text-primary transition-colors duration-300">
               ₹{product.price}
             </p>
             <div className="flex items-center mt-2">
               {[...Array(5)].map((_, i) => (
                 <Star
                   key={i}
                   className="w-3 h-3 fill-current text-yellow-400"
                 />
               ))}
               <span className="ml-2 text-sm text-gray-600">
                 4.5 (10 reviews)
               </span>
             </div>
           </CardContent>
         </Card>
       ))}
     </div>
   </div>
 </section>




</div>
  )
}

export default HomeLatest