<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import axios from 'axios';
import { useUserStore  } from '@/userStore.js'; // Import userStore from the correct path
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import classic from '@/assets/img/classic.png';
import sweet from '@/assets/img/sweet.png';
import extra from '@/assets/img/extra.png';

const validationMessage = ref('');
const router = useRouter();
const products = ref([]);

function getImageUrl(name) {

  if (name == 'classic') {
  return classic;
} else if (name == 'sweet') {
  return sweet;
} else { 
  return extra;
}

}

// Function to add a product to the cart
const addToCart = async (product) => {
  try {
    const userStore = useUserStore();
    const userId = userStore.userId;
    // Assuming you have an API endpoint for adding to the cart
    const response = await axios.post('http://localhost/bossingsapi/cart.php',{ userId, product });
    console.log('Product added to cart:', response.data);
    router.push('/cart');
    // You can update the UI or show a message indicating success
  } catch (error) {
    console.error('Error adding to cart:', error);
    // Handle the error, such as showing an error message to the user
  }
}

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost/bossingsapi/get_products.php');
        products.value = response.data; // Assuming your API response is an array of products
    } catch (error) {
        console.error('Error fetching products:', error);
    }
});
</script>
<template>
<AppLayout>
<div class="bg-[#ad302c]">
    <div class=" pb-16 sm:px-6 sm:py-24 lg:p-16 ">
      <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 place-content-center">
        <div v-for="product in products" :key="product.id" class="gap-0 group relative flex flex-col items-center">
          <div class="h-80">
            <img :src="getImageUrl(product.image_src)" :alt="product.image_description" class="h-full w-full object-none lg:h-full lg:w-full" />
          </div>
          <div class="mt-4">
            <h2 class="text-lg uppercase  hover:text-white  text-[#d3c3ae] tracking-wide font-black text-center">
              {{ product.name }}
            </h2>
             <a  class="inline-flex grid text-center place-content-center">
               <p class="mt-3 text-black rounded-full text-xl  tracking-wider font-black p-1 uppercase min-w-32">₱{{ product.price }}.00</p>
             </a>
             <div class="inline-flex grid text-center place-content-center">

<form @submit.prevent="addToCart(product)">
    <button type="submit" class="text-[#d3c3ae] rounded-full mt-1 text-xl tracking-wider font-black font-semibold bg-black py-1 px-5 uppercase w-auto duration-100 ease-in-out hover:text-white hover:scale-105 hover:shadow-lg">
        Add
    </button>
</form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</AppLayout>
</template>


