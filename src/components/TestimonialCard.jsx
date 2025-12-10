import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ 
  quote, 
  author, 
  role, 
  avatar, 
  rating = 5,
  className = '' 
}) => {
  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700
      transition-all duration-300 hover:shadow-xl hover:-translate-y-1
      ${className}
    `}>
      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
      
      {/* Quote */}
      <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        "{quote}"
      </blockquote>
      
      {/* Author */}
      <div className="flex items-center">
        <img
          src={avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`}
          alt={`${author} avatar`}
          className="w-10 h-10 rounded-full mr-3"
          loading="lazy"
          width="40"
          height="40"
        />
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {author}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {role}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;