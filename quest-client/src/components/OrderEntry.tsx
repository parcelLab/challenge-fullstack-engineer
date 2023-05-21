interface OrderEntryProps {
	label: string;
	value: string;
}
export const OrderEntry = ({ label, value }: OrderEntryProps) => (
	<li>
		<h6>{label}</h6>
		<strong>{value}</strong>
	</li>
);
