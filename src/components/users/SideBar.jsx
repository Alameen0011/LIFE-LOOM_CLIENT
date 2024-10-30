import React from "react";
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

const categories = ["shirt", "Tshirt", "polo", "swat"];
const sizes = ["S", "M", "L", "XL"];

const SideBar = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    // setSelectedSort('');
    // Reset other filter states if necessary
  };

  return (
    <div className="w-55 p-4 bg-white border-r shadow-lg rounded-lg">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <a href="#" className="text-sm hover:underline">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox id={`size-${size}`} />
                  <Label htmlFor={`size-${size}`}>{size}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <Slider
              min={0}
              max={1000}
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

        <AccordionItem value="availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" />
                <Label htmlFor="in-stock">In Stock</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="out-of-stock" />
                <Label htmlFor="out-of-stock">Out of Stock</Label>
              </div>
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
