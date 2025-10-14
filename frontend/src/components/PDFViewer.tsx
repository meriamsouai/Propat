import React from "react";

export const PDFViewer = () => {
  return (
    <section className="py-20 bg-muted pt-40" >
      <div className="container mx-auto px-4">

        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold italic text-accent mb-4">
            Explorez Notre Catalogue
          </h2>
          <p className="text-lg text-muted-foreground italic">
            Découvrez tous nos produits dans notre catalogue complet
          </p>
        </div>

        {/* Calaméo Embed */}
        <div className="flex flex-col items-center bg-background rounded-lg shadow-md p-6" >
          <iframe
            src="//v.calameo.com/?bkcode=008021967ecd74005e845&mode=mini&clickto=view&clicktarget=_self"
            width="1000"  
            height="600"  
            frameBorder="0"
            scrolling="no"
            allowTransparency
            allowFullScreen
            className="rounded-md"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
