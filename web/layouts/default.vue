<template>
  <div>
    <!-- header -->
    <header class="py-4 shadow-sm bg-white">
      <div class="container flex items-center justify-between">
        <nuxt-link to="/">Logo</nuxt-link>

        <div class="w-full max-w-xl relative flex">
          <span class="absolute left-4 top-3 text-lg text-gray-400">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            name="search"
            id="search"
            class="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
            placeholder="search"
          />
          <button
            class="flex items-center bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex"
          >Search</button>
        </div>

        <div class="flex items-center space-x-4">
          <nuxt-link to="/checkout" class="text-center text-gray-700 hover:text-primary transition relative pointer">
            <div class="text-2xl">
              <i class="fa-regular fa-heart"></i>
            </div>
            <div class="text-xs leading-3">Checkout</div>
          </nuxt-link>
          <nuxt-link to="/cart" class="text-center text-gray-700 hover:text-primary transition relative">
            <div class="text-2xl">
              <i class="fa-solid fa-bag-shopping"></i>
            </div>
            <div class="text-xs leading-3">Cart</div>
          </nuxt-link>
          <a href="#" class="text-center text-gray-700 hover:text-primary transition relative">
            <div class="text-2xl">
              <i class="fa-regular fa-user"></i>
            </div>
            <div class="text-xs leading-3">Account</div>
          </a>
        </div>
      </div>
    </header>
    <!-- ./header -->
    <slot />
  </div>
</template>
