import { useCallback, useEffect, useMemo, useState } from 'react';
import { validateWithinRadius } from '@/validation/validateGeolocation';
import { VALIDATION_RADIUS_M } from '@/constants/geolocation';

type GeoResult = {
  isOk: boolean;
  distanceMeters: number;
  accuracyMeters: number | null;
};

export function useGeoValidation(options?: {
  accuracyLimitMeters?: number;
  geolocationOptions?: PositionOptions;
}) {
  const accuracyLimit = options?.accuracyLimitMeters ?? VALIDATION_RADIUS_M;
  const geoOptions = useMemo(
    () =>
      options?.geolocationOptions ?? {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    [options?.geolocationOptions],
  );

  const [isOk, setIsOk] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeoResult | null>(null);

  const validate = useCallback(() => {
    setError(null);

    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      setIsOk(false);
      setError('Geolocation is not available in this environment.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const accuracy = pos.coords.accuracy ?? null;

        // Reject low-accuracy fixes first
        if (!accuracy || accuracy > accuracyLimit) {
          const msg = `Location accuracy too low (${accuracy ? Math.round(accuracy) : '?'}m).`;
          setIsOk(false);
          setError(msg);
          setResult(
            !accuracy
              ? null
              : { isOk: false, distanceMeters: NaN, accuracyMeters: accuracy },
          );
          return;
        }

        const { isOk, distanceMeters } = validateWithinRadius(pos.coords);

        const payload: GeoResult = {
          isOk,
          distanceMeters,
          accuracyMeters: accuracy,
        };

        setResult(payload);
        setIsOk(isOk);
        console.log('Geo validation result:', payload);
      },
      (err) => {
        setIsOk(false);
        setError(err.message);
      },
      geoOptions,
    );
  }, [accuracyLimit, geoOptions]);

  // Run validation once on mount
  useEffect(() => {
    validate();
  }, [validate]);

  return { validate, isOk, error, result };
}
