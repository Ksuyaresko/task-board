<template>
  <header>
    <h1>Collaborative Workspace</h1>
    <div class="connection-status">
      <span :class="classStatus" />
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../../stores/index.js";
const authStore = useAuthStore();

const classStatus = computed(() => ({
  status: true,
  connected: authStore.isConnected,
  disconnected: !authStore.isConnected,
}));
</script>
