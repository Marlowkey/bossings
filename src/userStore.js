import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const id = ref(null); // Initialize id as null

  function setUserId(userId) {
    id.value = userId;
  }

  // Getter for userId
  const userId = computed(() => id.value);

  return { id, setUserId, userId };
});
