import { Tracking } from "./tracking.tyoes";

export type Order = {
    orderNo: string;
    tracking_number: string;
    courier: string;
    street: string;
    zip_code: string;
    city: string;
    destination_country_iso3: string;
    email: string;
    articleNo: string;
    articleImageUrl: string;
    quantity: string;
    product_name: string;
    latestTracking?: Tracking;
}
