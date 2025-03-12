<template>
  <div class="app">
    <Header />
    <main>
      <Login v-if="!authStore.currentUser" />
      <Main v-else />
    </main>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { socketService } from "./services/socketService";
import { useAuthStore } from "./stores";
import Main from "./components/Workspace/Main.vue";
import Header from "./components/Layout/Header.vue";
import Login from "./components/Auth/Login.vue";

const authStore = useAuthStore();

onMounted(() => {
  // Connect to the socket server
  authStore.connect();
  authStore.onConnect();
});

onUnmounted(() => {
  // Clean up event listeners on component unmount
  socketService.disconnect();
});
</script>

<style>
/* Styles are imported from index.css */
</style>
