
export const dashboardStats = [
  {
    title: "Fire Detections",
    value: "12,458",
    change: "+12.5%",
    description: "Compared to previous period",
    icon: "flame",
    trend: "up",
  },
  {
    title: "Harmonized Activity",
    value: "78.6",
    change: "+8.2%",
    description: "Unified activity index",
    icon: "activity",
    trend: "up",
  },
  {
    title: "Monitored Regions",
    value: "24",
    change: "3 new",
    description: "Regions with valid observations",
    icon: "globe",
    trend: "neutral",
  },
  {
    title: "Anomalies",
    value: "7",
    change: "+2",
    description: "Compared to historical baseline",
    icon: "alert",
    trend: "warning",
  },
];

export const activityTrendData = [
  { date: "01 Nov", current: 45, median: 38 },
  { date: "04 Nov", current: 52, median: 41 },
  { date: "07 Nov", current: 48, median: 40 },
  { date: "10 Nov", current: 68, median: 43 },
  { date: "13 Nov", current: 82, median: 45 },
  { date: "16 Nov", current: 75, median: 42 },
  { date: "19 Nov", current: 90, median: 48 },
  { date: "22 Nov", current: 72, median: 44 },
  { date: "25 Nov", current: 60, median: 40 },
  { date: "28 Nov", current: 85, median: 46 },
];

export const monthlyActivityData = [
  { month: "Jan", activity: 35 },
  { month: "Feb", activity: 42 },
  { month: "Mar", activity: 55 },
  { month: "Apr", activity: 48 },
  { month: "May", activity: 65 },
  { month: "Jun", activity: 72 },
  { month: "Jul", activity: 85 },
  { month: "Aug", activity: 92 },
  { month: "Sep", activity: 78 },
  { month: "Oct", activity: 60 },
  { month: "Nov", activity: 45 },
  { month: "Dec", activity: 38 },
];

export const recentAnomalies = [
  {
    id: 1,
    region: "North Africa",
    date: "Nov 13, 2026",
    severity: "High",
    activity: "+42%",
  },
  {
    id: 2,
    region: "Southern Europe",
    date: "Nov 12, 2026",
    severity: "Medium",
    activity: "+25%",
  },
  {
    id: 3,
    region: "Central Asia",
    date: "Nov 11, 2026",
    severity: "Low",
    activity: "+12%",
  },
];
