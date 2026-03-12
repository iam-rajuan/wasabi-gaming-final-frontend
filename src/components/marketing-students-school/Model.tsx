import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'

const Model = () => {
    return (
        <div className="bg-[#FFFFE6]" style={{
            backgroundImage: "url('/banner1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>

            <div className="container flex flex-col items-center lg:gap-24 lg:flex-row ">
                <div className="lg:py-16 py-8 max-w-4xl text-center lg:text-left">
                    <Button variant="secondary" size="sm" className="rounded-full bg-[#EBEBEB] text-[#2B6BA1] backdrop-blur">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Application Tracker
                    </Button>
                    <div className='mt-2'>
                        <h3 className="text-2xl sm:text-[52px] lg:leading-[60px]  font-bold mb-4">Keep Track of Every <br /> <span className='text-[#E4E403]'>Application </span>  In One  Hub</h3>
                        <p className='max-w-2xl text-[#5A5A5A]'>Stay organised by tracking all your applications in one hub. Add notes, deadlines, and updates so you can see what you have applied for, what is coming up next, and where you may need to follow up.</p>
                    </div>
                    <Link href="/dashboard/application-tracker">
                        <Button className="py-3 px-12 mt-6 rounded-full hover:bg-[#E4E403] bg-[#FFFF00] text-[#282828] font-bold shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                            Start Tracking Now
                        </Button>
                    </Link>
                </div>

                <div className="py-16 ">
                    <Image
                        src="/project3.png"
                        alt="How It Works"
                        width={1200}
                        height={600}
                        className="w-full h-auto rounded-xl"
                        priority
                    />
                </div>

            </div>

        </div>
    )
}

export default Model