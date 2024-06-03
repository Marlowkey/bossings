<template>
  <AppLayout>
  <div>
      <nav class="font-mono uppercase bg-[#ad302c] sm:pt-4 pt-1 shadow shadow-gray-300 w-100 px-8 md:px-auto">
        <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          <div class="text-white-500 justify-end">
            <router-link to="/register">
              <button class=" sm:w-auto sm:h-11 w-auto h-9 px-5  tracking-wider  rounded-full transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-white hover:scale-105 hover:shadow-lg cursor-pointer bg-black text-[#d3c3ae] sm:text-lg text-lg font-bold">
                Home
              </button>
            </router-link>
          </div>
          <div class="flex-grow"></div>
          <div class="space-x-8">
            <router-link to="/login">
              <button class=" sm:w-auto sm:h-11 w-auto h-9 transition-all duration-300 ease-in-out hover:text-white text-[#d3c3ae] tracking-wider sm:text-lg text-lg font-bold">
                Login
              </button>
            </router-link>
            <router-link to="/register">
              <button class=" sm:w-auto sm:h-11 w-auto h-9 transition-all duration-300 ease-in-out hover:text-white text-[#d3c3ae] tracking-wider sm:text-lg text-lg font-bold font-montserrat">
                Register
              </button>
            </router-link>
          </div>
        </div>
      </nav>
      <!-- Main content -->
  <main class="font-mono">
    <div class="place-content-center bg-[#ad302c] sm:h-[32rem] h-[27rem] text-black text-center grid bg-cover" >
    <img class="sm:h-[70rem] sm:w-[50rem] h-[30rem] w-[20rem] object-scale-down object-center" :src="getLogo" alt="logo">
    </div>

    <div  class=" h-[50rem] grid text-center text-black place-content-center min-h-full relative isolate bg-[#ad302c] after:bg-cover">
          <div class="mx-auto max-w-screen-xl">
            <p class="text-2xl uppercase px-0 text-center font-extrabold  tracking-wider  text-[#d3c3ae]">In our shop</p>
            <div class="flex flex-wrap justify-center gap-4 mt-10">
              <div class="w-90 h-50 flex flex-col gap-1">
                <img :src="getPreview" class="object-scale-down">
              </div>
            </div>

          </div>
        </div>

<section class=" h-auto bg-[#c85d1fe9]">
    <div class="mx-auto max-w-screen-xl px-4 py-12">
      <p class="text-2xl uppercase px-0 text-center font-extrabold tracking-wider  text-[#d3c3ae]">In our world</p>
      <div class="py-24 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
        <blockquote v-for="(review, index) in reviews" :key="index" class="rounded-lg relative bg-gray-50 p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <div>
              <div class="flex justify-center gap-0.5 text-green-500">
                <svg
                  v-for="star in review.stars"
                  :key="star"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <p class="mt-0.5 text-lg font-medium text-gray-900">{{ review.author }}</p>
            </div>
          </div>
          <p class="mt-4 text-gray-700">{{ review.content }}</p>
        </blockquote>
      </div>
    </div>
</section>
</main>
</div>
</AppLayout>
  </template>
  
  <script setup>
  import AppLayout from '@/Layouts/AppLayout.vue';
  import { ref } from 'vue';
  
  import getLogo from '@/assets/img/logo.png';
  import getPreview from '@/assets/img/preview.png';
  
    const reviews = ref([
    {
      author: 'Angelo Socito',
      content: 'Ang sarap, may namit na palan siya aside from being spicy!',
      stars: [1, 2, 3, 4, 5], // Change to actual star ratings
    },
    {
      author: 'Patrick Asanza',
      content: 'Tikman nyo po at napakasarap!  Masilam and nutritious tabi! May extra-hot para sa mahilig sa maanghang.  Whata a unique oragon-style chili garlic sauce!',
      stars: [1, 2, 3, 4, 5], // Change to actual star ratings
    },
    {
      author: 'Patrick Gapangada',
      content: 'Di tinipid sa garlic yung formulation kaya very tasty, also the spice is subtle and very good.',
      stars: [1, 2, 3, 4, 5], // Change to actual star ratings
    }
    // Add more reviews as needed
  ]);
  
  </script>
  <style scoped>
  .my-element {
  animation: bounce; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s; /* don't forget to set a duration! */
}
</style>