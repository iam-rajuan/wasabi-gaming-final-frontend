// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Sparkles } from "lucide-react";

// const images = [
//     "/heroimage.jpg",
//     "/heroimage.jpg",
//     "/heroimage.jpg",
// ]; // add all your images here

// export function SchoolHero() {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     // Auto-change images every 3 seconds
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prev) => (prev + 1) % images.length);
//         }, 3000);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <section
//             className="relative overflow-hidden h-[699px] py-[110px] px-4 bg-gradient-to-r"
//             style={{
//                 backgroundImage: "url('/schoolhero.png')",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//             }}
//         >
//             <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                     {/* Left Content */}
//                     <div className="flex flex-col items-start space-y-6 z-10">
//                         <Button
//                             variant="secondary"
//                             size="sm"
//                             className="w-fit rounded-full bg-[#FFFFE6] text-black font-medium"
//                         >
//                             <Sparkles className="mr-2 h-4 w-4 text-[#E4E403]" />
//                             Transform Student Success
//                         </Button>

//                         {/* Heading & Subheading */}
//                         <div className="flex flex-col space-y-4 ">
//                             <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-black !leading-[70px]">
//                                 HELPING SCHOOLS TRACK STUDENTS{" "}
//                                 <span className="text-[#E4E403]">CAREERS</span>
//                             </h1>

//                             <p className="text-[#424242] text-lg sm:text-[24px] max-w-2xl">
//                                 Monitor, support, and report on student career development with
//                                 powerful insights and real-time tracking capabilities.
//                             </p>
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex flex-col sm:flex-row gap-4 pt-2">
//                             <Button className="bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-black font-semibold rounded-full px-12 py-3 text-base flex items-center gap-2">
//                                 <Sparkles className="h-4 w-4 text-black" /> Get Started
//                             </Button>

//                             <Button
//                                 variant="outline"
//                                 className="border-2 border-black bg-black text-white hover:bg-black/90 font-semibold rounded-full px-8 py-3 text-base"
//                             >
//                                 Start Demo Trial
//                             </Button>
//                         </div>
//                     </div>

//                     {/* Right Image Slider */}
//                     <div className="flex flex-col items-center lg:items-end">
//                         <div className="w-full max-w-[600px] -mr-52 relative aspect-[4/3]">
//                             <Image
//                                 src={images[currentIndex]}
//                                 alt={`Slide ${currentIndex + 1}`}
//                                 fill
//                                 className="object-cover rounded-xl shadow-2xl"
//                             />
//                             <div className="absolute inset-0 rounded-xl border border-black/10 pointer-events-none"></div>

//                             {/* Dots */}
//                             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                                 {images.map((_, idx) => (
//                                     <span
//                                         key={idx}
//                                         onClick={() => setCurrentIndex(idx)}
//                                         className={`w-3 h-3 rounded-full cursor-pointer transition-all ${currentIndex === idx
//                                                 ? "bg-[#FFFF00]"
//                                                 : "bg-black/30 hover:bg-black"
//                                             }`}
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom Accent Line */}
//             <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-transparent" />
//         </section>
//     );
// }

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

const images = ['/heroimage.jpg', '/heroimage.jpg', '/heroimage.jpg']

export function SchoolHero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-change images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="relative overflow-hidden py-[80px] px-4 sm:py-[100px] sm:px-6 lg:py-[110px] lg:px-8 bg-gradient-to-r"
      style={{
        backgroundImage: "url('/schoolhero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col items-start space-y-6 z-10 text-center lg:text-left">
            <Button
              variant="secondary"
              size="sm"
              className="w-fit rounded-full bg-[#FFFFE6] text-black font-medium mx-auto lg:mx-0"
            >
              <Sparkles className="mr-2 h-4 w-4 text-[#E4E403]" />
              Transform Student Success
            </Button>

            {/* Heading & Subheading */}
            <div className="flex flex-col space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-black leading-snug sm:leading-[60px] lg:leading-[70px]">
                HELPING SCHOOLS TRACK STUDENTS{' '}
                <span className="text-[#E4E403]">CAREERS</span>
              </h1>

              <p className="text-[#424242] text-base sm:text-lg md:text-xl sm:max-w-xl lg:max-w-2xl mx-auto lg:mx-0">
                Monitor, support, and report on student career development with
                powerful insights and real-time tracking capabilities.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center w-full lg:justify-start">
              <Link
                className="flex justify-center"
                href="/school/manage-students"
              >
                <Button className="bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-black font-semibold rounded-full px-16 sm:px-12 py-3 text-base flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <Sparkles className="h-4 w-4 text-black" /> Get Started
                </Button>
              </Link>

              {/* <Link href="/school/demo">
                                <Button
                                    variant="outline"
                                    className="border-2 border-black bg-black text-white hover:bg-black/90 hover:text-white font-semibold rounded-full px-8 py-3 text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                                >
                                    Start Demo Trial
                                </Button>
                            </Link> */}
            </div>
          </div>

          {/* Right Image Slider */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="w-full max-w-[500px] sm:max-w-[550px] lg:-mr-52 lg:max-w-[600px] relative aspect-[4/3]">
              <Image
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                fill
                className="object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-xl border border-black/10 pointer-events-none"></div>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                      currentIndex === idx
                        ? 'bg-[#FFFF00]'
                        : 'bg-black/30 hover:bg-black'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-transparent" />
    </section>
  )
}
