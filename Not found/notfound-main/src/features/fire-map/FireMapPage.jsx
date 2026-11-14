
import { useState } from "react";
import {
  Globe2,
  MousePointer2,
  MapPin,
  Layers3,
  X,
} from "lucide-react";

import EarthGlobe from "./components/EarthGlobe";

export default function FireMapPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-orange-500">
            <Globe2 size={20} />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Satellite Fire Intelligence
            </span>
          </div>

          <h1 className="text-2xl font-bold text-(--text-primary)">
            3D Fire Map
          </h1>

          <p className="mt-1 text-sm text-(--text-secondary)">
            Explore Earth and select geographic locations.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-(--border-color) bg-(--surface) px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-xs font-medium text-(--text-secondary)">
            Data Integration Pending
          </span>
        </div>
      </div>

      {/* Information Banner */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
        <Globe2
          size={20}
          className="mt-0.5 shrink-0 text-blue-500"
        />

        <div>
          <h3 className="text-sm font-semibold text-(--text-primary)">
            Interactive Earth Visualization
          </h3>

          <p className="mt-1 text-sm text-(--text-secondary)">
            Rotate, zoom, and select locations on the globe.
            MODIS and VIIRS satellite fire layers will be
            integrated after the backend data is validated.
          </p>
        </div>
      </div>

      {/* Globe Section */}
      <div className="overflow-hidden rounded-2xl border border-(--border-color) bg-[#050b16] shadow-xl">

        {/* Globe Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2 text-white">
            <Layers3 size={18} className="text-orange-400" />

            <h2 className="text-sm font-semibold">
              Earth Explorer
            </h2>
          </div>

          <span className="text-xs text-slate-400">
            3D Interactive Globe
          </span>
        </div>

        {/* Globe Container */}
        <div className="relative h-155 w-full">

          <EarthGlobe
            onLocationSelect={setSelectedLocation}
          />

          {/* Selected Location Panel */}
          {selectedLocation && (
            <div className="absolute bottom-5 left-5 z-20 w-64 rounded-xl border border-white/10 bg-[#101827]/95 p-4 text-white shadow-xl backdrop-blur-md">

              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin
                    size={17}
                    className="text-orange-400"
                  />

                  <h3 className="text-sm font-semibold">
                    Selected Location
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedLocation(null)}
                  className="rounded-md p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Clear selected location"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="space-y-3">

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Latitude
                  </span>

                  <span className="font-mono text-sm font-medium">
                    {selectedLocation.latitude}°
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Longitude
                  </span>

                  <span className="font-mono text-sm font-medium">
                    {selectedLocation.longitude}°
                  </span>
                </div>

              </div>

              <div className="mt-4 border-t border-white/10 pt-3">
                <p className="text-xs leading-relaxed text-slate-400">
                  Click another point on Earth to select a
                  different geographic location.
                </p>
              </div>

            </div>
          )}

          {/* Interaction Guide */}
          <div className="absolute bottom-5 right-5 z-10 space-y-2 rounded-xl border border-white/10 bg-[#101827]/90 p-3 text-xs text-slate-300 backdrop-blur-md">

            <div className="flex items-center gap-2">
              <MousePointer2 size={14} className="text-orange-400" />
              <span>Click to select location</span>
            </div>

            <div className="flex items-center gap-2">
              <Globe2 size={14} className="text-orange-400" />
              <span>Drag to rotate</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-orange-400">↕</span>
              <span>Scroll to zoom</span>
            </div>

          </div>

        </div>

        {/* Globe Footer */}
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
          <span className="text-xs text-slate-400">
            Earth Visualization
          </span>

          <span className="flex items-center gap-2 text-xs text-amber-500">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Satellite Layers: Pending
          </span>
        </div>

      </div>

    </div>
  );
}
