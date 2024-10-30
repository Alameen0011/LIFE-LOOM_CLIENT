import React from "react";
import { Link } from "react-router-dom";

const RelatedProducts = ({ relatedProducts }) => {
  console.log(relatedProducts, "relatedProducts");

  return (
    <section className="py-10 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-xl font-bold text-center mb-8 text-foreground font-primary">
          YOU MAY ALSO LIKE
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {relatedProducts?.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm text-center font-medium text-foreground truncate">
                    {product.productName}
                  </h3>
                  <p className="text-center text-gray-600 mt-1">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
