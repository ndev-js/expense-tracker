export default function Transactions() {
  const data = [
    { id: 1, date: '2024-01-01', description: 'Groceries', amount: 50 },
    { id: 2, date: '2024-01-05', description: 'Gas', amount: 35 },
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Transactions</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t) => (
            <tr key={t.id} className="border-t">
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td className="text-right">${t.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
