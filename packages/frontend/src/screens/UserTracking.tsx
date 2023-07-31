import {useLoaderData, useNavigate} from 'react-router-dom';
import {IGroupedTracking} from '../services/api';
import {TrackingCard} from '../components/tracking-card';

export function UserTracking() {
	const {data}: {data: IGroupedTracking[]} = useLoaderData() as any;
	const navigate = useNavigate();

	function onOpenTracking(trackingId: string) {
		navigate(`/trackings/${trackingId}`);
	}

	return (<div className={"container col-sm-4 shadow-container user-tracking"}>
		<h1>Your orders</h1>
		<section className={"user-tracking-orders"}>
			{ data.map((g) =>
				<div onClick={() => onOpenTracking(g.tracking.id)} style={{"cursor": "pointer"}}>
					<TrackingCard tracking={g.tracking} checkpoints={g.checkpoints}></TrackingCard>
				</div>)
			}
		</section>
	</div>)
}
