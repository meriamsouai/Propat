import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Équipements Pâtisserie",
    image:
      "https://www.materiel-horeca.com/guide/wp-content/uploads/2021/09/cuisine-patisserie-21.jpeg",
  },
  {
    name: "Chocolaterie",
    image:
      "https://image.makewebeasy.net/makeweb/m_1200x600/2d5mYAwHS/butter/Valrhona.jpg",
  },
  {
    name: "Décorations Gâteaux",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Ingrédients Spécialisés",
    image:
      "https://m.media-amazon.com/images/I/71G52Y2atdL._AC_SL1000_.jpg",
  },
];

export const CategoriesElegant = () => {
  return (

    <section className="relative py-20 bg-secondary overflow-hidden" id="categories">
      {/* Decorative background images */}
      <img 
        src="minibg65.png" 
        alt="" 
        className="absolute top-0 left-0 w-48 md:w-80 opacity-20 pointer-events-none select-none"
      />
      <img 
        src="/minibg64.png" 
        alt="" 
        className="absolute top-0 right-0 w-48 md:w-80 opacity-20 pointer-events-none select-none"
      />
      <img 
        src="/minibg64.png" 
        alt="" 
        className="absolute bottom-0 right-0 w-48 md:w-80 opacity-20 pointer-events-none select-none"
      />
      <img 
        src="/minibg65.png" 
        alt="" 
        className="absolute bottom-0 left-0 w-48 md:w-80 opacity-20 pointer-events-none select-none"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold italic text-accent mb-4">
            Nos Catégories de Produits
          </h2>
          <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
            Découvrez notre gamme complète d'équipements et d'ingrédients pour les métiers de bouches
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group overflow-hidden shadow-lg cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-500"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 pt-8">
                {/* Category Name (hidden until hover) */}
                <h3 className="text-2xl font-bold italic mb-4 opacity-0 translate-y-4 transition duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  {category.name}
                </h3>

                {/* Button (already hover only) */}
                <Link
                  to="/marketplace"
                  className="relative opacity-0 group-hover:opacity-100 transition duration-500 
                            border border-white px-6 py-2 italic text-sm overflow-hidden
                            text-white"
                >
                  {/* background animation */}
                  <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>

                  {/* underline */}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>

                  {/* text */}
                  <span className="relative z-10 group-hover:text-[#4b2e2e]">
                    En savoir plus
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
