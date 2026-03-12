import React from 'react'
import { Button } from './ui/button'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'

const Opportunities = () => {
    return (
        <div className="bg-[#FBFDFF]" style={{
            backgroundImage: "url('/banner2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>

            <div className="container flex flex-col items-center lg:gap-24 lg:flex-row ">
                <div className="lg:py-16 py-4 ">
                    <Image
                        src="/project3.png"
                        alt="How It Works"
                        width={1200}
                        height={600}
                        className="w-full h-auto rounded-xl"
                        priority
                    />
                </div>

                <div className="py-16 max-w-4xl text-center lg:text-left">
                    <Button variant="secondary" size="sm" className="rounded-full bg-[#EBEBEB] text-[#2B6BA1] backdrop-blur">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Opportunity Finder
                    </Button>
                    <div className='mt-2'>
                        <h3 className="text-2xl sm:text-[52px] lg:leading-[60px] leading-10  font-bold mb-4">Discover <span className='text-[#E4E403]'>Opportunities</span> That Fit You</h3>
                        <p className='max-w-2xl text-[#5A5A5A]'>Explore work experience, insight programmes, apprenticeships, and early career roles in one place. Find opportunities that match your interests, preferences, and goals, without endless searching.</p>
                    </div>
                    <Button className="py-3 px-12 mt-6 rounded-full  bg-[#FFFF00] text-[#282828] hover:bg-[#E4E403] font-bold">Start Exploring</Button>
                </div>

            </div>

        </div>
    )
}

export default Opportunities