import { Button } from "@/components/ui/button";
import HomeLatest from "@/components/users/HomeLatest";
import HomeTrending from "@/components/users/HomeTrending";
import { useNavigate } from "react-router-dom";


const HomePage = () => {

   const navigate  = useNavigate()  


  return (
    <div className="min-h-screen bg-white  overflow-y-auto">
      {/* Hero Section */}
      <section
        className="relative h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url()",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold font-primary mb-4">
            Introducing Life and Loom – Where Comfort Meets Sustainability
          </h1>
          <p className="text-lg mb-8">
            Explore our eco-friendly bamboo clothing collections for Men. At Life and Loom, we craft each piece with
            sustainability and comfort at the forefront, offering you
            breathable, stylish clothing that&apos;s better for both you and the
            planet. Join us in making a positive impact, one outfit at a time.
          </p>
          <Button onClick={() => {navigate('/products') }} size="lg" className="bg-green-600 hover:bg-green-700">
            Shop Now
          </Button>
        </div>
      </section>
      <div className="flex justify-center">
        <HomeTrending />
      </div>
      <div className="flex justify-center">
        <HomeLatest />
      </div>
     
    </div>
  );
};

export default HomePage;
