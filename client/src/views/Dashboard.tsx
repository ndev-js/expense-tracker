import { useState } from 'react';
import Transactions from '../components/Transactions';
import Expenses from '../components/Expenses';
import Budgets from '../components/Budgets';
import Reports from '../components/Reports';

const tabs = ['Transactions', 'Expenses', 'Budgets', 'Reports'] as const;
type Tab = typeof tabs[number];

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>('Transactions');
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Dashboard</h1>
      <nav className="flex space-x-4 mb-8">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1 rounded ${tab === t ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {t}
          </button>
        ))}
      </nav>
      {tab === 'Transactions' && <Transactions />}
      {tab === 'Expenses' && <Expenses />}
      {tab === 'Budgets' && <Budgets />}
      {tab === 'Reports' && <Reports />}
    </div>
  );
}
