import {
  TARGET_LAT,
  TARGET_LON,
  EARTH_RADIUS_M,
  VALIDATION_RADIUS_M,
} from '@/constants/geolocation';


type Coordinates = {
  lat: number;
  lon: number;
};

/* const TARGET_COORDS  = { lat: 43.393407, lon: 16.281887 }; */ // for testing, set to your location
const TARGET_COORDS: Coordinates = { lat: TARGET_LAT, lon: TARGET_LON }; 

// Haversine distance in meters
export function distanceMeters(a: Coordinates, b: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);

  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);

  const h =
    sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;

  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

export function validateWithinRadius(userCoords: GeolocationCoordinates) {
  const user: Coordinates = {
    lat: userCoords.latitude,
    lon: userCoords.longitude,
  };
  const dist = distanceMeters(user, TARGET_COORDS);

  return {
    isOk: dist <= VALIDATION_RADIUS_M,
    distanceMeters: dist,
    accuracyMeters: userCoords.accuracy, // reported by device
  };
}
