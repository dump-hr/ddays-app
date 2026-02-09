import { useCallback, useEffect, useMemo, useState } from 'react';
import { validateWithinRadius } from '@/validation/validateGeolocation';
import { VALIDATION_RADIUS_M } from '@/constants/geolocation';
import { GeolocationErrorCodes } from '@ddays-app/types';

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

  const [isOk, setIsOk] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const geolocationErrorMessage = (geoError: GeolocationPositionError) => {
    let message = 'Greška pri dohvaćanju lokacije. Pokušajte ponovno.';

    switch (geoError?.code) {
      case GeolocationErrorCodes.PERMISSION_DENIED:
        message = 'Pristup lokaciji je odbijen. Provjerite dozvole za lokaciju.';
        break;
      case GeolocationErrorCodes.POSITION_UNAVAILABLE:
        message = 'Lokacija trenutno nije dostupna. Pokušajte ponovno kasnije.';
        break;
      case GeolocationErrorCodes.TIMEOUT:
        message = 'Vrijeme za dohvaćanje lokacije je isteklo. Pokušajte ponovno.';
        break;
      default:
        break;
    }
    return message;
  }

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
        if (!accuracy || accuracy >= accuracyLimit) {
          setIsOk(false);
          setError('Preciznost lokacije je preniska.');
          return;
        }

        const result = validateWithinRadius(pos.coords);
        setIsOk(result.isOk);

        if (!result.isOk) {
          setError('Izvan ste lokacije konferencije.');
        }
      },
      (geoError) => {
        setIsOk(false);
        const message = geolocationErrorMessage(geoError);
        setError(message);
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
