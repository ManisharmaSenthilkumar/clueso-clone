export default function ThemeTags({ themes }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-4">Key Themes</h3>
      <div className="flex flex-wrap gap-2">
        {themes.map((t) => (
          <span
            key={t.label}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
          >
            {t.label} ({t.count})
          </span>
        ))}
      </div>
    </div>
  );
}
