import { useEffect, useState } from "react";
import { fetchInsights } from "../features/insights/insights.api";

import InsightsSummary from "../features/insights/components/InsightsSummary";
import SentimentChart from "../features/insights/components/SentimentChart";
import ThemeTags from "../features/insights/components/ThemeTags";
import PainPoints from "../features/insights/components/PainPoints";
import Suggestions from "../features/insights/components/Suggestions";
import InsightsLoading from "../features/insights/components/InsightsLoading";

export default function Insights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInsights()
      .then(setData)
      .catch(() => setError("Failed to load insights"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <InsightsLoading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <InsightsSummary summary={data.summary} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SentimentChart sentiment={data.sentiment} />
        <ThemeTags themes={data.themes} />
      </div>

      <PainPoints points={data.painPoints} />
      <Suggestions suggestions={data.suggestions} />
    </div>
  );
}
