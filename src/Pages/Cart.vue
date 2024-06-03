<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/userStore.js'; // Import userStore from the correct path
import AppLayout from '@/Layouts/AppLayout.vue';
import classic from '@/assets/img/classic.png';
import sweet from '@/assets/img/sweet.png';
import extra from '@/assets/img/extra.png';
const orderItems = ref([]);
const address = ref('');
const name = ref('');
const totalCost = ref(0);
const totalSubCost = ref(0);
const totalItems = ref(0);
const validationMessage = ref('');
const errorMessage = ref('');

// Function to get image URL based on product name
function getImageUrl(name) {
  if (name == 'classic') {
    return classic;
  } else if (name == 'sweet') {
    return sweet;
  } else {
    return extra;
  }
}

// Method to fetch order items from the API
const fetchOrderItems = async () => {
  try {
    const userStore = useUserStore();
    const userId = userStore.userId;

    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    const response = await axios.get(`http://localhost/bossingsapi/get_order_items.php?user_id=${userId}`);
    orderItems.value = response.data;
  } catch (error) {
    console.error('Error fetching order items:', error);
  }
};

// Calculate total items
const calculateTotalItems = () => {
  totalItems.value = orderItems.value.reduce((total, item) => total + item.quantity, 0);
};

// Calculate total cost including items price, and shipping
const calculateTotalCost = () => {
  let totalItemsPrice = orderItems.value.reduce((total, item) => total + item.product_price * item.quantity, 0);
  const shippingPrice = 58;
  totalCost.value = totalItemsPrice + shippingPrice;
};

const calculateSubTotalCost = () => {
  totalSubCost.value = orderItems.value.reduce((total, item) => total + item.product_price * item.quantity, 0);
};

// Initialize order items and calculate totals
onMounted(() => {
  fetchOrderItems();
});

// Method to remove an item from the cart
const removeItem = async (item) => {
  try {
    // Send a DELETE request to the API to remove the item
    await axios.delete(`http://localhost/bossingsapi/cart.php`, {
      params: {
        order_item_id: item.id
      }
    });

    // Remove the item from the local orderItems array
    const index = orderItems.value.findIndex(i => i.id === item.id);
    if (index !== -1) {
      orderItems.value.splice(index, 1);
      calculateTotalItems();
      calculateTotalCost();
      calculateSubTotalCost();
    }
  } catch (error) {
    console.error('Error removing order item:', error);
  }
};


// Method to update the quantity of an item
const updateQuantity = async (item) => {
  try {
    // Send a PUT request to the API to update the item quantity
    await axios.put('http://localhost/bossingsapi/cart.php', {
      order_item_id: item.id,
      quantity: item.quantity
    });

    calculateTotalItems();
    calculateTotalCost();
    calculateSubTotalCost();
  } catch (error) {
    console.error('Error updating item quantity:', error);
  }
};

const incrementQuantity = (item) => {
  item.quantity++;
  updateQuantity(item);
};

const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
    updateQuantity(item);
  }
};

const checkout = async () => {

  if (!name.value || !address.value) {
    errorMessage.value = 'Name and address are required!';
    return;
  }

  try {
    const response = await axios.post('http://localhost/bossingsapi/orders.php', {
      total_price: totalCost.value,
      username: name.value,
      address: address.value
      // Add other order data as needed
    });

    // Assuming your API returns the newly created order ID in the response
    const orderId = response.data.order_id;

    // Log or use the orderId as needed
    console.log('Order ID:', orderId);
    // Step 2: Update order_id for each item in the cart
    for (const item of orderItems.value) {
      try {
        const updateResponse = await axios.post('http://localhost/bossingsapi/update_order_items.php', {
          order_id: orderId,
          order_item_id: item.id,
        });
        // Log success response
        console.log('Update response:', updateResponse.data);
      } catch (error) {
        console.error('Error updating order_id for item:', error);
        // Handle error as needed
      }
    }

    validationMessage.value = 'Checkout successful!';
    errorMessage.value = '';
    name.value = '';
    address.value = '';
  } catch (error) {
    console.error('Error during checkout:', error);
    // Handle error as needed
  }
};
</script>

<style scoped>
/* Your existing styles */
</style>

