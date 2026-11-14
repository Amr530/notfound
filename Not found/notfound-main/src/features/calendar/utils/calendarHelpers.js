
export const monthNames = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec",
];

export function getActivityLevel(value, maxValue) {
  if (value === null || value === undefined) {
    return "no-data";
  }

  if (value === 0) {
    return "zero";
  }

  const ratio = maxValue > 0 ? value / maxValue : 0;

  if (ratio <= 0.25) return "low";
  if (ratio <= 0.5) return "medium";
  if (ratio <= 0.75) return "high";

  return "very-high";
}

export function getActivityColor(level) {
  const colors = {
    "no-data": "bg-gray-200 dark:bg-gray-700",
    zero: "bg-slate-100 dark:bg-slate-800",
    low: "bg-orange-200 dark:bg-orange-950",
    medium: "bg-orange-400 dark:bg-orange-800",
    high: "bg-orange-600 dark:bg-orange-600",
    "very-high": "bg-red-600 dark:bg-red-500",
  };

  return colors[level] ?? colors["no-data"];
}

export function getMetricValue(item, metric) {
  if (!item || item[metric] === null || item[metric] === undefined) {
    return null;
  }

  return item[metric];
}
