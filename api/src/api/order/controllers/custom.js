'use strict';

const stripe = require('stripe')(process.env.STRIPE_KEY);

module.exports = {
  // called by POST /api/store
  async store(ctx, next) {
    // check so luong san pham con hang
    // check dieu kien khac ve san pham

    // luu database dung transaction
    // commit thanh cong xu ly call stripe thanh toan

    // bat dau trasaction TODO: add transaction

    // luu database chua commit
    // xu ly call thanh toan

    const body = ctx.request.body;

    const { name, email, phone_number, address } = body

    const cart = await strapi.entityService.findOne('api::cart.cart', 1, {
      populate: {
        cart_items: true,
        repeatableComponent: {
          populate: {
            product: true,
          },
        }
      }
    });

    let amount = 0;
    cart.cart_items.forEach(element => {
      return amount += element.quantity * element.price
    });

    const order = await strapi.entityService.create('api::order.order', {
      data: {
        name,
        email,
        phone_number,
        address,
        amount,
        dishes: cart
      }
    })

    const res = await stripe.charges.create({
      amount: amount,
      currency: 'JPY',
      description: `Order ${new Date()} by ${name}`,
      source: body.token
    });

    // neu thanh toan thanh cong thi commit
    // neu thanh loi thi rollback

    ctx.body = order;
  },
};
