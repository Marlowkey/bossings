<script setup>
defineProps({
    message: {
        type: String,
    },
});
</script>

<template>
    <div v-show="message">
        <p class="text-sm text-white font-medium">
            {{ message }}
        </p>
    </div>
</template>
