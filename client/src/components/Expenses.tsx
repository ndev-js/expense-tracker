export default function Expenses() {
  const categories = [
    { name: 'Housing', amount: 1200 },
    { name: 'Utilities', amount: 300 },
    { name: 'Entertainment', amount: 150 },
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Expenses by Category</h2>
      <ul>
        {categories.map((c) => (
          <li key={c.name} className="flex justify-between border-t py-1">
            <span>{c.name}</span>
            <span>${c.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
