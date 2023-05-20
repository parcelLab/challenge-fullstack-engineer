import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
	title: string;
}

export const Card = ({ children, title }: Props) => (
	<div className="w-96 p-8 border-4 border-slate-800 rounded-lg bg-blue-100">
		<h1 className="text-center text-2xl mb-6">{title}</h1>
		{children}
	</div>
);
