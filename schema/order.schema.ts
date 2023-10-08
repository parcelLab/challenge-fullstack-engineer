
const Joi = require('@hapi/joi');

const articleSchema = Joi.object({
    articleNo: Joi.string().allow(null),
    articleImageUrl: Joi.string().allow(null).uri(),
    quantity: Joi.string().allow(null),
    product_name: Joi.string().allow(null)
});

const latestTrackingSchema = Joi.object({
    tracking_number: Joi.string().required(),
    location: Joi.string().allow('').required(),
    timestamp: Joi.date().required(),
    status: Joi.string().required(),
    status_text: Joi.string().required(),
    status_details: Joi.string().required()
});

const orderSchema = Joi.object({
    orderNo: Joi.string().required(),
    tracking_number: Joi.string().required(),
    courier: Joi.string().required(),
    street: Joi.string().required(),
    zip_code: Joi.string().required(),
    city: Joi.string().required(),
    destination_country_iso3: Joi.string().required(),
    email: Joi.string().email().required(),
    articles: Joi.array().items(articleSchema).required(),
    latestTracking: latestTrackingSchema.required()
});

export const responseSchema = Joi.object({
    error: Joi.boolean().required(),
    data: Joi.object().pattern(
        Joi.string(),
        orderSchema
    ).required(),
    message: Joi.string().allow(null).required()
});
