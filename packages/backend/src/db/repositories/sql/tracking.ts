import { ITrackingFilterOptions, ITrackingRepository } from '../../../types/components';
import { IGroupedTracking, ITracking, ITrackingCheckpoint } from '../../../types/models';
import { Knex } from 'knex';

export class SQLTRackingRepository implements ITrackingRepository {
  constructor(private readonly psqlConnection: Knex) {}

  private async findTrackingCheckpoints(trackingIds: string[]): Promise<Record<string, ITrackingCheckpoint[]>> {
    const checkpoints: ITrackingCheckpoint[] = await this.psqlConnection('tracking_checkpoints')
      .whereIn('tracking_internal_id', trackingIds)
      .orderBy('timestamp')
      .select();

    return checkpoints.reduce(
      (map, checkpoint) => {
        map[checkpoint.tracking_internal_id] = map[checkpoint.tracking_internal_id] ?? [];
        map[checkpoint.tracking_internal_id].push(checkpoint);
        return map;
      },
      {} as Record<string, ITrackingCheckpoint[]>,
    );
  }

  async getTracking(filters: ITrackingFilterOptions): Promise<IGroupedTracking[]> {
    const query = this.psqlConnection<ITracking>('trackings');

    if (filters.email?.length > 0) {
      query.whereIn('receiver_email', filters.email);
    } else if (filters.id) {
      query.whereIn('id', filters.id);
    }

    const trackings: ITracking[] = await query.select();
    const checkPoints = await this.findTrackingCheckpoints(trackings.map((t) => t.id));

    return trackings.map((t) => ({
      tracking: t,
      checkpoints: checkPoints[t.id],
    }));
  }

  async save(groupedTrackings: IGroupedTracking[]): Promise<IGroupedTracking[]> {
    const transactionClient = await this.psqlConnection.transaction();

    await transactionClient('trackings').insert(groupedTrackings.map((t) => t.tracking));

    const allCheckPoints = groupedTrackings.reduce((reduced, t) => {
      reduced.push(...t.checkpoints);
      return reduced;
    }, [] as ITrackingCheckpoint[]);

    await transactionClient('tracking_checkpoints').insert(allCheckPoints);

    await transactionClient.commit();

    return groupedTrackings;
  }
}
