import {ITracking, ITrackingCheckpoint} from './models';
import * as Buffer from 'buffer';

export interface ICSVReadResult {
	tracking: ITracking;
	checkpoints: ITrackingCheckpoint[];
}
export interface ICSVReader {
	readCSV(params: { trackingContent: Buffer, checkpointsContent: Buffer }): Promise<ICSVReadResult[]>;
}
