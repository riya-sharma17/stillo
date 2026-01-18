import { ILocation } from "../interfaces/location.interface";
interface DistanceResult {
    distanceKm: number;
    estimatedTimeMin: number;
    confidence: "approx";
}
export declare const calculateDistanceAndETA: (from: ILocation, to: ILocation) => DistanceResult;
export {};
//# sourceMappingURL=distance.d.ts.map