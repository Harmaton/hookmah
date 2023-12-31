import React from 'react';
import { Plane, CreditCard, Truck, Library } from 'lucide-react'; // Import the specific icons from lucide-react

interface Feature {
  name: string;
  icon: React.ReactNode; // Type of the icon is React.ReactNode since it is a React component
  description: string;
}

const features: Feature[] = [
    {
        name: 'Download all resources',
        icon: <Library />,
        description: 'Streamlined, Intuitive Navigation',
      },
      {
        name: 'Support System',
        icon: <Plane />,
        description: 'Instant, Insightful Assistance',
      },
      {
        name: 'Curated Experience',
        icon: <CreditCard />,
        description: 'Secure, Swift Transactions',
      },
      {
        name: 'Unique Results',
        icon: <Truck />,
        description: 'Reliable, Timely Arrival',
      },    
];

const Features: React.FC = () => (
  <div className="container mx-auto p-4 rounded-md">
    <section className="space-y-6 m-auto">
      <header className="text-2xl font-semibold text-center">
        Why Hookmah
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex border shadow-md rounded-md overflow-hidden">
            <div className="flex-shrink-0 w-1/4 flex items-center justify-center hover:bg-green-400 rounded-md m-2 p-2">
              {feature.icon} 
            </div>
            <div className="flex-grow p-4">
              <h2 className="text-lg font-semibold">{feature.name}</h2>
              <span className="text-sm text-gray-500">{feature.description}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Features;
