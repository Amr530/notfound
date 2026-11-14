
import {
  monthNames,
  getActivityLevel,
  getActivityColor,
} from "../utils/calendarHelpers";

export default function YearlyHeatmap({
  data,
  metric,
  onMonthSelect,
}) {
  const values = data
    .map((item) => item[metric])
    .filter((value) => value !== null && value !== undefined);

  const maxValue = Math.max(...values.map(Math.abs), 1);

  const years = [...new Set(data.map((item) => item.year))]
    .sort((a, b) => a - b);

  const metricLabels = {
    hotspot_count: "Hotspot Count",
    historical_median: "Historical Median",
    anomaly_percentage: "Anomaly",
  };

  function getCellLevel(item) {
    const value = item?.[metric];

    if (value === null || value === undefined) {
      return "no-data";
    }

    if (metric === "anomaly_percentage") {
      if (value === 0) return "zero";
      if (value < 0) return "low";
      if (value <= 25) return "medium";
      return "very-high";
    }

    return getActivityLevel(value, maxValue);
  }

  function getCellColor(level) {
    if (metric === "anomaly_percentage" && level === "low") {
      return "bg-blue-300 dark:bg-blue-900";
    }

    return getActivityColor(level);
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-(--border-color) bg-(--surface) p-5">
      <div className="mb-5">
        <h3 className="text-lg font-semibold">
          Yearly Fire Activity
        </h3>

        <p className="mt-1 text-xs text-(--text-secondary)">
          Displaying: {metricLabels[metric]}
        </p>
      </div>

      <div className="min-w-162.5">
        <div className="mb-3 grid grid-cols-[70px_repeat(12,minmax(0,1fr))] gap-2">
          <div />

          {monthNames.map((month) => (
            <div
              key={month}
              className="text-center text-xs font-medium text-(--text-secondary)"
            >
              {month}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {years.map((year) => (
            <div
              key={year}
              className="grid grid-cols-[70px_repeat(12,minmax(0,1fr))] items-center gap-2"
            >
              <span className="text-sm font-semibold">
                {year}
              </span>

              {monthNames.map((month, index) => {
                const monthNumber = index + 1;

                const item = data.find(
                  (entry) =>
                    entry.year === year &&
                    entry.month === monthNumber
                );

                const value = item?.[metric];
                const level = getCellLevel(item);

                return (
                  <button
                    key={`${year}-${monthNumber}`}
                    type="button"
                    disabled={!item || value == null}
                    onClick={() =>
                      item && onMonthSelect?.(year, monthNumber)
                    }
                    title={
                      item
                        ? `${month} ${year}: ${value ?? "No data"}`
                        : `${month} ${year}: No data`
                    }
                    className={`
                      h-9 rounded-md transition
                      ${getCellColor(level)}
                      ${item && value != null
                        ? "cursor-pointer hover:ring-2 hover:ring-orange-500 hover:ring-offset-2 dark:hover:ring-offset-gray-900"
                        : "cursor-not-allowed opacity-40"}
                    `}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-5 text-xs text-(--text-secondary)">
        Hover over a cell to inspect its value. Select a month to open its daily calendar.
      </p>
    </div>
  );
}
