import { Checkpoint } from "../apiTypes";

interface Props {
	checkpoints: Checkpoint[];
}

export const CheckpointTimeline = ({ checkpoints }: Props) => (
	<ul className="border-l-4 border-blue-400 pl-2">
		{checkpoints.map((checkpoint) => {
			const date = new Date(checkpoint.timestamp);
			const options: Intl.DateTimeFormatOptions = {
				hour: "numeric",
				minute: "numeric",
				month: "short",
				day: "numeric",
			};
			const formattedDate = new Intl.DateTimeFormat(
				"en-US",
				options
			).format(date);

			return (
				<li className="flex justify-between items-center">
					<span>{formattedDate}</span>
					<span className="font-bold">{checkpoint.status}</span>
				</li>
			);
		})}
	</ul>
);
