<template>
  <div class="workspace-container">
    Welcome, {{ authStore.currentUser.name }}

    <div v-if="workspaceStore" class="wrapper">
      <Board />
      <Chat />
    </div>

    <p v-else>Loading workspace...</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore, useWorkspaceStore } from "../../stores/index.js";
import Board from "./Board.vue";
import Chat from "../Chat/Chat.vue";

const authStore = useAuthStore();
const workspaceStore = useWorkspaceStore();

onMounted(() => {
  workspaceStore.initialize();
});
</script>

<style scoped>
.wrapper {
  display: grid;
  gap: 20px;
  grid-template-columns: 3fr 1fr;
}
</style>
