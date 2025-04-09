import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
