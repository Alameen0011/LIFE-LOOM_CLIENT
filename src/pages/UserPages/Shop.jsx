import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useGetProductsQuery } from "@/app/service/productApiSlice";
import { Search, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import SideBar from "@/components/users/SideBar";
import Pagination from "@/components/users/Pagination";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("NewArrivals");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const itemsPerPage = 8;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (newFilters) => {
    console.log(newFilters, "new filteres");
    setFilters(newFilters);
  };

  const navigate = useNavigate();

  const queryParams = useMemo(() => {
    const params = new URLSearchParams({
      page: currentPage,
      limit: itemsPerPage,
      sortBy,
      searchTerm,
      ...filters,
    });
    return params.toString();
  }, [currentPage, itemsPerPage, sortBy, searchTerm, filters]);

  console.log(queryParams, "query params");

  const { data: products } = useGetProductsQuery(queryParams);

  useEffect(() => {
    setCurrentPage(products?.page);
    setTotalPages(products?.totalPages);
  }, [products]);

  // console.log(products, "products fetched from api ");
  // console.log(searchTerm, "search Term");
  // console.log(sortBy,"sortBy")

  const handleProductDetails = (id) => {
    console.log(`Navigate to product details of ID: ${id}`);
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    if (products) {
      console.log(products,"==products")
      const updatedProducts = products.filteredProducts.map((product) => {
        if (product.offer) {
          const discount = product.offer.offerPercentage / 100;
          const discountedPrice =Math.round( product.price - product.price * discount)
          return {
            ...product,
            discountedPrice,
          };
        }
        return product;
      });
      console.log(updatedProducts,"=====updatedPRoducts")
      setFilteredProducts(updatedProducts); // Update the state with discounted prices
    }
  }, [products]);


  console.log(filteredProducts,"======filitered products")

  return (
    <div className="container mx-auto p-6">
      <div className="mb-10"></div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 md:sticky top-4 p-6 shadow-lg rounded-lg md:h-screen overflow-y-auto">
          <span className="font-primary font-semibold mb-10">Filters</span>
          <SideBar onFilterChange={handleFilterChange} />
        </div>

        <div className="w-full md:w-3/4 p-6">
          <div className="flex items-center mb-6 space-x-4">
            {/* Title with spacing */}
            <h2 className="text-2xl font-semibold font-primary mr-4">
              Products
            </h2>

            {/* Centered Search Bar */}
            <div className="flex-grow flex justify-center">
              <div className="flex items-center border  border-black rounded-md overflow-hidden w-full max-w-72">
                <span className="p-2">
                  <Search className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="flex-grow p-2 outline-none text-sm placeholder-gray-500 border-r"
                />
              </div>
            </div>

            {/* Sort Dropdown with spacing */}
            <div className="ml-4">
              <Select onValueChange={(value) => setSortBy(value)}>
                <SelectTrigger className="border border-gray-300 p-2 rounded-md w-52">
                  <span>Sort by: {sortBy || "Select"}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="HighToLow">Price: High to Low</SelectItem>
                  <SelectItem value="NewArrivals">New Arrivals</SelectItem>
                  <SelectItem value="Aa-Zz">Aa-Zz</SelectItem>
                  <SelectItem value="Zz-Aa">Zz-Aa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="px-2  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9 font-primary">
            {filteredProducts?.map((product) => (
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
                    {product.discountedPrice ? (
                      <>
                        <span className="line-through text-gray-500 mr-2">
                          ₹{product.price}
                        </span>{" "}
                        <span className=""  >₹{product.discountedPrice}</span>
                      </>
                    ) : (
                      `₹${product.price}`
                    )}
                  </p>

                  <p className="text-sm font-bold mt-2 group-hover:text-primary transition-colors duration-300">
                    Brand : {product.brand}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages || 0}
        paginate={paginate}
      />
    </div>
  );
};

export default Shop;
