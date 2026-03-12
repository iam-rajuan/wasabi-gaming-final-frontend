import React from 'react'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

const logos = [
  { src: '/partners1.png', alt: 'HAYS', width: 187, height: 60 },
  { src: '/partners2.png', alt: 'Randstad', width: 60, height: 60 },
  { src: '/partners3.png', alt: 'Indeed', width: 148, height: 60 },
  { src: '/partners4.png', alt: 'Sthree', width: 60, height: 60 },
  { src: '/partners5.png', alt: 'University 1', width: 60, height: 60 },
  { src: '/partners6.png', alt: 'University 2', width: 120, height: 60 },
]

const PartnersMarquee = () => {
  return (
    <section className="py-5 bg-white !overflow-y-hidden">
      <Marquee gradient={false} speed={50} pauseOnHover loop={0} className="!overflow-y-hidden">
        <div className="flex items-center gap-8 md:gap-20 lg:gap-48 pr-8 md:pr-20 lg:pr-48">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center gap-20 justify-center"
              style={{ width: logo.width, height: logo.height }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  )
}

export default PartnersMarquee
