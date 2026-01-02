export default function Suggestions({ suggestions }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-4">AI Suggestions</h3>
      <ul className="space-y-2">
        {suggestions.map((s, i) => (
          <li key={i} className="flex gap-2">
            <input type="checkbox" />
            <span className="text-sm">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
