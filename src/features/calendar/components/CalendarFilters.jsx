
export default function CalendarFilters({
  startYear,
  endYear,
  onStartYearChange,
  onEndYearChange,
  metric,
  onMetricChange,
  availableYears,
  region,
  onRegionChange,
  availableRegions,
}) {
  return (
    <section className="flex flex-wrap items-end gap-4 rounded-xl border border-(--border-color) bg-(--surface) p-5">

      <div className="min-w-40 flex-1">
        <label className="mb-2 block text-sm text-(--text-secondary)">
          Region
        </label>

        <select
          value={region}
          onChange={(e) => onRegionChange(e.target.value)}
          className="w-full rounded-lg border border-(--border-color) bg-(--surface-secondary) p-2.5 text-sm"
        >
          {availableRegions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="min-w-36 flex-1">
        <label className="mb-2 block text-sm text-(--text-secondary)">
          From Year
        </label>

        <select
          value={startYear}
          onChange={(e) => onStartYearChange(Number(e.target.value))}
          className="w-full rounded-lg border border-(--border-color) bg-(--surface-secondary) p-2.5 text-sm"
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="min-w-36 flex-1">
        <label className="mb-2 block text-sm text-(--text-secondary)">
          To Year
        </label>

        <select
          value={endYear}
          onChange={(e) => onEndYearChange(Number(e.target.value))}
          className="w-full rounded-lg border border-(--border-color) bg-(--surface-secondary) p-2.5 text-sm"
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="min-w-48 flex-1">
        <label className="mb-2 block text-sm text-(--text-secondary)">
          Activity Metric
        </label>

        <select
          value={metric}
          onChange={(e) => onMetricChange(e.target.value)}
          className="w-full rounded-lg border border-(--border-color) bg-(--surface-secondary) p-2.5 text-sm"
        >
          <option value="hotspot_count">Hotspot Count</option>
          <option value="historical_median">Historical Median</option>
          <option value="anomaly_percentage">Anomaly Percentage</option>
        </select>
      </div>
    </section>
  );
}
