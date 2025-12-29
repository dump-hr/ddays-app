import { useCallback, useEffect, useMemo, useState } from 'react';
import { validateWithinRadius } from '@/validation/validateGeolocation';
import { VALIDATION_RADIUS_M } from '@/constants/geolocation';

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

  const validateGeolocation = useCallback(() => {
    setError(null);

    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      setIsOk(false);
      setError('Geolokacija nije uključena ili je nedostupna.');
      return;
    }

    void navigator.geolocation.getCurrentPosition(
      (pos) => {
        const accuracy = pos.coords.accuracy ?? null;

        // Reject low-accuracy fixes first
        if (!accuracy || accuracy > accuracyLimit) {
          setIsOk(false);
          setError('Preciznost lokacije je preniska.');
          return;
        }

        const result = validateWithinRadius(pos.coords);
        // for debugging:
        // console.log('Geolocation validation result:', result);
        setIsOk(result.isOk);
        if (!result.isOk) {
          setError('Izvan ste dozvoljene lokacije.');
        }
      },
      () => {
        setIsOk(false);
        setError(`Greška pri dohvaćanju lokacije. Pokušajte ponovno.`);
      },
      geoOptions,
    );
  }, [accuracyLimit, geoOptions]);

  // Run validation once on mount
  useEffect(() => {
    validateGeolocation();
  }, [validateGeolocation]);

  return { validateGeolocation, isOk, error };
}
