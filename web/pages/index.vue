<template>
  <!-- products -->
  <div class="col-span-3 m-5">
    <div class="message">
      <span class="text-green-700 mr-2">{{message}}</span>
      <nuxt-link v-if="message != ''" to="/cart" class="text-blue-700 underline">Go to Cart</nuxt-link>
    </div>
    <div class="flex items-center mb-4">
      <div class="flex gap-2 ml-auto">
        <div
          class="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer"
        >
          <i class="fa-solid fa-grip-vertical"></i>
        </div>
        <div
          class="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer"
        >
          <i class="fa-solid fa-list"></i>
        </div>
      </div>
    </div>

    <div class="grid md:grid-cols-3 grid-cols-2 gap-6">
      <div v-for="product in products.data" class="bg-white shadow rounded overflow-hidden group">
        <div class="relative">
          <img src="../assets/images/products/product1.jpg" alt="product 1" class="w-full" />
          <div
            class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
          >
            <a
              href="#"
              class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
              title="view product"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </a>
            <a
              href="#"
              class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
              title="add to wishlist"
            >
              <i class="fa-solid fa-heart"></i>
            </a>
          </div>
        </div>
        <div class="pt-4 pb-3 px-4">
          <a href="#">
            <h4
              class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition"
            >
              {{product.attributes.name}}
            </h4>
          </a>
          <div class="flex items-baseline mb-1 space-x-2">
            <p class="text-xl text-primary font-semibold">{{product.attributes.price}}</p>
            <!-- <p class="text-sm text-gray-400 line-through">$55.90</p> -->
          </div>
          <div class="flex items-center">
            <div class="flex gap-1 text-sm text-yellow-400">
              <span>
                <i class="fa-solid fa-star"></i>
              </span>
              <span>
                <i class="fa-solid fa-star"></i>
              </span>
              <span>
                <i class="fa-solid fa-star"></i>
              </span>
              <span>
                <i class="fa-solid fa-star"></i>
              </span>
              <span>
                <i class="fa-solid fa-star"></i>
              </span>
            </div>
            <div class="text-xs text-gray-500 ml-3">({{product.attributes.quantity}})</div>
          </div>
        </div>
        <a
          @click="addToCart(product)"
          href="#"
          class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
        >
          Add to cart
        </a>
      </div>
    </div>
  </div>

  <!-- ./products -->
</template>
<script setup>
const message = ref('')
// Get all products
const { data:products } = await useFetch("http://localhost:1337/api/products")

async function addToCart(product) {
  const { price } = product.attributes;
  const response = await useFetch("http://localhost:1337/api/cart-items", {
    method: "POST",
    body: {
      data: {
        price: price,
        quantity: 1,
        product: product.id,
        cart: 1
      }
    }
  })
  if (response.data._rawValue) {
    message.value = 'Add to cart successfully!!!'
  } else {
    message.value = 'Add to cart failed!!!'
  }
}
</script>
