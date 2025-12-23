// Target location (set this to the place you want)
const TARGET = { lat: 43.393407, lon: 16.281887 }; // example (Split)
/* const TARGET = { lat: 43.508133, lon: 17.440193 }; */ // DUMP location

// Validation radius in meters
const RADIUS_M = 250;

type Coordinates = {
  lat: number;
  lon: number;
};

// Haversine distance in meters
export function distanceMeters(a: Coordinates, b: Coordinates): number {
  const R = 6371000; // Earth radius (m)
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);

  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);

  const h =
    sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;

  return 2 * R * Math.asin(Math.sqrt(h));
}

export function validateWithinRadius(userCoords: GeolocationCoordinates) {
  const user: Coordinates = {
    lat: userCoords.latitude,
    lon: userCoords.longitude,
  };
  const dist = distanceMeters(user, TARGET);

  return {
    ok: dist <= RADIUS_M,
    distanceMeters: dist,
    accuracyMeters: userCoords.accuracy, // reported by device
  };
}
