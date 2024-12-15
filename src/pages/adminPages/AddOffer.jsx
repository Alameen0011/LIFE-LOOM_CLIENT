import  { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { offerSchema } from "@/validationSchemas/addOffer";
import debounce from "lodash/debounce";
import { useFetchCategoriesQuery } from "@/app/service/adminApiSlice";
import { useCreateOfferMutation, useLazyGetProductSearchQuery } from "@/app/service/offerApiSlice";
import { toast } from "react-toastify";

const AddOffer = () => {
  const [date, setDate] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const location = useLocation();
  const activeTab = location.state?.activeTab || "category";
  console.log(activeTab, "active tab");

  const { data } = useFetchCategoriesQuery({ page: 1, limit: 4 });

  const [createOffer] = useCreateOfferMutation()

  const [triggerSearch, { isFetching, isError }] =
    useLazyGetProductSearchQuery();

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(offerSchema), mode: "onChange",  });

  const navigate = useNavigate()

  const handleProductSelect = (product) => {
    setValue("targetId", product._id);
    setValue("targetName", product.productName);
    setIsDropdownVisible(false);
  };

  const handleCategorySelect = (categoryId) => {
    console.log("inside handle category selection part -----", categoryId);
    const category = categories.find((cat) => cat._id === categoryId);



    if (category) {
      console.log(category, "------------category");
      setValue("targetId", categoryId);
      setValue("targetName", category.categoryName);
    } else {
      console.error("Category not found for ID:", categoryId);
    }
  };

  const handleDateSelect = (selectedDate) => {
    if(selectedDate)
    setDate(selectedDate.toISOString());
    setValue("endDate", selectedDate.toISOString(), { shouldValidate: true });
  };

  useEffect(() => {
    // Set the initial value for offerType when the component mounts
    setValue("offerType", activeTab);
  }, [activeTab, setValue]);

  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      console.log(searchTerm, "---------searchTerm");
      if (searchTerm.length > 2) {
        try {
          const res = await triggerSearch(searchTerm).unwrap();
          console.log(res, "-----------response from search");
          setProducts(res.products);
          setIsDropdownVisible(true);
        } catch (error) {
          console.error("Error fetching products:", error);
          toast.error("Failed to search products");
        }
      } else {
        setProducts([]);
        setIsDropdownVisible(false);
      }
    }, 300),
    [triggerSearch]
  );

  const handleOffers = async(data) => {
  
    console.log("Form Submitted:", data);

    try {

      const res = await createOffer(data).unwrap()
      console.log(res,"==========response for creation of offer")
      if(res.success){
        toast.success("offer added successfully")
        navigate("/admin/offers")
        
      }


   
    } catch (error) {
      console.log(error,"error while adding offer")
      toast.error(error.data.message)
    }
  };

  const formValues = watch(); 
  const offerNameValue = watch("name");

  console.log("Form Values:", formValues); // Logs all form values
  console.log("Offer Name Value:", offerNameValue); // Logs the value of the 'name' field

  return (
    <div className="container mx-auto min-h-screen max-w-md bg-gradient-to-br p-4 md:p-8 font-primary">
      <div className="mx-auto md:max-w-2xl">
        <h1 className="mb-8 text-2xl font-bold text-gray-800 text-center">
          Add New Offer
        </h1>
        <div className="rounded-lg bg-white p-4 md:p-6 shadow-lg">
          <form onSubmit={handleSubmit(handleOffers)} className="space-y-6">
            {/* Offer Name */}
            <div className="space-y-2">
              <Label htmlFor="offerName">Offer Name *</Label>
              <Input
                id="offerName"
                placeholder="Enter offer name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Offer Value */}
            <div className="space-y-2">
              <Label htmlFor="offerValue">Offer Value (%) *</Label>
              <Input
                id="offerValue"
                type="number"
                placeholder="Enter percentage discount"
                min="0"
                max="100"
                {...register("offerPercentage")}
              />
              {errors.offerPercentage && (
                <p className="text-red-600">{errors.offerPercentage.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="endDate"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? new Date(date).toDateString() : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date ? new Date(date) : null}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.endDate && (
                <p className="text-red-600 text-sm">{errors.endDate.message}</p>
              )}
            </div>

            {activeTab === "category" ? (
              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Category
                </label>
                <select
                  id="category"
                  {...register("targetId")}
                  onChange={(e) => handleCategorySelect(e.target.value)}
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
                {errors.targetId && (
                  <p className="text-red-600 text-sm">
                    {errors.targetId.message}
                  </p>
                )}
              </div>
            ) : (
              <div className="relative space-y-2">
                <label
                  htmlFor="productSearch"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Product
                </label>
                <input
                  id="productSearch"
                  name="targetName"
                  type="text"
                  placeholder="Search for a product"
                  {...register("targetName")}
                  onChange={(e) => debouncedSearch(e.target.value)} // Call debounced function
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.targetName && (
                  <p className="text-red-600 text-sm">
                    {errors.targetName.message}
                  </p>
                )}
                {isDropdownVisible && (
                  <ul className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto">
                    {products?.length === 0 ? (
                      <li className="text-gray-900 cursor-default select-none relative py-2 px-4">
                        No products found.
                      </li>
                    ) : (
                      products?.map((product) => (
                        <li
                          key={product._id}
                          className="text-gray-900 cursor-pointer select-none relative py-2 px-4 hover:bg-gray-100"
                          onClick={() => handleProductSelect(product)}
                        >
                          {product.productName}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            )}

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Save Offer
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOffer;
