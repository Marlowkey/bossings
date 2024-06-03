<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore  } from '@/userStore.js'; // Import userStore from the correct path
import AppLayout from '@/Layouts/AppLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';

const form = reactive({
    email: '',
    password: '',
    errors: { email: '', password: '' },
});

const router = useRouter();
const userStore = useUserStore();

const submitForm = async () => {
    try {
        if (!form.email) {
            form.errors.email = 'Email is required!';
            return;
        }
        if (!form.password) {
            form.errors.password = 'Password is required!';
            return;
        }

        const response = await fetch('http://localhost/bossingsapi/user_login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: form.email, password: form.password }),
        });

        const data = await response.json();

        if (data.success) {
      console.log('Login successful', data);
      userStore.setUserId(data.userId);
      console.log(userStore.userId);
      
      // Redirect based on user level
      if (data.userLevel === 1) {
        router.push('/dashboard');
      } else {
        router.push('/home');
      }
    } else {
      console.error('Login failed', data.message);
      form.errors.email = 'Invalid email or password';
    }
  } catch (error) {
        console.error('Form submission error:', error);
    }
};
</script>

<template>
    <AppLayout>
        <div class="min-h-screen bg-[#ad302c]  flex flex-col justify-center sm:py-12">
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                <div class="rounded-3xl mx-10 border-black border-2 relative px-8 py-10 shadow-lg sm:rounded-3xl sm:px-24">
                    <div class="max-w-md mx-auto">
                        <h2 class="mb-4 uppercase text-black tracking-wider text-center text-[2rem] font-black">Sign In</h2>
                    </div>
                    <div class="divide-y divide-gray-200">
                        <div class="py-1 text-base leading-6 sm:text-lg sm:leading-7">
                            <form @submit.prevent="submitForm">
                                <div>
                                    <div class="flex items-center">
                                        <svg class="mx-2 input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"></path>
                                        </svg>
                                        <InputLabel for="email" value="Email" />
                                    </div>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        class="mt-1 block w-full"
                                        v-model="form.email"
                                        
                                        autofocus
                                        autocomplete="username"
                                    />
                                    <InputError class="mt-2 ml-2 " :message="form.errors.email" />
                                </div>

                                <div class="mt-4">
                                    <div class="flex items-center">
                                        <svg class="mx-2 input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path>
                                        </svg>
                                        <InputLabel for="password" value="Password" />
                                    </div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        class="mt-1 block w-full"
                                        v-model="form.password"
                                        
                                        autocomplete="current-password"
                                    />
                                    <InputError class="mt-2" :message="form.errors.password" />
                                    <div class="col-span-full">
                                        <button type="submit" class="mt-8 tracking-wider font-black uppercase items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black uppercase"> Login </button>
                                    </div>
                                </div>
                            </form>
                            <div class="mt-0 flex justify-center text-center text-sm text-black">
                                <router-link to="/register">
                                    <p>
                                        or{{ ' ' }}
                                        <button type="button" class="mt-6 font-xl font-black uppercase tracking-wider text-black hover:text-[#d7a12f] transition-all duration-200"> Register </button>
                                    </p>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>


<style scoped>
.input-icon {
    height: 0.9em;
    width: 0.9em;
    fill: #ffeba7;
}
</style>
