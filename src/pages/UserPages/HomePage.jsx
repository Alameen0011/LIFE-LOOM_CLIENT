import { useEffect, useState } from "react";
import {
  useGetCheckRefferalQuery,
  useGetHomeProductsQuery,
} from "@/app/service/userApiSlice";
import { Button } from "@/components/ui/button";

import ReferralPopup from "@/components/users/ReferralPopup";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { selectUserState } from "@/app/slices/authSlice";

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectUserState);


  const { data: trending, isLoading } = useGetHomeProductsQuery();
  const { data: checkRefferal, refetch: refetchRefferal } = useGetCheckRefferalQuery(
    {}, 
    { skip: !isAuthenticated }
  );


  useEffect(() => {
    if (isAuthenticated) {
      refetchRefferal()
        .then(({ data }) => {
          if (data?.seenRefferal === false) {
            setShowPopup(true); 
          } else {
            setShowPopup(false); 
          }
        })
        .catch((error) => {
          console.error("Failed to fetch referral data:", error);
          setShowPopup(false);
        });
    } else {
      setShowPopup(false); 
    }
  }, [isAuthenticated, refetchRefferal]);


  const handleProductDetails = (id) => {
    console.log(`Navigate to product details of ID: ${id}`);
    navigate(`/products/${id}`);
  };


  


  if (isLoading) {
    <h4>Loading...</h4>;
  }



  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      {/* Hero Section */}
      <section className="relative h-auto bg-white flex items-center justify-center py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-screen-xl">
          <div className="flex flex-col-reverse md:flex-row items-center">
            {/* Text Section */}
            <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0 px-4">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-primary mb-4 text-gray-800">
                Introducing Life and Loom
              </h1>
              <p className="text-sm sm:text-base lg:text-lg font-primary text-gray-600 mb-6">
                Discover the comfort and sustainability of bamboo clothing with
                Life and Loom. Our eco-friendly collections redefine style and
                responsibility, offering breathable, durable, and
                planet-friendly apparel. Join us in embracing fashion that cares
                for the Earth.
              </p>
              <Button
                onClick={() => navigate("/products")}
                size="lg"
                className="bg-black hover:bg-black text-white px-6 py-3 rounded-md"
              >
                Shop Now
              </Button>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
              <div className="w-full sm:w-2/3 md:w-3/4 lg:w-2/3 xl:w-1/2 h-auto p-4 bg-gray-100 rounded-lg shadow-lg">
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
            <h2 className="text-2xl font-semibold mb-6 font-primary">
              Trending
            </h2>
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
