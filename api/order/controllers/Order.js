"use strict";

const stripe = require("stripe")(
  "sk_test_51Gs2kUC4lyU9z1hG6EYNvqq4tb0b1LDt9q33R9bMUPJJ0PwAKPn5RFGTNlJer0J6bLjiKBRdM4xe6a8pqsx05GHe00mGyxOfSR"
);

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async (ctx) => {
    const { name, total, items, stripeTokenId } = ctx.request.body;
    const { id } = ctx.state.user;

    const charge = await stripe.charges.create({
      amount: Math.round(total * 100),
      currency: "usd",
      source: stripeTokenId,
      description: `Order ${new Date()} by ${ctx.state.user.username}`,
    });
    const order = await strapi.services.order.create({
      name,
      total,
      items,
      user: id,
    });
    return order;
  },
};
