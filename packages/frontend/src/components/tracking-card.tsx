import {IGroupedTracking, ITracking} from '../services/api';
import {addDetail, formatAddress} from '../utils';

export function TrackingCard(groupedTracking: IGroupedTracking) {
	const {tracking, checkpoints}  = groupedTracking;

	const currentCheckpoint = checkpoints[checkpoints.length -1];
	return <div className={"shadow-container tracking-card"}>
		<div className={"row"}>
			<div className="col-sm-6">
				{ addDetail('Order Number', tracking.external_id)}
			</div>
			<div className="col-sm-6">
				{ addDetail('Current Status', currentCheckpoint.status)}
			</div>
		</div>
		<div className={"row"}>
			<div className="col-sm-6">
				{ addDetail('Delivery address', formatAddress(tracking.destination))}
			</div>
		</div>
	</div>
}
