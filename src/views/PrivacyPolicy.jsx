import React from 'react';
import MainLayout from '../layouts/MainLayout';

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <section className="relative bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-12">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')"}}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              Privacy Policy
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-4">
              How we collect, use, and protect your data
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#111827" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      <div className="container mx-auto p-4 py-12 bg-gray-900">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="prose prose-lg prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-indigo-400 mb-6">Last Updated: April 12, 2025</h2>
            
            <p className="mb-6">
              Welcome to MealSearch! We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Important Information and Who We Are</h3>
            
            <p className="mb-4">
              <strong>Purpose of this Privacy Policy</strong>: This privacy policy aims to give you information on how MealSearch collects and processes your personal data through your use of this website, including any data you may provide through this website when you sign up for an account, save favorite recipes, or use our search features.
            </p>
            
            <p className="mb-4">
              <strong>Controller</strong>: MealSearch is the controller and responsible for your personal data (collectively referred to as "MealSearch", "we", "us" or "our" in this privacy policy).
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">2. The Data We Collect About You</h3>
            
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Identity Data</strong> includes username or similar identifier.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
              <li><strong>Preference Data</strong> includes your favorite recipes and cooking preferences.</li>
            </ul>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">3. How We Use Your Personal Data</h3>
            
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>To register you as a new user</li>
              <li>To provide and improve our services to you</li>
              <li>To manage our relationship with you</li>
              <li>To save and display your favorite recipes</li>
              <li>To personalize your experience</li>
            </ul>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">4. Data Security</h3>
            
            <p className="mb-6">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">5. Data Retention</h3>
            
            <p className="mb-6">
              We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">6. Your Legal Rights</h3>
            
            <p className="mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">7. Third-party Links</h3>
            
            <p className="mb-6">
              This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">8. Cookies</h3>
            
            <p className="mb-6">
              We use cookies to distinguish you from other users of our website, remember your preferences, and provide enhanced features. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">9. Changes to the Privacy Policy</h3>
            
            <p className="mb-6">
              We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date at the top of this policy.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">10. Contact Us</h3>
            
            <p className="mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            
            <div className="bg-gray-700 p-4 rounded-lg mb-8">
              <p className="mb-2"><strong>Email</strong>: privacy@mealsearch.demo</p>
              <p className="mb-2"><strong>Phone</strong>: +237 653 149 884</p>
              <p><strong>Address</strong>: Bepanda "3 Bahams", Douala V</p>
            </div>
            
          </div>
        </div>
      </div>
    </MainLayout>
  );
}