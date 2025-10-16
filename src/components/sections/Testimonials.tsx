import { useState, useEffect } from 'react';
import { testimonialData } from '@/constants/testimonialData';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonialData[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-16 bg-bg-light transition-colors duration-300"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
        <h2 className="text-4xl text-center font-bold text-txt-primary mb-4">
          What Our <span className="text-txt-highlight">Customers Say</span>
        </h2>
        <p className="text-lg text-center text-txt-muted mb-12">
          Real experiences from our valued customers
        </p>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Main Testimonial Card */}
          <div className="bg-bg-dark rounded-2xl shadow-lg p-8 sm:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <FormatQuoteIcon className="absolute top-4 left-4 text-txt-highlight opacity-20 text-6xl" />

            {/* Stars */}
            <div className="flex justify-center mb-6 relative z-10">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <StarIcon
                  key={i}
                  className="text-yellow-400 text-3xl"
                  fontSize="large"
                />
              ))}
            </div>

            {/* Comment */}
            <p className="text-lg sm:text-xl text-center text-txt-muted mb-8 italic leading-relaxed relative z-10">
              "{currentTestimonial.comment}"
            </p>

            {/* Customer Info */}
            <div className="text-center relative z-10">
              <h3 className="text-2xl font-bold text-txt-primary mb-1">
                {currentTestimonial.name}
              </h3>
              <p className="text-txt-highlight font-medium">
                {currentTestimonial.role}
              </p>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-txt-highlight hover:bg-txt-highlight/80 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 opacity-40"
              aria-label="Previous testimonial"
            >
              <ArrowBackIosIcon className="text-sm sm:text-base ml-1" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-txt-highlight hover:bg-txt-highlight/80 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 opacity-40"
              aria-label="Next testimonial"
            >
              <ArrowForwardIosIcon className="text-sm sm:text-base" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonialData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'bg-txt-highlight w-8 h-3'
                    : 'bg-txt-muted/30 w-3 h-3 hover:bg-txt-muted/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
