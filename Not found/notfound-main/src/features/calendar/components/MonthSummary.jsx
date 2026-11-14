
export default function MonthSummary({ data }) {
  if (!data) return null;

  const stats = [
    {
      label: "Hotspot Detections",
      value: data.hotspot_count.toLocaleString(),
    },
    {
      label: "Historical Median",
      value: data.historical_median.toLocaleString(),
    },
    {
      label: "Anomaly",
      value: `${data.anomaly_percentage > 0 ? "+" : ""}${data.anomaly_percentage}%`,
    },
    {
      label: "Valid Observation Days",
      value: data.valid_observation_days,
    },
    {
      label: "Data Coverage",
      value: `${data.coverage_percentage}%`,
    },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-(--border-color) bg-(--surface) p-4"
        >
          <p className="text-xs text-(--text-secondary)">
            {stat.label}
          </p>

          <p className="mt-2 text-xl font-bold">
            {stat.value}
          </p>
        </div>
      ))}
    </section>
  );
}
