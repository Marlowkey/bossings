<script setup>
</script>
<template>
<nav  v-if="!['/', '/register', '/login', '/dashboard', '/inventory'].includes($route.path)"  class="flex-nowrap uppercase bg-[#ad302c] sm:pt-4 pt-1 shadow shadow-gray-300 w-100 px-8 md:px-auto">
    <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        <div class="text-white-500" >
            <router-link to="/home">
                <button class="sm:w-auto sm:h-11 w-auto h-9 px-5 tracking-wider rounded-full transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-white hover:scale-105 hover:shadow-lg cursor-pointer bg-black text-[#d3c3ae] sm:text-lg text-lg font-bold font-montserrat">Home</button>
            </router-link>
        </div>
        <div class="flex-grow">
        </div>

        <div class="space-x-2">
        <div v-if="$route.path === '/products'" class="flex justify-end">
            <router-link to="/cart" class="text-white-500 nav-link">
            <section class="mx-6 flex justify-center items-center">
                <button class="group flex justify-center p-2  drop-shadow-xl hover:translate-y-1 transition-all duration-500">
                    <svg class="sm:w-9 sm:h-9  w-8 h-8 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z" clip-rule="evenodd" />
                    </svg>
                    <span class="mb-2 absolute opacity-0 group-hover:opacity-100 group-hover:text-black group-hover:text-lg font-black group-hover:-translate-y-6 duration-200">
                        Cart
                    </span>
                </button>
            </section>
            </router-link>


            </div>
        </div>

        <div v-if="$route.path !== '/products'"  class="text-white-500 md:order-1">
                <router-link to="/products">
                    <button class=" sm:w-auto sm:h-11 w-auto h-9 px-5 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-white hover:scale-105 hover:shadow-lg cursor-pointer bg-black text-[#d3c3ae] tracking-wider sm:text-lg text-lg font-bold font-montserrat">Product</button>
                </router-link>
         </div>
    </div>
</nav>
</template>

