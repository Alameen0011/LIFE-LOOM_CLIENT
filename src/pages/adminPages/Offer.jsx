import {
  useDeleteOfferMutation,
  useFetchOffersQuery,
} from "@/app/service/offerApiSlice";
import OfferTable from "@/components/admin/OfferTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Offer = () => {
  const { data, isSuccess } = useFetchOffersQuery();
  const [removeOffer] = useDeleteOfferMutation();
  const [offers, setOffers] = useState([]);
  const [filter, setFilter] = useState("active");
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("category");
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      if(selectedTab ==="category"){
        setOffers(data.categoryOffers);

      }else if(selectedTab === "product"){
        setOffers(data.productOffers)
      }
         
    }
  }, [data,selectedTab]);


  console.log(offers, "offerssss");

  const filteredOffers = offers.filter((offer) => {
    console.log(offer, "====each offer");
    const status = offer.status;
    console.log(status, "-----OFfer status");
    return (
      status == filter &&
      offer.offerType === selectedTab &&
      offer.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  console.log(filteredOffers, "filtered offers ======");

  const handleDelete = async (id) => {
    console.log("inside delete part ")
    try {
      const res = await removeOffer({ offerId: id }).unwrap();
      console.log(res, "response after deletion ");
      if (res.success) {
        toast.success("offer deleted successfully");
      }
    } catch (error) {
      console.log(error, "error while deletion of offer");
      toast.error(error.data.message);
    }
  };

  const handleAddOffer = () => {
    navigate("/admin/addOffer", { state: { activeTab: selectedTab } });
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 space-y-6 font-primary">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Offer Management</h1>
        <Button onClick={handleAddOffer} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-2" /> Add Offer
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="flex-1 flex items-center space-x-2">
          <Input
            placeholder="Search offers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-60"
          />
        </div>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
        className="w-full"
      >
        <TabsList className="w-full">
          <TabsTrigger value="category" className="flex-1 font-bold">
            Category Offers
          </TabsTrigger>
          <TabsTrigger value="product" className="flex-1 font-bold ">
            Product Offers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="category">
          <OfferTable offers={filteredOffers} onDelete={handleDelete} />
        </TabsContent>
        <TabsContent value="product">
          <OfferTable offers={filteredOffers} onDelete={handleDelete} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Offer;
