<template>
  <!-- wrapper -->
  <div class="message">
    <span class="text-green-700 mr-2">{{message}}</span>
  </div>
  <div class="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
    <div class="col-span-8 border border-gray-200 p-4 rounded">
      <h3 class="text-lg font-medium capitalize mb-4">Checkout</h3>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="first-name" class="text-gray-600">
              Name
              <span class="text-primary">*</span>
            </label>
            <input v-model="checkoutForm.name" type="text" name="name" id="first-name" class="input-box" />
          </div>
        </div>
        <div>
          <label for="region" class="text-gray-600">Address</label>
          <input v-model="checkoutForm.address" type="text" name="address" id="address" class="input-box" />
        </div>
        <div>
          <label for="phone" class="text-gray-600">Phone number</label>
          <input v-model="checkoutForm.phone_number" type="text" name="phone" id="phone" class="input-box" />
        </div>
        <div>
          <label for="email" class="text-gray-600">Email address</label>
          <input v-model="checkoutForm.email" type="email" name="email" id="email" class="input-box" />
        </div>
      </div>
      <div id="card" class="mt-5"></div>
    </div>

    <div class="col-span-4 border border-gray-200 p-4 rounded">
      <h4 class="text-gray-800 text-lg mb-4 font-medium uppercase">order summary</h4>
      <div class="space-y-2">
        <div v-for="item in cart.data.attributes.cart_items.data" class="flex justify-between">
          <div>
            <h5 class="text-gray-800 font-medium">{{item.attributes.product.data.attributes.name}}</h5>
          </div>
          <p class="text-gray-600">x{{item.attributes.quantity}}</p>
          <p class="text-gray-800 font-medium">{{item.attributes.price}}</p>
        </div>
      </div>

      <div
        class="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas"
      >
        <p>subtotal</p>
        <p>{{calculateTotal()}}</p>
      </div>

      <div
        class="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas"
      >
        <p>shipping</p>
        <p>Free</p>
      </div>

      <div class="flex justify-between text-gray-800 font-medium py-3 uppercas">
        <p class="font-semibold">Total</p>
        <p>{{calculateTotal()}}</p>
      </div>

      <div class="flex items-center mb-4 mt-2">
        <input
          type="checkbox"
          name="aggrement"
          id="aggrement"
          class="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
        />
        <label for="aggrement" class="text-gray-600 ml-3 cursor-pointer text-sm">
          I agree to the
          <a href="#" class="text-primary">terms & conditions</a>
        </label>
      </div>

      <a
        @click="checkout"
        href="#"
        class="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
      >
        Place
        order
      </a>
    </div>
  </div>
  <!-- ./wrapper -->
</template>
<script setup>
import { StripeCheckout } from "@vue-stripe/vue-stripe";

import { loadStripe } from "@stripe/stripe-js";

const config = useRuntimeConfig();
const stripePK = config.public.stripePk;

const stripe = await loadStripe(stripePK);

const message = ref('')

const elements = stripe?.elements();

let card = elements.create("card", {
  hidePostalCode: true,
  style: {
    base: {
      iconColor: '#666EE8',
      color: '#31325F',
      lineHeight: '40px',
      fontWeight: 300,
      fontFamily: 'Helvetica Neue',
      fontSize: '15px',

      '::placeholder': {
        color: '#CFD7E0',
      },
    },
  }
});

onMounted(() => {
  // Stripe injects an iframe into the DOM
  card.mount("#card");
})

const checkoutForm = ref({
  name: '',
  address: '',
  phone_number: '',
  email: ''
})

const { data:cart } = await useFetch("http://localhost:1337/api/carts/1?populate[cart_items][populate][0]=product")

function calculateTotal () {
  let subTotal = 0;
  cart._rawValue.data.attributes.cart_items.data.forEach(element => {
    const { quantity, price } = element.attributes
    subTotal += quantity * price
  });

  return subTotal
}

function checkout() {
  const options = {
    name: checkoutForm._rawValue.name
  }

  const res = stripe.createToken(card, options).then(async (data) => {
    // gui cart_item _id
    // phuong thuc thanh toan
    // .....
    if (data.token) {
      const response = await useFetch("http://localhost:1337/api/store", {
        method: "POST",
        body: {
          token: data.token.id,
          ...checkoutForm._rawValue
        }
      })
      if (!response.error.value) {
        message.value = 'Payment successfully !!!'
      }
      console.log(response)
    } else {
      console.log(data)
    }
  });
}
</script>
