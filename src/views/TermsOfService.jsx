import React from 'react';
import MainLayout from '../layouts/MainLayout';

export default function TermsOfService() {
  return (
    <MainLayout>
      <section className="relative bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-12">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')"}}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              Terms of Service
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-4">
              The rules and guidelines for using our platform
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
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the MealSearch website (the "Service") operated by MealSearch ("us", "we", or "our").
            </p>
            
            <p className="mb-6">
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
            </p>
            
            <p className="mb-6">
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Accounts</h3>
            
            <p className="mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            
            <p className="mb-4">
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
            </p>
            
            <p className="mb-4">
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">2. Content</h3>
            
            <p className="mb-4">
              Our Service allows you to save, store, share and otherwise make available certain information, text, graphics, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
            </p>
            
            <p className="mb-4">
              By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">3. Copyright Policy</h3>
            
            <p className="mb-6">
              We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on the Service infringes on the copyright or other intellectual property rights of any person or entity.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">4. Disclaimer</h3>
            
            <p className="mb-6">
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">5. Recipe Information</h3>
            
            <p className="mb-4">
              All recipe information provided through the Service is for informational purposes only. While we strive to provide accurate and up-to-date recipe information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability of the recipes, ingredients, or nutritional information.
            </p>
            
            <p className="mb-4">
              Any reliance you place on such information is strictly at your own risk. We will not be liable for any allergic reactions, food poisoning, or other adverse effects resulting from the preparation or consumption of recipes found on our Service.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">6. Governing Law</h3>
            
            <p className="mb-6">
              These Terms shall be governed and construed in accordance with the laws of Cameroon, without regard to its conflict of law provisions.
            </p>
            
            <p className="mb-6">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">7. Changes to Terms of Service</h3>
            
            <p className="mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <p className="mb-6">
              By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">8. Limitation of Liability</h3>
            
            <p className="mb-6">
              In no event shall MealSearch, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">9. Contact Us</h3>
            
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            
            <div className="bg-gray-700 p-4 rounded-lg mb-8">
              <p className="mb-2"><strong>Email</strong>: legal@mealsearch.demo</p>
              <p className="mb-2"><strong>Phone</strong>: +237 653 149 884</p>
              <p><strong>Address</strong>: Bepanda "3 Bahams", Douala V</p>
            </div>
            
          </div>
        </div>
      </div>
    </MainLayout>
  );
}