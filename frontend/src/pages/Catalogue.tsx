import React from 'react';
import { Navbar } from '@/components/Navbar';
import { PDFViewer } from '@/components/PDFViewer';
import { Footer } from '@/components/Footer';

const Catalogue = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PDFViewer />
      <Footer />
    </div>
  );
};

export default Catalogue;