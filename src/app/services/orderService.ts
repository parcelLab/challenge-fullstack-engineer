import { DATA_PATHS } from "../common/parser/csv.constatnt";
import { DataParser } from "../common/parser/dataParser";
import { Order } from "../types/order.types";
import { Tracking } from "../types/tracking.tyoes";


export const getLatestTrackings = (trackings: Tracking[]): Record<string, Tracking> => {
    const latestTrackingByTrackingNumber: Record<string, Tracking> = {};

    trackings.forEach(tracking => {
        if (!latestTrackingByTrackingNumber[tracking.tracking_number] ||
            new Date(latestTrackingByTrackingNumber[tracking.tracking_number].timestamp) < new Date(tracking.timestamp)) {
            latestTrackingByTrackingNumber[tracking.tracking_number] = tracking;
        }
    });

    return latestTrackingByTrackingNumber;
}

export const fetchOrdersByEmail = async (email: string, parser: DataParser): Promise<Order[]> => {
    try {
        const orders: Order[] = await parser.parse(DATA_PATHS.TRACKINGS);
        const trackings: Tracking[] = await parser.parse(DATA_PATHS.CHECKPOINT);

        const latestTrackingByTrackingNumber = getLatestTrackings(trackings);

        return orders
            .filter(order => order.email === email)
            .map(order => {
                return {
                    ...order,
                    latestTracking: latestTrackingByTrackingNumber[order.tracking_number]
                }
            })
    }
    catch (error) {
        console.error("Error fetching orders by email:", error);
        throw new Error("Failed to fetch orders by email");
    }

};


export const groupByOrderId = (data: Order[]) => {
    return data.reduce((acc: { [key: string]: any }, current) => {
        if (acc[current.orderNo]) {
            acc[current.orderNo].articles.push({
                articleNo: current.articleNo,
                articleImageUrl: current.articleImageUrl,
                quantity: current.quantity,
                product_name: current.product_name,
            });
        } else {
            acc[current.orderNo] = {
                orderNo: current.orderNo,
                tracking_number: current.tracking_number,
                courier: current.courier,
                street: current.street,
                zip_code: current.zip_code,
                city: current.city,
                destination_country_iso3: current.destination_country_iso3,
                email: current.email,
                articles: [
                    {
                        articleNo: current.articleNo || null,
                        articleImageUrl: current.articleImageUrl || null,
                        quantity: current.quantity || null,
                        product_name: current.product_name || null,
                    },
                ],
                latestTracking: current.latestTracking,
            };
        }
        return acc;
    }, {});
}