
import { useMemo } from "react";

export default function DailyCalendar({
  year,
  month,
  data,
  onDaySelect,
}) {
  const daysInMonth = new Date(year, month, 0).getDate();

  // Monday = 0, Sunday = 6
  const firstDay = (new Date(year, month - 1, 1).getDay() + 6) % 7;

  const dailyMap = useMemo(() => {
    return new Map(
      data.map((item) => [
        Number(item.date.slice(-2)),
        item,
      ])
    );
  }, [data]);

  const days = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  function getDayStyle(item) {
    if (!item) {
      return "bg-gray-100 dark:bg-gray-800 opacity-50";
    }

    if (item.observation_status === "no_observation") {
      return "bg-gray-300 dark:bg-gray-700";
    }

    if (item.observation_status === "partial") {
      return "bg-yellow-200 dark:bg-yellow-900";
    }

    const count = item.hotspot_count;

    if (count === 0) {
      return "bg-slate-100 dark:bg-slate-800";
    }

    if (count <= 15) return "bg-orange-200 dark:bg-orange-950";
    if (count <= 30) return "bg-orange-400 dark:bg-orange-800";
    if (count <= 50) return "bg-orange-600";
    return "bg-red-600";
  }

  return (
    <section className="rounded-xl border border-(--border-color) bg-(--surface) p-5">
      <h3 className="mb-5 text-lg font-semibold">
        Daily Activity — {month}/{year}
      </h3>

      <div className="grid grid-cols-7 gap-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
          (day) => (
            <div
              key={day}
              className="pb-2 text-center text-xs font-medium text-(--text-secondary)"
            >
              {day}
            </div>
          )
        )}

        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {days.map((day) => {
          const item = dailyMap.get(day);

          return (
            <button
              key={day}
              type="button"
              onClick={() => item && onDaySelect?.(item)}
              disabled={!item}
              title={
                item
                  ? `${item.date} — ${
                      item.observation_status === "no_observation"
                        ? "No observation"
                        : `${item.hotspot_count} detections`
                    }`
                  : `${day}: Demo data not available`
              }
              className={`
                flex aspect-square min-h-10 items-center justify-center
                rounded-lg text-sm font-medium transition
                ${getDayStyle(item)}
                ${item ? "hover:ring-2 hover:ring-orange-500" : "cursor-not-allowed"}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-4 text-xs text-(--text-secondary)">
        <span>Orange: Valid observation</span>
        <span>Yellow: Partial observation</span>
        <span>Gray: No observation</span>
        <span>Faded: Data not loaded</span>
      </div>
    </section>
  );
}
