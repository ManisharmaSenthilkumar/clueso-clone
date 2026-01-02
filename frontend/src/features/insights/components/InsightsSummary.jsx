export default function InsightsSummary({ summary }) {
  return (
    <div className="bg-indigo-600 text-white p-6 rounded-xl">
      <h2 className="text-sm opacity-80">AI INSIGHTS</h2>
      <p className="text-xl font-semibold mt-2">{summary}</p>
    </div>
  );
}
