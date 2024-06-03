<template>
    <div class="font-mono bg-[#ad302c]">
        <nav class="font-mono uppercase bg-[#ad302c] sm:pt-4 pt-1 shadow shadow-gray-300 w-100 px-8 md:px-auto">
            <div
                class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                <div class="text-white-500 justify-end">
                </div>
                <div class="flex-grow"></div>
                <div class="space-x-8">
                    <router-link to="/dashboard">
                        <button
                            :class="{ 'text-white': isActive('/dashboard').value, 'text-black': !isActive('/dashboard').value }"
                            class=" sm:w-auto sm:h-11 w-auto h-9 transition-all duration-300 ease-in-out hover:text-white text-black sm:text-lg text-base font-semibold">
                            Dashboard
                        </button>
                    </router-link>

                    <router-link to="/inventory">
                        <button
                            :class="{ 'text-white': isActive('/inventory').value, 'text-black': !isActive('/inventory').value }"
                            class="tracking-wide sm:w-auto sm:h-11 w-auto h-9 transition-all duration-300 ease-in-out hover:text-white text-black sm:text-lg text-base font-bold font-montserrat">
                            Inventory
                        </button>
                    </router-link>

                    <router-link to="/">
                        <button
                            class=" sm:w-auto sm:h-11 w-auto h-9 transition-all duration-300 ease-in-out hover:text-white text-base sm:text-lg font-bold font-montserrat">
                            Logout
                        </button>
                    </router-link>
                </div>
            </div>
        </nav>

        <div class="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden py-2 bg-[#ad302c] text-xl">
            <div class="px-4 md:px-6 mx-auto w-full mt-16">
                <div class="flex flex-wrap">
                    <div class="w-full px-4">
                        <div
                            class="relative flex flex-col min-w-0 break-words w-full mb-2 shadow-lg rounded-lg bg-white text-blueGray-700">
                            <div class="px-6 py-4 border-0">
                                <div class="flex flex-wrap items-center">
                                    <div class="relative w-full max-w-full flex-grow flex-1">
                                        <h3 class="font-bold  px-8 text-xl text-blueGray-700">Inventory</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="block w-full overflow-x-auto">
                                <table class="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-6 text-center align-middle border border-solid py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                                                Name</th>
                                            <th
                                                class="px-6 align-middle text-center border border-solid py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                                                Price</th>
                                            <th
                                                class="px-6 text-center align-middle border border-solid py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                                                Product in Stock</th>
                                            <th
                                                class="px-6 align-middle border border-solid py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap text-center font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                                                Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="product in products" :key="product.id">
                                            <td class="border-t-0  border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div class="flex items-center justify-center">{{ product.name }}</div>
                                            </td>

                                            <td
                                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div class="flex items-center justify-center"> ₱{{ product.price }}.00
                                                </div>
                                            </td>
                                            <td
                                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div class="flex items-center justify-center">{{ product.quantity }}
                                                </div>
                                            </td>
                                            <td
                                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div class="flex items-center justify-center">
                                                    <button
                                                        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                        @click="editProduct(product)">Edit</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="w-full mt-1 relative flex ct-docs-disable-sidebar-content overflow-x-hidden pb-16 bg-[#ad302c] text-xl">
            <div v-if="editProductData && editProductData.id !== 0"
                class="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden pb-16 bg-[#ad302c] text-xl">
                <div class="px-4 md:px-6 mx-auto w-full mt-16">
                    <div class="flex justify-center">
                        <div class="w-full md:w-3/4 lg:w-1/2 px-4">
                            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div class="px-6 py-4 text-black">
                                    <h1 class="font-bold text-xl text-blueGray-700">Edit a Product</h1>
                                </div>
                                <div class="p-6">
                                    <form @submit.prevent="updateProduct">
                                        <input type="hidden" v-model="editProductData.id" />
                                        <div class="mb-4">
                                            <label class="block text-sm font-semibold mb-2">Name:</label>
                                            <input type="text" v-model="editProductData.name" required
                                                class="w-full text-xs px-3 py-2 border border-blueGray-300 rounded-md focus:outline-none focus:border-blue-500" />
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-sm font-semibold mb-2">Price:</label>
                                            <input type="number" v-model="editProductData.price" required
                                                class="w-full px-3 text-xs py-2 border border-blueGray-300 rounded-md focus:outline-none focus:border-blue-500" />
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-sm font-semibold mb-2">Quantity:</label>
                                            <input type="number" v-model="editProductData.quantity" required
                                                class="w-full px-3 py-2 text-xs border border-blueGray-300 rounded-md focus:outline-none focus:border-blue-500" />
                                        </div>
                                        <div class="flex justify-center">
                                            <button type="button" @click="deleteProduct(editProductData.id)"
                                                class="mx-24 bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                            <button type="submit"
                                                class="mx-24 bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Footer from '@/Components/Footer.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const products = ref([]);
const editProductData = ref(null);

const editProduct = (product) => {
    editProductData.value = { ...product };
};

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost/bossingsapi/get_products.php');
        products.value = response.data; // Assuming your API response is an array of products
    } catch (error) {
        console.error('Error fetching products:', error);
    }
});

const updateProduct = async () => {
    try {
        const response = await axios.post('http://localhost/bossingsapi/get_products.php', editProductData.value);
        try {
            const response = await axios.get('http://localhost/bossingsapi/get_products.php');
            products.value = response.data; // Assuming your API response is an array of products
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        console.log(response.data.message);
        // Handle successful update (e.g., show a success message, refresh product list)
    } catch (error) {
        console.error('Error updating product:', error);
        // Handle update error (e.g., show an error message)
    }
};

const route = useRoute();
const isActive = (path) => computed(() => route.path === path);
</script>