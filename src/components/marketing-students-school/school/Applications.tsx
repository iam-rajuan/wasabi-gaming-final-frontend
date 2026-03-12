import React from 'react'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'

const Applications = () => {
    return (
        <div className="bg-[#FFFFE6]" style={{
            backgroundImage: "url('/banner2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>

            <div className="container flex flex-col items-center lg:gap-36 lg:flex-row ">
                <div className="lg:py-16 pt-10">
                    <Image
                        src="/schoolProject3.png"
                        alt="How It Works"
                        width={1200}
                        height={600}
                        className=""
                        priority
                    />
                </div>

                <div className="py-20 max-w-4xl text-center lg:text-left">
                    <Button variant="secondary" size="sm" className="rounded-full bg-[#EBEBEB] mb-2 text-[#2B6BA1] backdrop-blur">
                        <Sparkles className="mr-2 h-4 w-4" />
                        1 Place to Support Applications
                    </Button>
                    <div className='mt-2'>
                        <h3 className="text-3xl sm:text-[52px] lg:leading-[60px]  font-bold mb-4">Connect Students With <span className='text-[#E4E403]'>Career  Opportunities</span></h3>
                        <p className='max-w-2xl text-[#5A5A5A]'>Invite students to explore and apply for career opportunities aligned with their interests and aspirations, including work experience, insight programmes, apprenticeships, and early careers roles. Schools can share opportunities in one place, supporting students to understand requirements, manage applications, and track progress over time.</p>
                    </div>
                    <div className='mt-10 '>
                        <h3 className='text-[#131313] font-bold text-[64px]'>1K+</h3>
                        <p>Central Platform for Careers Support</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Applications