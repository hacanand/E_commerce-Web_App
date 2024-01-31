"use strict";

 

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//const express = require("express");
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async customOrderController(ctx) {
    try {
      const bodyData = ctx.body;
      const entities = await strapi.entityService.findMany(
        "api::product.product",
        {
          fields: ["price"],
          limit: 2,
        }
      );
      return { data: entities };
    } catch (err) {
      return { error: err.message };
    }
  },

  async create(ctx) {
    try {
      const { products } = ctx.request.body;

      const lineItems = await Promise.all(products.map(async (product) => {
        const productEntity = await strapi.entityService.findMany(
          "api::product.product",
          {
            filters: {
              key: product.key,
            },
          }
        );
        const realProduct = productEntity[0];
        return {
          price_data: {
            currency: "INR",
            product_data: {
              name: realProduct.title,
              images: [product.image],
            },
            unit_amount: realProduct.price * 100,
          },
          quantity: product.quantity,
        };
      }));
      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
          allowed_countries: ["IN" ],
        },
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_BASE_URL}/payment/success`,
        cancel_url: `${process.env.CLIENT_BASE_URL}/payment/failure`,
      });
      await strapi.entityService.create("api::order.order", {
        data: {
          products,
          stripeId: session.id,
        },
      });
      return { stripeId: session.id };
    } catch (err) {
      return { error: err.message };
    }
  },
}));
