export default function Budgets() {
  const budgets = [
    { category: 'Housing', limit: 1500, spent: 1200 },
    { category: 'Utilities', limit: 400, spent: 300 },
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Budget Details & Estimates</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Category</th>
            <th>Limit</th>
            <th>Spent</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((b) => (
            <tr key={b.category} className="border-t">
              <td>{b.category}</td>
              <td>${b.limit.toFixed(2)}</td>
              <td>${b.spent.toFixed(2)}</td>
              <td>${(b.limit - b.spent).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
