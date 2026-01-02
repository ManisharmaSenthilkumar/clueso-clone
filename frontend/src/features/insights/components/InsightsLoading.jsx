export default function InsightsLoading() {
  return (
    <div className="p-6 space-y-4">
      <div className="h-24 bg-gray-200 animate-pulse rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-40 bg-gray-200 animate-pulse rounded-xl" />
        <div className="h-40 bg-gray-200 animate-pulse rounded-xl" />
      </div>
      <div className="h-32 bg-gray-200 animate-pulse rounded-xl" />
      <div className="h-32 bg-gray-200 animate-pulse rounded-xl" />
    </div>
  );
}
