"""Column definitions for the two source products.

Nothing here is guessed: the sensor is detected from the actual header of the
file, and the required column list comes from the observed sample files
(``docs/dataset-facts.md`` §1). Official verification of each column's meaning
happens in Phase 03.
"""

from __future__ import annotations

from collections.abc import Sequence

#: Columns every supported detection file must contain.
COMMON_REQUIRED: tuple[str, ...] = (
    "latitude",
    "longitude",
    "scan",
    "track",
    "acq_date",
    "acq_time",
    "satellite",
    "instrument",
    "confidence",
    "version",
    "frp",
    "daynight",
    "type",
)

#: Sensor-specific brightness bands (primary = detection band).
SENSOR_BANDS: dict[str, dict[str, str]] = {
    "modis": {"primary": "brightness", "secondary": "bright_t31"},
    "viirs": {"primary": "bright_ti4", "secondary": "bright_ti5"},
}

SENSORS: tuple[str, ...] = ("modis", "viirs")

#: Unified observation columns, in physical storage order.
UNIFIED_COLUMNS: tuple[str, ...] = (
    "observation_id",
    "source_id",
    "source_row",
    "sensor",
    "platform",
    "lat",
    "lon",
    "datetime_utc",
    "frp_mw",
    "confidence_raw",
    "confidence_class",
    "brightness_primary",
    "brightness_secondary",
    "daynight",
    "fire_type",
    "scan",
    "track",
    "qc_flags",
    "raw_json",
)


def detected_sensor(columns: Sequence[str]) -> str | None:
    """Infer the sensor from the presence of its unique brightness band.

    Returns ``None`` when the header matches neither product, which is treated
    as an unsupported file rather than guessed.
    """
    normalized = {column.strip().lower() for column in columns}
    for sensor, bands in SENSOR_BANDS.items():
        if bands["primary"] in normalized:
            return sensor
    return None


def missing_columns(columns: Sequence[str], sensor: str) -> list[str]:
    """Return required columns absent from ``columns`` for ``sensor``."""
    if sensor not in SENSOR_BANDS:
        raise ValueError(f"Unsupported sensor: {sensor}")

    normalized = {column.strip().lower() for column in columns}
    required = COMMON_REQUIRED + tuple(SENSOR_BANDS[sensor].values())
    return [column for column in required if column not in normalized]
