import { useEffect, useState } from "react";
import {
  useGetCheckRefferalQuery,
  useGetHomeProductsQuery,
} from "@/app/service/userApiSlice";
import { Button } from "@/components/ui/button";

import ReferralPopup from "@/components/users/ReferralPopup";
import { useNavigate } from "react-router-dom";
// import { Card, CardContent } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const { data: checkRefferal ,refetch:refetchRefferal } = useGetCheckRefferalQuery();

  useEffect(() => {
    console.log(checkRefferal, "checking refferal");
    if (checkRefferal && checkRefferal.seenRefferal == false) {
      setShowPopup(true);
    }
  }, [checkRefferal]);

  useEffect(() => {
 
    refetchRefferal();
  }, []);

  const { data: trending, isLoading } = useGetHomeProductsQuery();

  if (isLoading) {
    <h4>Loading...</h4>;
  }

  const handleProductDetails = (id) => {
    console.log(`Navigate to product details of ID: ${id}`);
    navigate(`/products/${id}`);
  };

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-white flex items-center justify-center">
        <div className="container mx-auto px-6 sm:px-12 lg:px-20 max-w-screen-xl">
          <div className="flex flex-col-reverse md:flex-row items-center ">
            {/* Text Section */}
            <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0 px-4">
              <h1 className="text-2xl sm:text-2xl lg:text-2xl font-bold font-primary mb-4 text-gray-800">
                Introducing Life and Loom
              </h1>
              <p className="text-sm sm:text-md lg:text-lg font-primary text-gray-600 mb-6">
                Discover the comfort and sustainability of bamboo clothing with Life and Loom.
                Our eco-friendly collections for men redefine style and responsibility, offering breathable, 
                durable, and planet-friendly apparel. Join us in embracing fashion that cares for the Earth.
              </p>
              <Button
                onClick={() => navigate("/products")}
                size="lg"
                className="bg-gray-400 hover:bg-black text-white px-6 py-3 rounded-md"
              >
                Shop Now
              </Button>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
              <div className="w-3/4 sm:w-2/3 lg:w-1/2 h-auto flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-lg">
                <img
                  src="/Home.webp"
                  alt="Bamboo Clothing"
                  className="rounded-lg shadow-lg object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home Trending */}
      <div className="flex justify-center mt-5 px-6 max-w-screen-xl mx-auto">
        <section className="py-12 w-full">
          <div className="container max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
            <h2 className="text-2xl font-semibold mb-6 font-primary">Latest</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
              {trending?.products?.map((product) => (
                <Card
                  onClick={() => handleProductDetails(product._id)}
                  key={product._id}
                  className="bg-white overflow-hidden flex flex-col group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:bg-gray-50"
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
                          <Badges
                            variant="destructive"
                            className="group-hover:animate-pulse"
                          >
                            Only {product.totalStock} left!
                          </Badges>
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
      <div className="flex justify-center mt-5 px-6 max-w-screen-xl mx-auto">
        <section className="py-12 w-full">
          <div className="container max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
            <h2 className="text-2xl font-semibold mb-6 font-primary">Trending</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
              {trending?.products?.map((product) => (
                <Card
                  onClick={() => handleProductDetails(product._id)}
                  key={product._id}
                  className="bg-white overflow-hidden flex flex-col group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:bg-gray-50"
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
                          <Badges
                            variant="destructive"
                            className="group-hover:animate-pulse"
                          >
                            Only {product.totalStock} left!
                          </Badges>
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

      {/* Referral Popup */}
      <ReferralPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default HomePage;
