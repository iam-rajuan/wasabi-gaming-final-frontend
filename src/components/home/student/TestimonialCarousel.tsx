import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // Number of testimonials to show

  const testimonials = [
    {
      id: 1,
      name: "James Hall",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      text: "Every system here is purposeful, motivating, and designed to push me/us to improve every game and practice.",
    },
    {
      id: 2,
      name: "Iva Ryan",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      text: "This platform made building my resume so much easier. The specialized tools and user-friendly interface saved me so much time compared to employers.",
    },
    {
      id: 3,
      name: "Judith Rodriguez",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 5,
      text: "As a recent graduate, I didn't know where to start with my CV. Amazing templates and easy to use. Highly recommend!",
    },
    {
      id: 4,
      name: "Michael Chen",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
      rating: 5,
      text: "The best career tool I've ever used. It helped me land my dream job within weeks of creating my profile.",
    },
    {
      id: 5,
      name: "Sarah Williams",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 5,
      text: "Professional templates and excellent customer support. Made my job search so much more organized and effective.",
    },
  ];

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1); // Mobile: show 1
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2); // Tablet: show 2
      } else {
        setVisibleCount(3); // Desktop: show 3
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  // Calculate card width based on visible count
  const getCardWidth = () => {
    if (visibleCount === 1) return "w-full max-w-sm mx-auto";
    if (visibleCount === 2) return "w-full sm:w-80";
    return "w-full sm:w-80";
  };

  // Calculate container max width based on visible count
  const getContainerMaxWidth = () => {
    if (visibleCount === 1) return "max-w-sm";
    if (visibleCount === 2) return "max-w-2xl";
    return "max-w-6xl";
  };

  return (
    <div className="w-full px-4 py-8 sm:py-12 md:py-16 mx-auto max-w-7xl">
      <div className="mb-8 sm:mb-12 text-center">
        <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E1E1E] source">
          Reviews from our users
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#5A5A5A] source px-4">
          See what our clients have to say about working with us. Their
          experiences highlight how we support schools and educators every step
          of the way.
        </p>
      </div>

      <div className="relative">
        {/* Carousel Container */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
          {/* Previous Button - Hidden on mobile when showing single card */}
          {visibleCount > 1 && (
            <button
              onClick={prevSlide}
              className="hidden sm:flex z-10 p-2 sm:p-3 transition-all duration-300 bg-white rounded-full shadow-lg hover:bg-gray-50 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>
          )}

          {/* Testimonial Cards */}
          <div className={`flex ${getContainerMaxWidth()} gap-4 sm:gap-6 overflow-hidden px-5 py-3`}>
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className={`flex-shrink-0 p-6 sm:p-8 transition-all duration-500 transform bg-white rounded-xl sm:rounded-2xl ${getCardWidth()} hover:scale-105 border border-[#EDCC13]`}
              >
                {/* Avatar */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="object-cover w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full shadow-md sm:shadow-lg"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-center text-[#000000] source">
                  {testimonial.name}
                </h3>

                {/* Star Rating */}
                <div className="flex justify-center gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm leading-relaxed text-center text-[#808080] source">
                  {testimonial.text}
                </p>
              </div>
            ))}
          </div>

          {/* Next Button - Hidden on mobile when showing single card */}
          {visibleCount > 1 && (
            <button
              onClick={nextSlide}
              className="hidden sm:flex z-10 p-2 sm:p-3 transition-all duration-300 bg-white rounded-full shadow-lg hover:bg-gray-50 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>
          )}
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex sm:hidden justify-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            className="z-10 p-3 transition-all duration-300 bg-white rounded-full shadow-lg hover:bg-gray-50"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="z-10 p-3 transition-all duration-300 bg-white rounded-full shadow-lg hover:bg-gray-50"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-yellow-400 w-4 sm:w-6 md:w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}