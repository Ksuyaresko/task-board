<template>
  <div v-if="!authStore.currentUser" class="login-container">
    <h2>Join Workspace</h2>
    <p>Enter your name and choose an avatar to get started</p>

    <form @submit.prevent="handleLogin">
      <input type="text" name="name" placeholder="Your name" v-model="name" class="mb" />
      <!-- @todo: Implement avatar -->
      <button type="submit">Join Workspace</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/index.js";
const authStore = useAuthStore();

const name = ref("");
const handleLogin = () => {
  // todo avatar
  authStore.login({ name: name.value, avatar: `https://ui-avatars.com/api/?name=name.value` });
};
</script>
