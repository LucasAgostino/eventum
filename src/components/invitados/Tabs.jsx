import React from 'react';

const Tabs = ({ activeTab, onTabChange }) => {
  const tabs = ['todos', 'pendiente', 'enviado', 'confirmado', 'rechazado'];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex flex-wrap justify-center sm:justify-start">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab.toLowerCase())}
            className={`whitespace-nowrap pb-4 px-4 sm:px-6 border-b-2 font-medium text-sm sm:text-lg ${
              activeTab === tab.toLowerCase()
                ? 'border-violeta text-violeta'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;
