import { ICSVReader } from '../../types/components';
import { IParcelFashionCheckpoint, IParcelFashionTracking } from '../../types/parcel-fashion/csv';
import { readCsv } from '../../utils/read-csv';
import { IGroupedTracking, ITracking, ITrackingCheckpoint } from '../../types/models';
import { randomUUID } from 'crypto';
import { logger } from '../../utils/logger';

const CSV_HEADERS_TRACKING = [
  'orderNo',
  'tracking_number',
  'courier',
  'street',
  'zip_code',
  'city',
  'destination_country_iso3',
  'email',
  'articleNo',
  'articleImageUrl',
  'quantity',
  'product_name',
];

const CSV_HEADERS_CHECKPOINT = ['tracking_number', 'location', 'timestamp', 'status', 'status_text', 'status_detail'];

export class ParcelFashionCSVReader implements ICSVReader {
  async readCSV(params: { trackingContent: Buffer; checkpointsContent: Buffer }): Promise<IGroupedTracking[]> {
    const readTracking: IParcelFashionTracking[] = await readCsv(CSV_HEADERS_TRACKING, params.trackingContent);
    const readCheckpoints: IParcelFashionCheckpoint[] = await readCsv(
      CSV_HEADERS_CHECKPOINT,
      params.checkpointsContent,
    );

    const groupedTracking = this.groupTracking(readTracking);
    const groupedCheckpoints = this.groupCheckpointsByTracking(readCheckpoints, groupedTracking);

    return Object.values(groupedTracking).map((tracking) => ({
      tracking,
      checkpoints: groupedCheckpoints[tracking.tracking_number],
    }));
  }

  private groupCheckpointsByTracking(
    readCheckpoints: IParcelFashionCheckpoint[],
    groupedTracking: Record<string, ITracking>,
  ) {
    return readCheckpoints.reduce(
      (map, detail) => {
        const tracking = groupedTracking[detail.tracking_number];

        if (!tracking) {
          logger.warn('Missing tracking, skipping', detail.tracking_number);
        } else {
          const checkpoint = this.convertTrackingCheckPoint(detail, tracking.id);
          map[detail.tracking_number] = map[detail.tracking_number] || [];
          map[detail.tracking_number].push(checkpoint);
        }

        return map;
      },
      {} as Record<string, ITrackingCheckpoint[]>,
    );
  }

  private groupTracking(tracking: IParcelFashionTracking[]): Record<string, ITracking> {
    return tracking.reduce(
      (map, item) => {
        const data = this.convertTrackingToModel(item);
        if (map[item.tracking_number]) {
          map[item.tracking_number].articles.push(...data.articles);
        } else {
          map[item.tracking_number] = data;
        }

        return map;
      },
      {} as Record<string, ITracking>,
    );
  }

  private convertTrackingCheckPoint(
    checkpoint: IParcelFashionCheckpoint,
    trackingInternalId: string,
  ): ITrackingCheckpoint {
    return {
      tracking_internal_id: trackingInternalId,
      id: randomUUID(),
      location: checkpoint.location,
      status: checkpoint.status, // TODO: Proper mapping
      status_detail: checkpoint.status_detail,
      status_text: checkpoint.status_text,
      tracking_number: checkpoint.tracking_number,
      timestamp: checkpoint.timestamp,
    };
  }

  private convertTrackingToModel(tracking: IParcelFashionTracking): ITracking {
    const productQuantity = parseInt(tracking.quantity);

    return {
      courier: tracking.courier,
      tracking_number: tracking.tracking_number,
      external_id: tracking.orderNo,
      destination: {
        city: tracking.city,
        country_iso: tracking.destination_country_iso3,
        street: tracking.street,
        zip_code: tracking.zip_code,
      },
      id: randomUUID(),
      receiver_email: tracking.email,
      articles: [
        {
          external_id: tracking.articleNo,
          image_url: tracking.articleImageUrl,
          name: tracking.product_name,
          quantity: isNaN(productQuantity) ? 0 : productQuantity,
        },
      ],
    };
  }
}
