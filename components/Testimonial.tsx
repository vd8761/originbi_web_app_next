'use client';

import React, { useState, useEffect, useCallback } from 'react'; // 👈 Added useCallback
import type { TestimonialData } from '../lib/types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import QuoteIcon from './icons/QuoteIcon';

const testimonials: TestimonialData[] = [
  // ... (Your testimonial data remains the same)
  {
    quote: "An invaluable tool for any student feeling lost about their career. The insights are practical and immediately actionable.",
    name: "Amit",
    title: "B.Com, Delhi",
    image: "/Slider.png",
  },
  {
    quote: "Origin BI's test gave me clarity on my strengths, and the roadmap guided me step-by-step toward UI/UX design.",
    name: "Sneha",
    title: "B.Sc. Computer Science, Chennai",
    image: "/Slider.png",
  },
  {
    quote: "The personalized feedback was a game-changer. I finally understood where to focus my learning efforts for a career in data science.",
    name: "Rajesh",
    title: "B.Tech IT, Bangalore",
    image: "/Slider.png",
  },
  {
    quote: "I never thought I could pivot into product management, but OriginBI provided the exact guidance I needed to start my journey.",
    name: "Priya",
    title: "MBA, Mumbai",
    image: "/Slider.png",
  },
];

const Testimonial: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🟢 Improvement 1: Wrap navigation functions in useCallback
  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, []);

  const current = testimonials[currentIndex];

  useEffect(() => {
    // Note: nextTestimonial is stable thanks to useCallback, 
    // but the effect still relies on currentIndex to reset the timer.
    const timer = setTimeout(nextTestimonial, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, nextTestimonial]); // 👈 Added nextTestimonial dependency (though it won't change)


  return (
    <div className="relative w-full h-full bg-brand-dark-secondary rounded-3xl overflow-hidden p-8 md:p-12 flex flex-col justify-end">
        <div className="absolute inset-0 z-0">
            <img
              key={currentIndex}
              // ✅ Image Fix: Using cache-busting parameter to re-trigger the fade animation
              src={`${current.image}?id=${currentIndex}`} 
              alt={`Testimonial background for ${current.name}`} // 🟢 Improvement 2: More descriptive alt text
              className="absolute inset-0 w-full h-full object-cover object-center animate-fade-in"
              loading={currentIndex === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-20 space-y-4 text-white">
            <div className="space-y-4">
                <QuoteIcon className="w-5 h-5 text-brand-green"/>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-[24px] font-normal leading-tight">
                    {current.quote}
                </p>
            </div>
            <div>
                <p className="text-base sm:text-lg md:text-xl font-semibold">{current.name},</p>
                <p className="text-sm sm:text-base md:text-lg text-gray-300">{current.title}</p>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                    <div
                    key={index}
                    // 🟢 Improvement 3: Added aria-label for accessibility on dots
                    aria-label={`Go to testimonial ${index + 1}`}
                    role="button" 
                    tabIndex={0}
                    onClick={() => setCurrentIndex(index)} // 🟢 Improvement 3: Make dots clickable
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${ 
                        index === currentIndex ? 'bg-brand-green w-8' : 'bg-gray-500 w-4'
                    }`}
                    />
                ))}
                </div>
                <div className="flex space-x-3">
                {/* 🟢 Improvement 4: Added aria-label to buttons for screen readers */}
                <button 
                    onClick={prevTestimonial} 
                    aria-label="Previous testimonial"
                    className="bg-white/10 hover:bg-white/20 dark:bg-brand-dark-tertiary/50 dark:hover:bg-brand-dark-tertiary text-white rounded-full p-3 transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5"/>
                </button>
                <button 
                    onClick={nextTestimonial} 
                    aria-label="Next testimonial"
                    className="bg-brand-green hover:bg-brand-green/90 text-white rounded-full p-3 transition-colors"
                >
                    <ArrowRightIcon className="w-5 h-5"/>
                </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Testimonial;