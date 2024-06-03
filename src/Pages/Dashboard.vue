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
                        :class="{'text-white': isActive('/dashboard').value, 'text-black': !isActive('/dashboard').value}"
                            class=" sm:w-auto sm:h-11 w-auto h-9 transition-all duration-300 ease-in-out hover:text-white text-black sm:text-lg text-base font-semibold">
                            Dashboard
                        </button>
                    </router-link>

                    <router-link to="/inventory">
                        <button
                        :class="{'text-white': isActive('/inventory').value, 'text-black': !isActive('/inventory').value}"

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
        <div class="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden py-16 bg-[#ad302c] text-xl">
            <div class="relative bg-blueGray-100 w-full">
                <div class="relative pt-8 pb-32 bg-lightBlue-500">
                    <div class="px-4 md:px-6 mx-auto w-full">
                        <div>
                            <div class="flex flex-wrap">
                                <!-- @* Users *@ -->
                                <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                                    <div
                                        class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                                        <div class="flex-auto p-4">
                                            <div class="flex flex-wrap">
                                                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                    <h5 class="text-blueGray-400 uppercase font-bold text-xs">Users</h5>
                                                    <span class="font-bold text-xl">{{ users }}</span>
                                                </div>
                                                <div class="relative w-auto pl-4 flex-initial">
                                                    <div
                                                        class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                                        <i class="far fa-chart-bar"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- @* Pending *@ -->
                                <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                                    <div
                                        class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                                        <div class="flex-auto p-4">
                                            <div class="flex flex-wrap">
                                                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                    <h5 class="text-blueGray-400 uppercase font-bold text-xs">Pending
                                                        Orders</h5>
                                                    <span class="font-bold text-xl">{{ pending }}</span>
                                                </div>
                                                <div class="relative w-auto pl-4 flex-initial">
                                                    <div
                                                        class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                                                        <i class="fas fa-chart-pie"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- @* Completed *@ -->
                                <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                                    <div
                                        class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                                        <div class="flex-auto p-4">
                                            <div class="flex flex-wrap">
                                                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                    <h5 class="text-blueGray-400 uppercase font-bold text-xs">Completed
                                                        Orders</h5>
                                                    <span class="font-bold text-xl">{{ completed }}</span>
                                                </div>
                                                <div class="relative w-auto pl-4 flex-initial">
                                                    <div
                                                        class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                                                        <i class="fas fa-users"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- @* Inventory *@ -->
                                <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                                    <div
                                        class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                                        <div class="flex-auto p-4">
                                            <div class="flex flex-wrap">
                                                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                    <h5 class="text-blueGray-400 uppercase font-bold text-xs">Inventory
                                                    </h5>
                                                    <span class="font-bold text-xl">{{ totalInventory }}</span>
                                                </div>
                                                <div class="relative w-auto pl-4 flex-initial">
                                                    <div
                                                        class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500">
                                                        <i class="fas fa-percent"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 md:px-6 mx-auto w-full -mt-24">

                    <div class="flex flex-wrap">
                        <div class="w-full  px-4">
                            <div
                                class="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg bg-white text-blueGray-700">
                                <div class="px-6 py-4 border-0">
                                    <div class="flex flex-wrap items-center">
                                        <div class="relative w-full max-w-full flex-grow flex-1">
                                            <h3 class="font-bold  text-xl text-blueGray-700">Orders</h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="block w-full overflow-x-auto">
                                    <table class="items-center w-full bg-transparent border-collapse">
                                        <thead>
                                            <tr>
                                                <th
                                                    class="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                                                    User</th>
                                                <th
                                                    class="px-6 align-middle border border-solid py-3 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                                                    Address</th>
                                                <th
                                                    class="px-6 align-middle border border-solid py-3 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                                                    Order Date</th>
                                                <th
                                                    class="px-6 align-middle border border-solid py-3 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                                                    Order Status</th>
                                                <th
                                                    class="px-6 align-middle border border-solid py-3 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                                                    Items</th>
                                                <th
                                                    class="px-6 align-middle border border-solid py-3 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                                                    Total Price</th>

                                                <th
                                                    class="px-6 align-middle border border-solid py-3 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                                                    Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="order in orders" :key="order.order_id">
                                                <td
                                                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div class="flex items-center justify-center">{{ order.username }}
                                                    </div>
                                                </td>
                                                <td
                                                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div class="flex items-center justify-center">{{ order.address }}
                                                    </div>
                                                </td>
                                                <td
                                                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div class="flex items-center justify-center">{{ order.order_date }}
                                                    </div>
                                                </td>
                                                <td
                                                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div class="flex items-center justify-center">{{ order.order_status
                                                        }}</div>
                                                </td>
                                                <td
                                                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div class="flex items-center justify-center">
                                                        <ul>
                                                            <li v-for="item in order.order_items"
                                                                :key="item.order_item_id">
                                                                {{ item.product_name }} - {{ item.quantity }}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td
                                                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div class="flex items-center justify-center">₱{{ order.total_price
                                                        }}.00</div>
                                                </td>
                                                <td
                                                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div class="flex items-center  justify-center">
                                                        <button @click="markCompleted(order)"
                                                            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                                            Mark Completed
                                                        </button>
                                                        <button @click="deleteOrder(order)"
                                                            class="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                            Delete
                                                        </button>
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

const route = useRoute();

const isActive = (path) => computed(() => route.path === path);
const orders = ref([]);
const users = ref(0);
const pending = ref(0);
const completed = ref(0);
const totalInventory = ref(0);
const products = ref([]);

onMounted(() => {
    fetchOrders();
    fetchProducts();
    
});
// Method to fetch products from the API
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost/bossingsapi/get_products.php');
    products.value = response.data; // Assuming your API response is an array of products
    calculateTotalInventory();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Calculate total inventory
const calculateTotalInventory = () => {
  totalInventory.value = products.value.reduce((total, product) => total + product.quantity, 0);
};
const fetchOrders = async () => {
    try {
        const response = await axios.get('http://localhost/bossingsapi/get_orders.php');
        orders.value = response.data;

        updateOrderCounts();

    } catch (error) {
        console.error('Error fetching order items:', error);
    }
};

const markCompleted = async (order) => {
    try {
        await axios.post('http://localhost/bossingsapi/update_order_status.php', {
            order_id: order.order_id,
        });
        // Update local state
        order.order_status = 'Completed';
        updateOrderCounts();
    } catch (error) {
        console.error('Error marking order as completed:', error);
    }
};

const deleteOrder = async (order) => {
    try {
        await axios.delete('http://localhost/bossingsapi/update_order_status.php', {
            params: {
                order_id: order.order_id,
            }
        });
        // Update local state
        const index = orders.value.findIndex(i => i.order_id === order.order_id);
        if (index !== -1) {
            orders.value.splice(index, 1);
            updateOrderCounts();
        }
    } catch (error) {
        console.error('Error deleting order:', error);
    }
};

const updateOrderCounts = () => {
    const userSet = new Set();
    let pendingCount = 0;
    let completedCount = 0;

    orders.value.forEach(order => {
        userSet.add(order.username);
        if (order.order_status === 'Pending') {
            pendingCount++;
        } else if (order.order_status === 'Completed') {
            completedCount++;
        }
    });

    users.value = userSet.size;
    pending.value = pendingCount;
    completed.value = completedCount;
};
</script>
