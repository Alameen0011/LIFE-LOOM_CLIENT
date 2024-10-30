import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

const DescriptReview = () => {
    const [activeTab, setActiveTab] = useState("description")
  return (
<div className="max-w-3xl mt-12 mx-auto py-10 p-6 bg-white rounded-lg shadow">
  <Tabs defaultValue="description" className="w-full" onValueChange={setActiveTab}>
    <TabsList className="border-b mb-4">
      <TabsTrigger value="description" className={`pb-2 mr-4 ${activeTab === 'description' ? 'border-b-2 border-primary font-semibold' : ''}`}>
        Description
      </TabsTrigger>
      <TabsTrigger value="reviews" className={`pb-2 ${activeTab === 'reviews' ? 'border-b-2 border-primary font-semibold' : ''}`}>
        Reviews
      </TabsTrigger>
    </TabsList>

    {/* Description Tab */}
    <TabsContent value="description">
      <div className="space-y-4 text-sm leading-relaxed text-gray-700">
        <p>
          Discover the comfort and style of our premium bamboo clothing. Made from high-quality bamboo fabric, this product is soft, breathable, and environmentally friendly. Ideal for both casual and formal occasions, it blends style with sustainability.
        </p>
        <p>
          This item is available in multiple colors and sizes, perfect for anyone looking to make a unique fashion statement while staying comfortable. Each garment is crafted to provide maximum durability and ease of care, with wrinkle-resistant properties and easy washing instructions.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Eco-friendly and sustainably sourced bamboo material.</li>
          <li>Soft and breathable, with natural moisture-wicking properties.</li>
          <li>Available in a variety of sizes and colors to suit your style.</li>
          <li>Wrinkle-resistant and easy to care for.</li>
        </ul>
      </div>
    </TabsContent>

    {/* Reviews Tab */}
    <TabsContent value="reviews">
      <div className="space-y-6 text-sm text-gray-700">
        <div className="space-y-2">
          <p className="font-semibold">Jane Doe</p>
          <p>⭐⭐⭐⭐⭐</p>
          <p>&quot;Absolutely love this product! The bamboo fabric feels amazing on the skin, and I love that it's environmentally friendly. Will definitely buy again!"</p>
        </div>
        <div className="space-y-2">
          <p className="font-semibold">John Smith</p>
          <p>⭐⭐⭐⭐</p>
          <p>"Great quality and very comfortable. The fit is perfect, though I wish it came in more color options. Overall, very satisfied with my purchase!"</p>
        </div>
        <div className="space-y-2">
          <p className="font-semibold">Sarah Lee</p>
          <p>⭐⭐⭐⭐⭐</p>
          <p>"This is my third purchase from this brand, and I'm always impressed. Highly recommend to anyone looking for sustainable clothing options!"</p>
        </div>
      </div>
    </TabsContent>
  </Tabs>
</div>

  )
}

export default DescriptReview