import Vue from 'vue';
import {
  StripePlugin,
  StripeCheckout,
  StripeElementCard,
} from '@vue-stripe/vue-stripe';

export default defineNuxtPlugin(nuxtApp => {
    // Vue.component('StripeCheckout', StripeCheckout);
    // Vue.component('StripeElementCard', StripeElementCard);
    // Vue.use(StripePlugin, { pk: process.env.STRIPE_PK });
})
