import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '@/Pages/Home.vue';
import Welcome from '@/Pages/Welcome.vue';
import Products from '@/Pages/Products.vue';
import ShopCart from '@/Pages/Cart.vue';
import About from '@/Pages/About.vue';
import Login from '@/Pages/Login.vue';
import Register from '@/Pages/Register.vue';
import UserProfile from '@/Pages/ProfilePage.vue';
import Dashboard from '@/Pages/Dashboard.vue';
import Inventory from '@/Pages/Inventory.vue';





const routes = [
    { path: '/', component: Welcome },
    { path: '/home', component: Home },
    { path: '/products', component: Products },
    { path: '/cart', component: ShopCart },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/profile', component: UserProfile },
    { path: '/dashboard', component: Dashboard },
    { path: '/inventory', component: Inventory },
    // Add more routes as needed
  ];

  // Create router instance
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  });

  export default router
