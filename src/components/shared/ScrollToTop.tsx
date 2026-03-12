'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-[9999]">
            <button
                type="button"
                onClick={scrollToTop}
                className={cn(
                    'p-3 rounded-full bg-[#FFFF00] border-2 border-[#E5E500] text-black shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 ring-offset-2 focus:outline-none focus:ring-2 focus:ring-[#FFFF00]',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                )}
                aria-label="Scroll to top"
            >
                <ArrowUp className="w-6 h-6" strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default ScrollToTop;
