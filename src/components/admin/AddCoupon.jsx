import  { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import couponSchema from "@/validationSchemas/addCoupon";
import { useCreateCouponMutation } from "@/app/service/adminApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCoupon = () => {
  const [date, setDate] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(couponSchema),
    mode: "onChange", 
  });

  const [createCoupon] = useCreateCouponMutation()

  const navigate = useNavigate()

  const handleDateSelect = (selectedDate) => {
    console.log(selectedDate,"selected date")
    if (selectedDate) {
        console.log(selectedDate.toISOString(),"-------- iso string before settting before to state, and form state")
        setDate(selectedDate.toISOString());
        setValue("expiryDate", selectedDate.toISOString(), { shouldValidate: true });

    }
       
  };

  const onSubmit = async(data) => {
    console.log(data, "-----data need for coupon");

    try {

      const res = await createCoupon(data).unwrap()
      console.log(res,"response after creating coupon")
      if(res.success){
        toast.success("coupon addedd successfully")
        navigate("/admin/coupons")
      }

      
    } catch (error) {
      console.log(error,"error while creating coupon")
      toast.error("error while creating coupon")
      
    }
    
    
  };

  const formValues = watch(); // Get all field values

  console.log("Form Values:", formValues); // Logs all form values

  return (
<div className="container mx-auto px-4 py-4 font-primary">
  <div className="max-w-3xl mx-auto rounded-lg overflow-hidden">
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Add New Coupon
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {/* Coupon Code */}
          <div>
            <Label
              htmlFor="couponCode"
              className="block text-sm font-medium text-gray-700"
            >
              Coupon Code
            </Label>
            <Input
              id="couponCode"
              type="text"
              {...register("code")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter unique coupon code"
            />
            {errors.code && (
              <p className="mt-2 text-sm text-red-600">{errors.code.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <Input
              id="description"
              type="text"
              {...register("description")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Discount Value */}
          <div>
            <Label
              htmlFor="discountValue"
              className="block text-sm font-medium text-gray-700"
            >
              Discount Value
            </Label>
            <Input
              id="discountValue"
              type="text"
              {...register("discountValue")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter discount percentage"
            />
            {errors.discountValue && (
              <p className="mt-2 text-sm text-red-600">
                {errors.discountValue.message}
              </p>
            )}
          </div>

          {/* Minimum Purchase Amount */}
          <div>
            <Label
              htmlFor="minPurchaseAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Minimum Purchase Amount
            </Label>
            <Input
              id="minPurchaseAmount"
              type="number"
              {...register("minPurchaseAmount")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter minimum purchase amount"
            />
            {errors.minPurchaseAmount && (
              <p className="mt-2 text-sm text-red-600">
                {errors.minPurchaseAmount.message}
              </p>
            )}
          </div>

          {/* Maximum Discount Amount */}
          <div>
            <Label
              htmlFor="maxDiscountAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Maximum Discount Amount
            </Label>
            <Input
              id="maxDiscountAmount"
              type="number"
              {...register("maxDiscountAmount")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter maximum discount amount"
            />
            {errors.maxDiscountAmount && (
              <p className="mt-2 text-sm text-red-600">
                {errors.maxDiscountAmount.message}
              </p>
            )}
          </div>

          {/* Expiry Date */}
          <div className="col-span-2">
            <Label htmlFor="expiryDate">End Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="expiryDate"
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
            {errors.expiryDate && (
              <p className="text-red-600 text-sm">{errors.expiryDate.message}</p>
            )}
          </div>

          {/* Usage Limit */}
          <div className="col-span-2">
            <Label
              htmlFor="usageLimit"
              className="block text-sm font-medium text-gray-700"
            >
              Usage Limit
            </Label>
            <Input
              id="usageLimit"
              type="number"
              {...register("usageLimit")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter usage limit per user"
            />
            {errors.usageLimit && (
              <p className="mt-2 text-sm text-red-600">
                {errors.usageLimit.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Coupon
          </Button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
};

export default AddCoupon;
