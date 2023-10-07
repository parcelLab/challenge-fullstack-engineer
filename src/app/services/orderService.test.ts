import sinon from 'sinon';
import { expect } from 'chai';
import { DataParser } from '../common/parser/dataParser';
import { Order } from '../types/order.types';
import { Tracking } from '../types/tracking.tyoes';
import { fetchOrdersByEmail, groupByOrderId } from './orderService';


describe('fetchOrdersByEmail', () => {
    let parser: DataParser;
    let mockOrders: Order[];
    let mockTrackings: Tracking[];

    mockOrders = [
        {
            orderNo: "ORD-123-2018",
            tracking_number: "00340000161200000001",
            courier: "DHL",
            street: "Landwehrstr. 39",
            zip_code: "80336",
            city: "München",
            destination_country_iso3: "DEU",
            email: "test@email.com",
            articleNo: "A-B2-U",
            articleImageUrl: "http://cdn.parcellab.com/img/sales-cannon/parcellab-bag.jpg",
            quantity: "1",
            product_name: "parcelLab Tote Bag"
        },
        {
            orderNo: "ORD-789-2018",
            tracking_number: "00340000161200000002",
            courier: "DHL",
            street: "Another street",
            zip_code: "12345",
            city: "Berlin",
            destination_country_iso3: "DEU",
            email: "test@email.com",
            articleNo: "A-C3-M",
            articleImageUrl: "http://cdn.parcellab.com/img/sales-cannon/parcellab-shirt.jpg",
            quantity: "2",
            product_name: "parcelLab Shirt"
        }
    ];

    mockTrackings = [
        {
            tracking_number: "00340000161200000001",
            location: "München",
            timestamp: "2022-09-20T15:00:00.000Z",
            status: "OrderProcessed",
            status_text: "Order processed",
            status_details: "The order has been processed."
        },
        {
            tracking_number: "00340000161200000001",
            location: "München",
            timestamp: "2022-09-21T15:00:00.000Z",
            status: "Dispatched",
            status_text: "Dispatched from München",
            status_details: "The order has been dispatched."
        },
        {
            tracking_number: "00340000161200000002",
            location: "Berlin",
            timestamp: "2022-09-22T10:00:00.000Z",
            status: "OrderProcessed",
            status_text: "Order processed",
            status_details: "The order has been processed in Berlin."
        }
    ];

    beforeEach(() => {
        parser = {
            parse: sinon.stub()
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return orders with the latest tracking for a given email', async () => {

        (parser.parse as sinon.SinonStub).onFirstCall().resolves(mockOrders);
        (parser.parse as sinon.SinonStub).onSecondCall().resolves(mockTrackings);

        const result = await fetchOrdersByEmail('test@email.com', parser);
        expect(result).to.be.an('array');
        expect(result[0]).to.have.property('latestTracking');
        expect(result[0].latestTracking).to.be.deep.eq({
            tracking_number: '00340000161200000001',
            location: 'München',
            timestamp: '2022-09-21T15:00:00.000Z',
            status: 'Dispatched',
            status_text: 'Dispatched from München',
            status_details: 'The order has been dispatched.'
        })

    });

    it('should handle no orders for a given email', async () => {

        (parser.parse as sinon.SinonStub).onFirstCall().resolves(mockOrders);
        (parser.parse as sinon.SinonStub).onSecondCall().resolves(mockTrackings);

        const result = await fetchOrdersByEmail('test1@email.com', parser);
        expect(result).to.be.an('array').that.is.empty;
    });

    it('should group by order with same order it', async () => {
        const mockOrders = [
            {
                orderNo: "ORD-123-2018",
                tracking_number: "00340000161200000001",
                courier: "DHL",
                street: "Landwehrstr. 39",
                zip_code: "80336",
                city: "München",
                destination_country_iso3: "DEU",
                email: "test@email.com",
                articleNo: "A-B2-U",
                articleImageUrl: "http://cdn.parcellab.com/img/sales-cannon/parcellab-bag.jpg",
                quantity: "1",
                product_name: "parcelLab Tote Bag",
                latestTracking: {
                    tracking_number: "00340000161200000001",
                    location: "München",
                    timestamp: "2022-09-20T15:00:00.000Z",
                    status: "OrderProcessed",
                    status_text: "Order processed",
                    status_details: "The order has been processed."
                },
            },
            {
                orderNo: "ORD-123-2018",
                tracking_number: "00340000161200000001",
                courier: "DHL",
                street: "Landwehrstr. 39",
                zip_code: "80336",
                city: "München",
                destination_country_iso3: "DEU",
                email: "test@email.com",
                articleNo: "A-B3-U",
                articleImageUrl: "http://cdn.parcellab.com/img/sales-cannon/parcellab-bag3.jpg",
                quantity: "3",
                product_name: "parcelLab Tote Bag 3",
                latestTracking: {
                    tracking_number: "00340000161200000001",
                    location: "München",
                    timestamp: "2022-09-20T15:00:00.000Z",
                    status: "OrderProcessed",
                    status_text: "Order processed",
                    status_details: "The order has been processed."
                },
            },
        ];

        const result = await groupByOrderId(mockOrders);
        expect(result).deep.eq({
            'ORD-123-2018': {
                orderNo: 'ORD-123-2018',
                tracking_number: '00340000161200000001',
                courier: 'DHL',
                street: 'Landwehrstr. 39',
                zip_code: '80336',
                city: 'München',
                destination_country_iso3: 'DEU',
                email: 'test@email.com',
                articles: [{
                    articleNo: "A-B2-U",
                    articleImageUrl: "http://cdn.parcellab.com/img/sales-cannon/parcellab-bag.jpg",
                    quantity: "1",
                    product_name: "parcelLab Tote Bag"
                }, {
                    articleNo: "A-B3-U",
                    articleImageUrl: "http://cdn.parcellab.com/img/sales-cannon/parcellab-bag3.jpg",
                    quantity: "3",
                    product_name: "parcelLab Tote Bag 3"
                }],
                latestTracking: {
                    tracking_number: '00340000161200000001',
                    location: 'München',
                    timestamp: '2022-09-20T15:00:00.000Z',
                    status: 'OrderProcessed',
                    status_text: 'Order processed',
                    status_details: 'The order has been processed.'
                }
            }
        })
    });


});
