<template>
  <!-- wishlist -->
  <div class="col-span-9 space-y-4 m-5">
    <div v-for="item in cart.data.attributes.cart_items.data" class="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
      <div class="w-28">
        <img src="~/assets/images/products/product1.jpg" alt="product 6" class="w-full" />
      </div>
      <div class="w-1/3">
        <h2 class="text-gray-800 text-xl font-medium uppercase">{{item.attributes.product.data.attributes.name}}</h2>
        <p class="text-gray-500 text-sm">
          Quantity:
          <span class="text-green-600">{{item.attributes.quantity}}</span>
        </p>
      </div>
      <div class="text-primary text-lg font-semibold">{{item.attributes.price}}</div>
      <div class="text-primary text-lg font-semibold cursor-pointer" @click="removeItem(item.id)">X</div>
    </div>
    <div>
      <nuxt-link
        to="/checkout"
        class="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
      >
        Checkout
      </nuxt-link>
    </div>
  </div>
  <!-- ./wishlist -->
</template>
<script setup>
const { data:cart } = await useFetch("http://localhost:1337/api/carts/1?populate[cart_items][populate][0]=product")

async function removeItem(itemId) {
  const response = await useFetch(`http://localhost:1337/api/cart-items/${itemId}`, {
    method: "DELETE",
  })
  if (response.data._rawValue) {
    cart.value.data.attributes.cart_items.data = cart.value.data.attributes.cart_items.data.filter(item => item.id != response.data._rawValue.data.id);
  }
}
</script>
