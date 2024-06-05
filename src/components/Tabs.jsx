import React from 'react';

const Tabs = ({ activeTab, onTabChange }) => {
  const tabs = ['todos','pendiente', 'enviado', 'confirmado', 'rechazado',];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab.toLowerCase())}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-lg ${
              activeTab === tab.toLowerCase()
                ? 'border-blue-500 text-blue-600'
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