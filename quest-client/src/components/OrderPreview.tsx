import { Order, OrderArticle, OrderWithArticles } from "../apiTypes";
import { Link } from "react-router-dom";
import { OrderEntry } from "./OrderEntry";

interface ArticlesProps {
	articles: OrderArticle[];
}

const Articles = ({ articles }: ArticlesProps) => (
	<div className="pt-2 border-t-2">
		<h4 className="font-bold mb-2 text-lg">Articles</h4>
		<ul>
			{articles.map(
				({
					articleImageUrl,
					articleNumber,
					product_name,
					quantity,
				}) => (
					<li key={articleNumber} className="mb-2 flex items-center">
						<img
							className="w-8 mr-4"
							src={articleImageUrl}
							alt={product_name}
						/>
						<span className="bg-green-600 text-white px-2 mr-4 rounded-xl">
							{quantity}
						</span>
						<span className="font-bold">{product_name}</span>
					</li>
				)
			)}
		</ul>
	</div>
);

interface Props {
	order: OrderWithArticles;
}

export const OrderPreview = ({
	order: { order_number, courier, articles, street, zip_code, city },
}: Props) => (
	<Link to={`/order/${order_number}`}>
		<div className="bg-white border-2 border-black mb-3 p-4 rounded-2xl hover:bg-slate-100">
			<ul className="grid gap-4 grid-cols-2 mb-2">
				<OrderEntry label="Order Number" value={order_number} />
				<OrderEntry label="Courier" value={courier} />
				<OrderEntry
					label="Delivery Address"
					value={`${street}\n${zip_code} ${city}`}
				/>
			</ul>
			{articles.length && articles[0].articleNumber ? (
				<Articles articles={articles} />
			) : null}
		</div>
	</Link>
);
