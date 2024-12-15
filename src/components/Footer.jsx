import { Facebook, Twitter, Instagram, FacebookIcon, InstagramIcon, TwitterIcon, MessageCircleHeart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"





const Footer = () => {

  const currentYear = new Date().getFullYear()
  return (
    <footer className='bg-[#123514] text-slate-50 font-primary'>
      <div className='mx-auto w-full max-w-screen-xl p-4 py-8 lg:py-12'>
        <div className='md:flex md:justify-between'>
          <div className='mb-6 md:mb-0'>
            <a href='/' className='flex items-center'>
              <span className='self-center text-2xl font-semibold whitespace-nowrap'>
                Life & Loom
              </span>
            </a>
            <p className='mt-2 max-w-xs text-sm text-slate-300'>
              Discover and collect unique artworks from talented artists
              worldwide.
            </p>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4'>
         
            
            <div>
              <h2 className='mb-6 text-sm font-semibold uppercase'>About Us</h2>
              <ul className='text-slate-300 font-medium'>
                <li className='mb-4'>
                  <a href='#' className='hover:underline hover:text-slate-100'>
                    Our Story
                  </a>
                </li>
                <li className='mb-4'>
                  <a href='#' className='hover:underline hover:text-slate-100'>
                    Blog
                  </a>
                </li>
                <li className='mb-4'>
                  <a href='#' className='hover:underline hover:text-slate-100'>
                    Press
                  </a>
                </li>
                <li className='mb-4'>
                  <a href='#' className='hover:underline hover:text-slate-100'>
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-6 text-sm font-semibold uppercase'>Support</h2>
              <ul className='text-slate-300 font-medium'>
                <li className='mb-4'>
                  <a href='#' className='hover:underline hover:text-slate-100'>
                    FAQ
                  </a>
                </li>
                <li className='mb-4'>
                  <a href='#' className='hover:underline hover:text-slate-100'>
                    Contact Us
                  </a>
                </li>
                <li className='mb-4'>
                  <a href='#' className='hover:underline hover:text-slate-100'>
                    Shipping
                  </a>
                </li>
                <li className='mb-4'>
                  <a href='#' className='hover:underline hover:text-slate-100'>
                    Returns
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className='my-6 border-slate-700 sm:mx-auto lg:my-8' />
        <div className='sm:flex sm:items-center sm:justify-between'>
        
          <div className='flex mt-4 space-x-5 sm:justify-center sm:mt-0'>
            <a href='#' className='text-slate-400 hover:text-slate-100'>
              <FacebookIcon className='w-5 h-5' />
              <span className='sr-only'>Facebook page</span>
            </a>
            <a href='#' className='text-slate-400 hover:text-slate-100'>
              <InstagramIcon className='w-5 h-5' />
              <span className='sr-only'>Instagram page</span>
            </a>
            <a href='#' className='text-slate-400 hover:text-slate-100'>
              <TwitterIcon className='w-5 h-5' />
              <span className='sr-only'>Twitter page</span>
            </a>
            <a href='#' className='text-slate-400 hover:text-slate-100'>
              <MessageCircleHeart className='w-5 h-5' />
              <span className='sr-only'>Pinterest page</span>
            </a>
          </div>
        </div>
      </div>
      </footer>
)
  
}

export default Footer