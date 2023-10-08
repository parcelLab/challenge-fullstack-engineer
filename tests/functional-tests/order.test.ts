import { expect } from "chai";
import { responseSchema } from "../../schema/order.schema";

const axios = require('axios');

describe('Orders API', () => {

    describe('GET /api/orders/:email', () => {

        it('should return orders for a given email', async () => {
            const response = await axios.get('http://localhost:3000/api/orders/julian@parcellab.com');

            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('object');

            const validataionResult = responseSchema.validate(response.data);
            expect(validataionResult.error).to.be.undefined;

        });

        it('should return an error for an invalid email format', async () => {
            try {
                await axios.get('http://localhost:3000/api/orders/invalidEmail');

            } catch (error: any) {
                expect(error.response.status).to.eq(400);
                expect(error.response.data.message).to.eq('Invalid Email Address');
            }

        });

        it('should return an error if no orders are found for the email', async () => {
            try {
                await axios.get('http://localhost:3000/api/orders/nodata@example.com');
            } catch (error: any) {
                expect(error.response.status).to.equal(404);
                expect(error.response.data.message).to.equal('No orders found for the provided email.');
            }
        });
    });
});