<template>
  <AppLayout>
    <!-- no item -->
    <div v-if="orderItems.length == 0"
      class="uppercase text-black min-w-full bg-[#ad302c] mx-0 w-full h-[35rem] flex flex-col items-center justify-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-24 w-24 text-gray-400 mb-4">
        <path
          d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z">
        </path>
      </svg>
      <p class="text-2xl tracking-wider font-black mb-4">Your shopping cart is empty.</p>

      <router-link to="/products" class="inline-flex grid text-center place-content-center">
        <button
          class="text-[#d3c3ae] rounded-full border-black border-2 border text-xl hover:animate-bounce tracking-wide font-black font-semibold bg-black py-2 px-1 uppercase w-auto">Let's
          go to shop</button>
      </router-link>
    </div>

    <div v-if="orderItems.length > 0"
      class="uppercase px-0 text-center font-black tracking-wider text-[#d3c3ae] container min-w-full bg-[#ad302c] mx-0 w-full">
      <div class="sm:flex">
        <!-- Left side with shopping cart items -->
        <div class="w-full sm:w-3/4 px-10 py-10">
          <div v-for="item in orderItems" :key="item.id"
            class="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50">
            <div class="md:w-4/12 2xl:w-1/4 w-full">
              <img :src="getImageUrl(item.product_src)" :alt="item.product_name"
                class="h-full object-center object-cover md:block hidden" />
              <img :src="getImageUrl(item.product_src)" :alt="item.product_name"
                class="md:hidden w-full h-full object-center object-cover" />
            </div>
            <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
              <div class="flex items-center justify-between w-full">
                <p class="text-xl font-black ">{{ item.product_name }}</p>
                <div class="relative flex items-center">
                  <button type="button" @click="decrementQuantity(item)"
                    class="flex-shrink-0 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 inline-flex items-center justify-center rounded-l-md h-5 w-5 dark:focus:ring-gray-700">
                    <svg class="w-4 h-4 text-gray-900 dark:text-white" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M20 12H4" />
                    </svg>
                  </button>
                  <input type="number" v-model="item.quantity"
                    class="bg-black flex-shrink-0 text-[#ad302c] dark:text-white rounded-full w-10 h-8 text-center"
                    min="1" required>
                  <button type="button" @click="incrementQuantity(item)"
                    class="flex-shrink-0 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 inline-flex items-center justify-center rounded-l-md h-5 w-5 dark:focus:ring-gray-700">
                    <svg class="w-4 h-4 text-gray-900 dark:text-white" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v12M6 12h12" />
                    </svg>
                  </button>
                </div>
              </div>
              <p class="text-lg leading-8 pt-2">Flavor: {{ item.category_name }}</p>
              <div class="flex items-center justify-between pt-5">
                <div class="flex items-center">
                  <p class="text-base leading-none underline text-red-500 pl-5 cursor-pointer"
                    @click="removeItem(item)">Remove</p>
                </div>
                <p class="text-lg font-black leading-none">₱{{ item.product_price * item.quantity }}.00</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right side with order summary -->
        <div id="summary" class="w-full sm:w-1/4 md:w-1/2 px-8 py-10">
          <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div class="flex justify-between mt-10 mb-5">
            <span class="font-semibold text-lg uppercase">Subtotal</span>
            <span class="font-semibold text-lg">₱{{ totalSubCost }}</span>
          </div>
          <div class="flex justify-between mt-10 mb-5">
            <span class="font-semibold text-lg uppercase">Standard Shipping</span>
            <span class="font-semibold text-lg">₱58.00</span>
          </div>
          <div class="flex justify-between mt-10 mb-5">
            <span class="font-semibold text-lg uppercase">Payment Method</span>
            <span class="font-semibold text-lg">Cash on delivery</span>
          </div>
          <div class="py-10">
            <label for="name" class="font-semibold inline-block mb-3 text-lg uppercase">Name</label>
            <input type="text" id="name" placeholder="Enter your name"
              class="rounded-3xl text-black p-2 text-lg text-center w-full" v-model="name" />
          </div>
          <div class="py-1">
            <label for="address" class="font-semibold inline-block mb-3 text-lg uppercase">Address</label>
            <input type="text" id="address" placeholder="Enter your shipping address"
              class="text-black rounded-3xl p-2 text-lg text-center w-full" v-model="address" />
          </div>
          <div class="border-t mt-8">
            <div class="flex font-semibold justify-between py-6 text-lg uppercase">
              <span>Total cost</span>
              <span>₱{{ totalCost }}</span>
            </div>
            <div class="inline-flex grid text-center place-content-center">
              <button @click="checkout"
                class="text-[#d3c3ae] rounded-full border-black border-2 border text-xl hover:animate-bounce tracking-wider font-black font-semibold bg-black py-2 px-1 uppercase w-auto">Checkout</button>
            </div>
          </div>
          <div class="mt-6 flex justify-center text-center text-sm text-black">
            <p>
              or{{ ' ' }}
              <router-link to="/products">
                <button type="button" class="font-xl uppercase text-black hover:text-[#d3c3ae]">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </router-link>
            </p>

          </div>
          <p v-if="validationMessage" class="text-green mt-2">{{ validationMessage }}</p>
          <p v-if="errorMessage" class="mt-2">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: number;
}
</style>
