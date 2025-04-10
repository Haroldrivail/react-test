import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';
import ToastContainer from '../components/ToastContainer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Breadcrumbs />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BackToTopButton />
      <ToastContainer />
    </div>
  );
}
