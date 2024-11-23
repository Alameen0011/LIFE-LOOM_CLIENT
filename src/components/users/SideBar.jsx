import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { useGetActiveCategoryQuery } from "@/app/service/userApiSlice";

const sizes = ["S", "M", "L", "XL"];

const SideBar = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);

  const { data: categories } = useGetActiveCategoryQuery();


  useEffect(() => {
    if(categories){
      console.log(categories,"categories ===== in use effect")
    }
  })

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleBrandChange = (brandId) => {
    console.log(`brand -${brandId}`);

    setSelectedBrand((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handlePriceRangeChange = (value) => {
    console.log(value, "value changing");
    setPriceRange(value);
  };

  const clearFilters = () => {
    setPriceRange([0, 3000]);
    setSelectedCategories([]);
    setSelectedBrand([]);
  };

  useEffect(() => {
    console.log(selectedCategories, "selected Categeries");
    console.log(selectedBrand, "selected Brand");
    console.log(priceRange, "price Range");
    onFilterChange({
      categories: selectedCategories.join(","),
      brands: selectedBrand.join(","),
      priceRange: priceRange.join(","),
    });
  }, [selectedBrand, selectedCategories, priceRange]);

  return (
    <div className="w-55 p-6 bg-white border-r mt-5 shadow-lg rounded-lg space-y-6 font-primary ">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="no-underline font-semibold" >Categories</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              {categories?.categories?.map((category) => (
                <li key={category._id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedCategories.includes(category._id)}
                    onCheckedChange={() => handleCategoryChange(category._id)}
                    id={`category-${category._id}`}
                  />
                  <Label
                    htmlFor={`category-${category._id}`}
                    className="text-sm cursor-pointer "
                  >
                    {category.categoryName}
                  </Label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="Brand">
          <AccordionTrigger className="no-underline font-semibold"  >Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Forum", "UrbanLeaf", "EarthAura"].map((brand, ind) => (
                <div key={ind} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrand.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                  />
                  <Label htmlFor={brand} className="text-sm cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="no-underline font-semibold"  >Price Range</AccordionTrigger>
          <AccordionContent>
            <Slider
              min={0}
              max={3000}
              step={10}
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              className="mb-2"
            />
            <div className="flex justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button variant="outline" className="w-full mt-4" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default SideBar;
