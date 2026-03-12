import React from 'react'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'

const Student = () => {
    return (
        <div className="bg-[#FBFDFF]" style={{
            backgroundImage: "url('/banner1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>

            <div className="container lg:py-16 flex flex-col items-center lg:gap-60 lg:flex-row ">
                <div className="lg:py-16 py-10 max-w-4xl text-center lg:text-left">
                    <Button variant="secondary" size="sm" className="rounded-full bg-[#EBEBEB] text-[#2B6BA1] backdrop-blur">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Student Tracking Dashboard
                    </Button>
                    <div className='mt-2'>
                        <h3 className="text-2xl  sm:text-[52px] lg:leading-[60px]  font-bold mb-4"> Keep Track Of Student <br /> Development</h3>
                        <p className=' text-[#5A5A5A]'>Gain a clear view of each student’s journey, from early engagement  <br className='sm:block hidden' /> to progression. Monitor skills development, application activity, <br className='sm:block hidden' /> and participation, and identify where additional support may be <br className='sm:block hidden' /> needed to help students move forward with confidence.</p>
                    </div>
                    <div className='lg:mt-10 '>
                        <h3 className='text-[#131313] font-bold text-[64px]'>10K+</h3>
                        <p>Students Using The Aspiring Legal Network</p>
                    </div>                </div>

                <div className="lg:py-16 py-10">
                    <Image
                        src="/schoolProject2.png"
                        alt="How It Works"
                        width={1200}
                        height={600}
                        className="w-full  rounded-xl"
                        priority
                    />
                </div>

            </div>

        </div>
    )
}

export default Student