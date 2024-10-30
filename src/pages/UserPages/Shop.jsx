import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useGetProductsQuery } from "@/app/service/productApiSlice";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import SideBar from "@/components/users/SideBar";

const Shop = () => {
  // Dummy product data
  const navigate = useNavigate();
  const { data: products } = useGetProductsQuery();

  useEffect(() => {
    if (products) {
      console.log(products);
    }
  }, [products]);

  console.log(products, "products fetched from api ");

  // Dummy filter handlers
  // const handleCheckBrand = (brand, isChecked) => {
  //   console.log(`Brand: ${brand}, Checked: ${isChecked}`);
  // };

  // const handleCheckPrice = (start, end, isChecked) => {
  //   console.log(`Price Range: ₹${start} to ₹${end}, Checked: ${isChecked}`);
  // };

  const handleProductDetails = (id) => {
    console.log(`Navigate to product details of ID: ${id}`);
    navigate(`/products/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-10"></div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 md:sticky top-4 p-6 shadow-lg rounded-lg md:h-screen overflow-y-auto">
          <span className="font-primary font-semibold mt-10" >Filters</span>
          <SideBar />
        </div>

        <div className="w-full md:w-3/4 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold font-primary">Products</h2>
            <div>
              <Select
                onValueChange={(value) => console.log(`Sort by: ${value}`)}
              >
                <SelectTrigger className="border border-gray-300 p-2 rounded-md">
                  <span>Sort by: Recommended</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Recommended">
                    Sort by: Recommended
                  </SelectItem>
                  <SelectItem value="LowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="HighToLow">Price: High to Low</SelectItem>
                  <SelectItem value="NewArrivals">New Arrivals</SelectItem>
                  <SelectItem value="AZ">A-Z</SelectItem>
                  <SelectItem value="ZA">Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
            {products?.products?.map((product) => (
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
                        className="group-hover:animate-pulse"
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
      </div>
    </div>
  );
};

export default Shop;
