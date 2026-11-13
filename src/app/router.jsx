import {
  createBrowserRouter,
} from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import DashboardPage from "../features/dashboard/DashboardPage";
import FireMapPage from "../features/fire-map/FireMapPage";
import CalendarPage from "../features/calendar/CalendarPage";
import AnalyticsPage from "../features/analytics/AnalyticsPage";
import ExportPage from "../features/export/ExportPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "map",
        element: <FireMapPage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "export",
        element: <ExportPage />,
      },
    ],
  },
]);

export default router;