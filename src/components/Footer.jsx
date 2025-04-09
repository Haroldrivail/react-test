import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto p-6 bg-gray-800 text-white text-center">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} MealSearch. All rights reserved.</p>
        <p className="text-gray-400 text-sm mt-2">Data provided by TheMealDB</p>
      </div>
    </footer>
  );
}
