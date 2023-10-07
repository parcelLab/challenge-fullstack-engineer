import { Request, Response } from "express";
import { CSVParser } from "../common/parser/csvParser";
import { validateEmail } from "../../utils/validator";
import { fetchOrdersByEmail, groupByOrderId } from "../services/orderService";
import _ from 'lodash';

export const getAllByEmail = async (request: Request, response: Response) => {
    try {
        const { email } = request.params;

        if (!validateEmail(email)) {
            return response.status(400).json({
                error: true,
                data: null,
                message: 'Invalid Email Address'
            });
        }
        const filteredOrders = await fetchOrdersByEmail(email, new CSVParser());

        let serializeData = {};
        if (filteredOrders) {
            serializeData = groupByOrderId(filteredOrders);
        }

        if (_.isEmpty(serializeData)) {
            return response.status(404).json({
                error: true,
                data: null,
                message: "No orders found for the provided email."
            });
        }

        response.json({
            error: false,
            data: serializeData,
            message: null
        });

    } catch (error) {
        console.error('Error fetching orders:', error);
        return response.status(500).json({
            error: true,
            data: null,
            message: 'Internal Server Error'
        });
    }
}
