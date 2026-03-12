'use client'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'James Hall',
    text: 'Every session feels purposeful, motivating, and designed to push students to improve their game consistently.',
  },
  {
    name: 'Iva Ryan',
    text: 'This platform made building my resume so much easier. The structured tools and clear guidance helped me present my skills professionally and stand out to employers.',
  },
  {
    name: 'Judith Rodriguez',
    text: "As a recent graduate, I didn't know where to start with my CV. Aspiring guided me through every step and made my resume look polished and professional.",
  },
  {
    name: 'Michael Chen',
    text: 'The guidance and resources provided were invaluable in helping me secure my dream position. Highly recommended for anyone starting their career.',
  },
  {
    name: 'Sarah Williams',
    text: 'Outstanding support throughout my application process. The tools are intuitive and the advice is practical and actionable.',
  },
]

const Testimonial = () => {
  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-full mx-auto text-center">
        {/* Heading */}
        <h3
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'Neuton', serif" }}
        >
          Reviews from our users
        </h3>

        <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto mb-16">
          See what our clients have to say about working with us. Their
          experiences highlight how we support schools and educators every step
          of the way
        </p>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-scroll">
            {[...reviews, ...reviews].map((review, index) => (
              <div key={index} className="flex-shrink-0 w-80 md:w-96 mx-4">
                <Card className="bg-white rounded-2xl shadow-lg border border-gray-200 h-full">
                  <CardContent className="p-6 md:p-8">
                    <h4 className="text-xl text-left font-bold text-gray-900 mb-4">
                      {review.name}
                    </h4>

                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 leading-relaxed text-left text-sm md:text-base">
                      {review.text}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 60s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default Testimonial
