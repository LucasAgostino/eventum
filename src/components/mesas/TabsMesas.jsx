import React from 'react';

const TabsMesas = ({ activeTab, onTabChange }) => {
  const tabs = [
    { label: 'Todos', value: 'todos' },
    { label: 'Ubicado', value: 'ubicados' },
    { label: 'Falta Ubicar', value: 'no_ubicados' }
  ];

  return (
    <div className="border-b border-gray-200 mb-4">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-lg ${
              activeTab === tab.value
                ? 'border-violeta text-violeta'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabsMesas;
