import { ILocation } from "../interfaces/location.interface";

interface DistanceResult {
  distanceKm: number;
  estimatedTimeMin: number;
  confidence: "approx";
}

/**
 * Haversine formula to calculate distance between two geo points
 */
const toRad = (value: number): number => {
  return (value * Math.PI) / 180;
};

export const calculateDistanceAndETA = (
  from: ILocation,
  to: ILocation
): DistanceResult => {
  const R = 6371; // Earth radius in KM

  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(from.lat)) *
      Math.cos(toRad(to.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = Number((R * c).toFixed(2));

  /**
   * ETA LOGIC (MVP)
   * avg speed = 15 km/h (city average)
   */
  const AVERAGE_SPEED_KMPH = 15;
  const estimatedTimeMin = Math.max(
    5,
    Math.ceil((distanceKm / AVERAGE_SPEED_KMPH) * 60)
  );

  return {
    distanceKm,
    estimatedTimeMin,
    confidence: "approx",
  };
};
