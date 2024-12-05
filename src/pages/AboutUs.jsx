import React from 'react'
import { useNavigate } from 'react-router-dom'


const AboutUs = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-gray-50  text-gray-800 font-primary">
    {/* Hero Section */}
    <section className="bg-green-100 min-h-60 py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600">
          Welcome to <span className="font-semibold">Leaf and Loom</span>, where sustainability meets style.
        </p>
      </div>
    </section>

    {/* Our Story */}
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            At Leaf and Loom, we started with a vision to revolutionize the fashion industry by creating eco-friendly,
            stylish, and comfortable clothing. Our journey began with the idea of utilizing bamboo—a renewable resource—
            to craft versatile apparel for men, women, and kids.
          </p>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/600x400"
            alt="Our story image"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>
    </section>

    {/* Our Core Values */}
    <section className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-8">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-gray-600">
              We are committed to protecting the planet by using renewable materials and reducing waste.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-gray-600">
              Our clothing is designed to last, offering durability without compromising on style.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Comfort</h3>
            <p className="text-gray-600">
              Every piece is crafted with care to ensure it feels as good as it looks.
            </p>
          </div>
  
        </div>
        <button onClick={() => navigate('/products')}   className="bg-white mt-10 text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-100">
          Shop Now
        </button>
      </div>
    </section>


  </div>
  )
}

export default AboutUs