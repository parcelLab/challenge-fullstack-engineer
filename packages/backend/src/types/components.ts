import { IGroupedTracking } from "./models";
import * as Buffer from "buffer";

export interface ICSVReader {
  readCSV(params: {
    trackingContent: Buffer;
    checkpointsContent: Buffer;
  }): Promise<IGroupedTracking[]>;
}

export interface ITrackingFilterOptions {
  id?: string[];
  email?: string[];
}

export interface ITrackingRepository {
  save(trackings: IGroupedTracking[]): Promise<IGroupedTracking[]>;
  getTracking(filters: ITrackingFilterOptions): Promise<IGroupedTracking[]>;
}
