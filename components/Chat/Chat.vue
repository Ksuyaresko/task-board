<template>
  <div>
    <h2 class="title">Chat</h2>
    <span>There are {{ workspaceStore.users.list.length }} users online</span>
    <div class="wrapper">
      <div v-for="message in workspaceStore.messages.list" :key="message.id">
        <div class="message">{{ message.text }}</div>
        <div class="author">{{ message.userId }}</div>
      </div>

      <div class="actions">
        <input
          v-model="message"
          @keyup.enter="sendMessage"
          @keydown="setTyping"
        /><button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from "vue";
import { useWorkspaceStore } from "../../stores/index.js";
const workspaceStore = useWorkspaceStore();

const message = ref("");
let isTyping = false;
let typingTimerId;

const sendMessage = () => {
  if (!message.value.trim()) return;
  workspaceStore.sendMessage(message.value);
  message.value = "";
};

const setTyping = () => {
  if (typingTimerId) clearTimeout(typingTimerId);
  if (!isTyping) {
    isTyping = true;
    workspaceStore.setTyping(true);
  }
  if (message) {
    typingTimerId = setTimeout(() => {
      isTyping = false;
      workspaceStore.setTyping(false);
    }, 2000);
  }
};

onBeforeUnmount(() => {
  workspaceStore.setTyping(false);
  if (typingTimerId) clearTimeout(typingTimerId);
});
</script>

<style scoped>
.title {
  display: inline-block;
  margin-right: 10px;
}
.wrapper {
  min-height: calc(100vh - 200px);
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 5px;
}
.message {
  background-color: var(--secondary-color);
  color: var(--light-color);
  margin: 10px 0 0 0;
  padding: 5px;
  border-radius: 5px;
}
.author {
  font-size: 0.6rem;
  color: var(--primary-color);
  text-align: right;
}
.actions {
  display: flex;
  gap: 10px;
}
</style>
