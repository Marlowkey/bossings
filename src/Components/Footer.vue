<template>
      <!-- Footer -->
      <footer class="font-mono pt-2 sm:text-xl text-lg font-bold tracking-tight text-[#d3c3ae] h-auto bg-[#1A5D1A]">
        <div class="mx-auto w-full max-w-screen-xl">
          <div class="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-3">
            <!-- Dynamic sections -->
            <div v-for="section in sections" :key="section.title">
              <h2 class="sm:text-2xl text-xl font-black tracking-wider uppercase dark:text-white">{{ section.title }}</h2>
              <ul class="font-medium">
                <li v-for="(item, idx) in section.items" :key="idx" class="mb-4">
            <router-link v-if="item.link === '/about'" :to="item.link" class="hover:text-white  hover:underline">{{ item.text }}</router-link>
            <a v-else :href="item.link" class="hover:text-white hover:underline">{{ item.text }}</a>
          </li>
              </ul>
            </div>
                    <!-- Logo section -->
          </div>
        </div>
      </footer>
  </template>
  
  <script setup>

    const sections = [
    {
      title: 'Location',
      items: [
        { text: 'Real Street, Calatagan Proper, Virac, Philippines', link: '#' },
      ],
    },
    {
      title: 'Socials',
      items: [
        { text: '@ Bossing\'s Chili Garlic Sauce', link: '#' },
        { text: '@ 0919 273 0059', link: '#' },
      ],
    },
    {
      title: 'About Us',
      items: [
        { text: 'Who we are and what we do', link: '/about' },
      ],
    },
  ];
  </script>
  
  