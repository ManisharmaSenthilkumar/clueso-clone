export default function PainPoints({ points }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-4 text-red-600">Pain Points</h3>
      <ul className="list-disc ml-5 space-y-2 text-sm">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}
