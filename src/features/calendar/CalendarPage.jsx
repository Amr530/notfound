
import { useMemo, useState } from "react";

import YearlyHeatmap from "./components/YearlyHeatmap";
import DailyCalendar from "./components/DailyCalendar";
import MonthSummary from "./components/MonthSummary";
import CalendarFilters from "./components/CalendarFilters";

import {
  monthlyActivity,
  dailyActivity,
} from "./data/mockCalendarData";

import { monthNames } from "./utils/calendarHelpers";


const availableRegions = [
  {
    id: "egypt",
    name: "Egypt (Demo)",
  },
];


export default function CalendarPage() {
  const availableYears = useMemo(
    () => [...new Set(monthlyActivity.map((item) => item.year))]
      .sort((a, b) => a - b),
    []
  );

  const [startYear, setStartYear] = useState(
    Math.min(...availableYears)
  );

  const [endYear, setEndYear] = useState(
    Math.max(...availableYears)
  );

  const [selectedRegion, setSelectedRegion] = useState("egypt");

  const [metric, setMetric] = useState("hotspot_count");

  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [selectedDay, setSelectedDay] = useState(null);

  const filteredData = useMemo(() => {
  return monthlyActivity
    .filter(
      (item) =>
        item.year >= startYear &&
        item.year <= endYear
    )
    .map((item) => ({
      ...item,
      region_id: "egypt",
    }))
    .filter((item) => item.region_id === selectedRegion);
}, [startYear, endYear, selectedRegion]);

  const selectedMonthData = useMemo(() => {
  return filteredData.find(
    (item) =>
      item.year === selectedYear &&
      item.month === selectedMonth
  );
}, [filteredData, selectedYear, selectedMonth]);

  const selectedDailyData = useMemo(() => {
    return dailyActivity.filter((item) =>
      item.date.startsWith(
        `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-`
      )
    );
  }, [selectedYear, selectedMonth]);

  function handleStartYearChange(year) {
    setStartYear(year);

    if (year > endYear) {
      setEndYear(year);
    }

    if (selectedYear < year) {
      setSelectedYear(year);
      setSelectedDay(null);
    }
  }

  function handleEndYearChange(year) {
    setEndYear(year);

    if (year < startYear) {
      setStartYear(year);
    }

    if (selectedYear > year) {
      setSelectedYear(year);
      setSelectedDay(null);
    }
  }

  function handleMonthSelect(year, month) {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDay(null);
  }

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-2xl font-bold">
          Activity Calendar
        </h2>

        <p className="mt-1 text-sm text-(--text-secondary)">
          Explore historical and daily harmonized fire activity.
        </p>
      </div>

      <CalendarFilters
        startYear={startYear}
        endYear={endYear}
        onStartYearChange={handleStartYearChange}
        onEndYearChange={handleEndYearChange}
        metric={metric}
        onMetricChange={setMetric}
        availableYears={availableYears}
        region={selectedRegion}
        onRegionChange={setSelectedRegion}
        availableRegions={availableRegions}
      />

      <YearlyHeatmap
        data={filteredData}
        metric={metric}
        onMonthSelect={handleMonthSelect}
      />

      <div>
        <h3 className="mb-4 text-lg font-semibold">
          {monthNames[selectedMonth - 1]} {selectedYear} Summary
        </h3>

        {selectedMonthData ? (
          <MonthSummary data={selectedMonthData} />
        ) : (
          <p className="text-sm text-(--text-secondary)">
            No monthly data available for this selection.
          </p>
        )}
      </div>

      <DailyCalendar
        year={selectedYear}
        month={selectedMonth}
        data={selectedDailyData}
        onDaySelect={setSelectedDay}
      />

      {selectedDay && (
        <div className="rounded-xl border border-orange-500/30 bg-(--surface) p-5">
          <h3 className="font-semibold">
            Selected Day: {selectedDay.date}
          </h3>

          <p className="mt-2 text-sm text-(--text-secondary)">
            Observation Status: {selectedDay.observation_status}
          </p>

          <p className="mt-1 text-sm text-(--text-secondary)">
            Hotspot Detections:{" "}
            {selectedDay.hotspot_count ?? "Unavailable"}
          </p>
        </div>
      )}
    </div>
  );
}
