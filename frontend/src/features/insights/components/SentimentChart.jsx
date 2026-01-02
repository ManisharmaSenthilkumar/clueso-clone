export default function SentimentChart({ sentiment }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-4">Sentiment</h3>

      {Object.entries(sentiment).map(([key, value]) => (
        <div key={key} className="mb-2">
          <div className="flex justify-between text-sm">
            <span className="capitalize">{key}</span>
            <span>{value}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded">
            <div
              className={`h-2 rounded ${
                key === "positive"
                  ? "bg-green-500"
                  : key === "neutral"
                  ? "bg-yellow-400"
                  : "bg-red-500"
              }`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
