import {ITracking} from './services/api';

export function formatAddress(address: ITracking['destination']): string {
	return [address.street, address.city, address.zip_code, address.country_iso].join(', ');
}

export function addDetail(title: string, value: string, additionalInfo?: string) {
	return <div className="order-info">
		<p className="order-info-title">{title}</p>
		<p className="order-info-value">{value}</p>
		{!additionalInfo ? null :
			<p className="order-info-addional">{additionalInfo}</p>}
	</div>
}
