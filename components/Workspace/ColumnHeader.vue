<template>
  <div>
    <h2 draggable="true">
      {{ column.status }}
    </h2>
    <div class="task-header">
      <input class="input" v-model="newTaskTitleValue" />
      <button @click="addTask(column.status, $event)">Add</button>
    </div>
  </div>
</template>

<script setup>
import {defineProps, ref} from "vue";
import { useWorkspaceStore } from "../../stores/index.js";

defineProps(["column"]);
const workspaceStore = useWorkspaceStore();
const newTaskTitleValue = ref('')
const addTask = (status) => {
  workspaceStore.createTask({ title: newTaskTitleValue.value, status });
  newTaskTitleValue.value = '';
};
</script>

<style scoped>
.task-header {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 15px;
}
input {
  margin-bottom: 0;
}
</style>
