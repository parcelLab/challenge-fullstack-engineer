import {useLoaderData} from 'react-router-dom';
import {IArticle, IGroupedTracking} from '../services/api';
import {addDetail, formatAddress} from '../utils';

export function DetailedTracking() {
	const {data} = useLoaderData() as { data: IGroupedTracking };
	const currentCheckpoint = data.checkpoints[data.checkpoints.length - 1];


	function renderArticle(article: IArticle) {
		return <div className="row  tracking-detail-order-article" key={article.external_id}>
			<div className="col-sm-2 quantity">x{article.quantity}</div>
			<div className="col-sm-2"><img className="image" src={article.image_url}/></div>
			<div className="col-sm-6 detail">
				<p>{article.name}</p>
				<p>{article.external_id}</p>
			</div>
		</div>
	}

	return (<div className="container col-sm-4 shadow-container tracking-detail">
		<section className="order-info">
			{addDetail('Order Number', data.tracking.external_id)}
			{addDetail('Delivery Address', formatAddress(data.tracking.destination))}
		</section>
		<section className="shadow-container tracking-detail-order-checkpoint">
			{addDetail('Tracking Number', data.tracking.tracking_number)}
			{addDetail('Current status', currentCheckpoint.status, currentCheckpoint.status_detail)}
		</section>
		<section className="shadow-container tracking-detail-order-articles">
			<p>Articles</p>
			<div>
				{ data.tracking.articles.map(a => renderArticle(a))}
			</div>
		</section>

	</div>)
}
