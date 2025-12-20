export default function Labels() {
  const labels = [
    { name: "Downloads", count: 1 },
    { name: "Malayalam", count: 1 },
    { name: "Sinhala Subtitles", count: 1 },
  ];

  return (
    <div className="bg-black/60 p-4 rounded">
      <h3 className="font-bold mb-3">Labels</h3>

      {labels.map(label => (
        <div key={label.name} className="flex justify-between py-1 text-sm">
          <span>{label.name}</span>
          <span>{label.count}</span>
        </div>
      ))}
    </div>
  );
}
