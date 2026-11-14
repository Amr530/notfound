import { Link } from "react-router-dom";
import {
  Flame,
  Activity,
  Globe2,
  AlertTriangle,
  MapPinned,
  Database,
  Satellite,
  ArrowUpRight,
  // eslint-disable-next-line no-unused-vars
  Layers3,
} from "lucide-react";

const stats = [
  {
    title: "Fire Detections",
    description: "MODIS + VIIRS observations",
    icon: Flame,
  },
  {
    title: "Harmonized Activity",
    description: "Unified activity measurement",
    icon: Activity,
  },
  {
    title: "Monitored Regions",
    description: "Regions with valid observations",
    icon: Globe2,
  },
  {
    title: "Anomalies",
    description: "Historical activity deviations",
    icon: AlertTriangle,
  },
];

function SectionHeader({ title, description, action }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div>
        <h3 className="font-semibold">{title}</h3>
        {description && (
          <p className="mt-1 text-xs text-(--text-secondary)">{description}</p>
        )}
      </div>

      {action}
    </div>
  );
}

function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center px-4 text-center">
      <div className="mb-3 rounded-2xl bg-(--surface-secondary) p-4">
        <Icon size={27} className="text-(--text-secondary)" />
      </div>

      <h4 className="text-sm font-semibold">{title}</h4>

      <p className="mt-2 max-w-xs text-xs leading-5 text-(--text-secondary)">
        {description}
      </p>
    </div>
  );
}

function DataSourceCard({ name, satellite, description }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-(--border-color) bg-(--surface-secondary) p-4">
      <div className="rounded-lg bg-(--surface) p-3">
        <Satellite size={21} className="text-orange-500" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-(--text-secondary)">{satellite}</p>
        <p className="mt-1 text-xs text-(--text-secondary)">{description}</p>
      </div>

      <span className="whitespace-nowrap rounded-full border border-(--border-color) px-2.5 py-1 text-[10px] text-(--text-secondary)">
        Integration pending
      </span>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-7">
      {/* Page Header */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>

          <p className="mt-1 text-sm text-(--text-secondary)">
            Satellite-based fire activity monitoring and analysis.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-(--border-color) bg-(--surface) px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-gray-400" />
          <span className="text-xs text-(--text-secondary)">
            Waiting for data integration
          </span>
        </div>
      </section>

      {/* Summary Cards */}
      <section>
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Monitoring Overview</h3>
          <p className="mt-1 text-xs text-(--text-secondary)">
            Key indicators will appear when the data service is connected.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-xl border border-(--border-color) bg-(--surface) p-5 transition hover:border-orange-500/40"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-(--text-secondary)">
                    {stat.title}
                  </p>

                  <div className="rounded-lg bg-orange-500/10 p-2">
                    <Icon size={19} className="text-orange-500" />
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-2xl font-bold text-(--text-secondary)">
                    —
                  </p>

                  <p className="mt-2 text-xs text-(--text-secondary)">
                    {stat.description}
                  </p>
                </div>

                <div className="mt-4 border-t border-(--border-color) pt-3">
                  <span className="text-[11px] text-(--text-secondary)">
                    Awaiting backend data
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Map + Activity */}
      <section className="grid gap-5 xl:grid-cols-3">
        {/* Mini Map */}
        <div className="overflow-hidden rounded-xl border border-(--border-color) bg-(--surface) xl:col-span-2">
          <div className="p-5">
            <SectionHeader
              title="Fire Activity Map"
              description="Geographical overview of satellite fire detections."
              action={
                <Link
                  to="/map"
                  className="flex items-center gap-1 text-xs font-medium text-orange-500 hover:text-orange-400"
                >
                  Explore Map
                  <ArrowUpRight size={15} />
                </Link>
              }
            />
          </div>

          <div className="relative flex min-h-72 items-center justify-center overflow-hidden border-t border-(--border-color) bg-(--surface-secondary)">
            <div className="absolute inset-0 opacity-30">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)",
                  backgroundSize: "35px 35px",
                }}
              />
            </div>

            <div className="relative flex max-w-sm flex-col items-center px-5 text-center">
              <div className="mb-4 rounded-2xl border border-(--border-color) bg-(--surface) p-4">
                <MapPinned size={30} className="text-orange-500" />
              </div>

              <h4 className="text-sm font-semibold">Interactive Fire Map</h4>

              <p className="mt-2 text-xs leading-5 text-(--text-secondary)">
                The geographic visualization will be available after connecting
                the satellite hotspot data.
              </p>
            </div>
          </div>
        </div>

        {/* Activity Status */}
        <div className="rounded-xl border border-(--border-color) bg-(--surface) p-5">
          <SectionHeader
            title="Current Activity"
            description="Current activity vs historical baseline."
          />

          <EmptyState
            icon={Activity}
            title="No activity data yet"
            description="Historical comparisons will appear here once harmonized data is available."
          />
        </div>
      </section>

      {/* Bottom Sections */}
      <section className="grid gap-5 xl:grid-cols-2">
        {/* Recent Alerts */}
        <div className="rounded-xl border border-(--border-color) bg-(--surface) p-5">
          <SectionHeader
            title="Recent Alerts"
            description="Important activity anomalies and notifications."
          />

          <EmptyState
            icon={AlertTriangle}
            title="No alerts available"
            description="Alerts will be displayed here when verified anomaly data becomes available."
          />
        </div>

        {/* Data Sources */}
        <div className="rounded-xl border border-(--border-color) bg-(--surface) p-5">
          <SectionHeader
            title="Data Sources"
            description="Satellite data source integration status."
          />

          <div className="space-y-3">
            <DataSourceCard
              name="MODIS"
              satellite="Terra / Aqua"
              description="Active fire observations"
            />

            <DataSourceCard
              name="VIIRS"
              satellite="Suomi-NPP / NOAA-20 / NOAA-21"
              description="Active fire observations"
            />
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-lg bg-(--surface-secondary) p-3">
            <Database
              size={16}
              className="mt-0.5 shrink-0 text-(--text-secondary)"
            />

            <p className="text-xs leading-5 text-(--text-secondary)">
              Source availability and last update timestamps will be provided by
              the backend.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
