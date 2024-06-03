<template>
    <AppLayout>
      <div class="min-h-screen bg-[#ad302c] py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div class="rounded-3xl mx-10 border-black border-2 relative px-8 py-10 shadow-lg sm:rounded-3xl sm:px-24">
            <div class="max-w-md mx-auto">
              <div>
                <h2 class="uppercase text-black tracking-wide text-center text-[2rem] font-black">Sign Up</h2>
              </div>
              <form @submit.prevent="submitForm" class="divide-y divide-gray-200">
                <div class="py-8 text-base leading-6 space-y-2 text-gray-700 sm:text-lg sm:leading-7">
                  <div>
                    <InputLabel for="name" value="Name" />
                    <TextInput
                      id="name"
                      type="text"
                      class="mt-1 block w-full"
                      v-model="form.name"
                      
                      autofocus
                      autocomplete="name"
                    />
                    <InputError class="mt-2" :message="form.errors.name" />
                  </div>
  
                  <div class="mt-4">
                    <InputLabel for="email" value="Email" />
                    <TextInput
                      id="email"
                      type="email"
                      class="mt-1 block w-full"
                      v-model="form.email"
                      
                      autocomplete="username"
                    />
                    <InputError class="mt-2" :message="form.errors.email" />
                  </div>
  
                  <div class="mt-4">
                    <InputLabel for="password" value="Password" />
                    <TextInput
                      id="password"
                      type="password"
                      class="mt-1 block w-full"
                      v-model="form.password"
                      
                      autocomplete="new-password"
                    />
                    <InputError class="mt-2" :message="form.errors.password" />
                  </div>
  
                  <div class="mt-4">
                    <InputLabel for="password_confirmation" value="Confirm Password" />
                    <TextInput
                      id="password_confirmation"
                      type="password"
                      class="mt-1 block w-full"
                      v-model="form.password_confirmation"
                      
                      autocomplete="new-password"
                    />
                    <InputError class="mt-2" :message="form.errors.password_confirmation" />
                  </div>
  
                  <div class="col-span-full">
                    <button type="submit" class="mt-8 tracking-wider font-black uppercase items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black uppercase">Register</button>
                  </div>
                </div>
              </form>
  
              <div class="mt-0 flex justify-center text-center text-sm text-black">
                <router-link to="/login">
                  <p>
                    or{{ ' ' }}
                    <button type="button" class="font-xl font-black uppercase tracking-wider text-black hover:text-[#d3c3ae]">
                      Log In
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { reactive } from 'vue';
  import AppLayout from '@/Layouts/AppLayout.vue';
  import InputError from '@/Components/InputError.vue';
  import InputLabel from '@/Components/InputLabel.vue';
  import TextInput from '@/Components/TextInput.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    errors: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });
  
  const clearErrors = () => {
    form.errors.name = '';
    form.errors.email = '';
    form.errors.password = '';
    form.errors.password_confirmation = '';
  };
  
  const validateForm = () => {
    clearErrors();
    let isValid = true;
  
    if (!form.name) {
      form.errors.name = 'Name is required';
      isValid = false;
    }
  
    if (!form.email) {
      form.errors.email = 'Email is required';
      isValid = false;
    }
  
    if (!form.password) {
      form.errors.password = 'Password is required';
      isValid = false;
    }
  
    if (!form.password_confirmation) {
      form.errors.password_confirmation = 'Password confirmation is required';
      isValid = false;
    }
  
    if (form.password && form.password_confirmation && form.password !== form.password_confirmation) {
      form.errors.password_confirmation = 'Passwords do not match';
      isValid = false;
    }
  
    return isValid;
  };
  
  const submitForm = async () => {
    if (!validateForm()) return;
  
    try {
      const response = await axios.post('http://localhost/bossingsapi/user_register.php', {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
      });
      router.push('/login');
      console.log(response.data); // Log the API response
      // You can handle the response here, such as showing a success message or redirecting the user
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  </script>
  