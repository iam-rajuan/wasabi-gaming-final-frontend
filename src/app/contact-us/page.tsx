import React from 'react'
import ContactForm from './_components/contact-us-form'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

const ContactUsPage = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="absolute top-0 pt-5 left-0 w-full z-50">
        <Navbar />
      </div>
      <main className='flex-1 relative w-full flex flex-col justify-start items-center bg-[url("/images/contact_bg.jpg")] bg-cover bg-no-repeat bg-center pt-32 md:pt-44 lg:pt-52'>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-4 pb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[120%] text-center">
            Get In Touch
          </h1>

          <p className="text-base md:text-lg lg:text-xl font-normal text-[#EBEBEB] text-center pt-4 pb-7">
            Have a question or need support with your legal journey? Our{' '}
            <br className="hidden md:block" />
            team is here to help with applications, events, and everything in{' '}
            <br className="hidden md:block" />
            between.
          </p>

          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ContactUsPage
