import React from 'react';

// Example logos, replace with your actual logo paths
import logo1 from "/valrhona-logo.png";
import logo2 from "/pavoni-logo.png";
import logo3 from "/lubeca-logo.png";
import logo4 from "/selmi-logo.png";
import logo5 from "/sosa-logo.png";
import logo6 from "/sasa-logo.png";
import logo7 from "/logo-propat.png";


const categories = [
  { logo: logo1 },
  { logo: logo2 },
  { logo: logo3 },
  { logo: logo4 },
  { logo: logo5 },
  { logo: logo6 },
  { logo: logo7 },
  // add more...
];

// Duplicate for seamless infinite scroll
const duplicatedCategories = [...categories, ...categories];

export const SlidingCategories = () => {
  return (
    <section className="py-4 bg-accent/10 overflow-hidden border-y border-border">
      <div className="relative">
        <div className="flex sliding-animation">
          {duplicatedCategories.map((category, index) => (
            <div
              key={index}
              className="flex items-center mx-8 min-w-max"
            >
              <img
                src={category.logo}
                alt={`Partner logo ${index + 1}`}
                className="h-16 object-contain" // uniform height, no crop
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
