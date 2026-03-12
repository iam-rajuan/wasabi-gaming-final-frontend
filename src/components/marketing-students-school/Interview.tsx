import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'

const Interview = () => {
    return (
        <div style={{
            backgroundImage: "url('/banner.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>

            <div className="container flex flex-col items-center lg:gap-24 lg:flex-row ">
                <div className="lg:py-28 py-7 ">
                    <Image
                        src="/project4.png"
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
                        Interview Practice Tool
                    </Button>
                    <div className='mt-2'>
                        <h3 className="text-2xl sm:text-[52px]  lg:leading-[60px]  font-bold mb-4"><span className='text-[#E4E403]'>Mock Interview </span> <span>Simulation</span> <br />Practice Real Interview  <br /> Scenarios And Build Confidence</h3>
                        <p className='max-w-2xl text-[#5A5A5A]'>Practise realistic interview questions across different formats,<br className="md:block hidden" /> including strengths based, competency based, and motivation <br className="md:block hidden" /> focused interviews. Build clear answers, improve communication, <br className="md:block hidden" /> and feel more confident before applying for work experience, <br className="md:block hidden" /> apprenticeships, or university.</p>
                    </div>
                    <Link href="/dashboard/mock-interview">
                        <Button className="py-3 px-12 mt-6 rounded-full hover:bg-[#FFFF00]/90 bg-[#FFFF00] text-[#282828] font-bold shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                            Starting Now
                        </Button>
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default Interview