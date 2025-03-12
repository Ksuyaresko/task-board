<template>
  <div class="task">
    <template v-if="editable">
      <input v-model="title" />
      <input v-model="description" />
      <div class="actions">
        <button @click="close" class="secondary">Close</button>
        <button @click="onUpdate">Save</button>
      </div>
    </template>
    <template v-else>
      <div class="right-button">
        <button @click="toEditable">Edit</button>
      </div>
      <h3>{{ element.title }}</h3>
      <div>{{ element.description }}</div>
      <!--@todo add createdBy, createdAt-->
    </template>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useWorkspaceStore } from "../../stores/index.js";
const props = defineProps(["element"]);

const workspaceStore = useWorkspaceStore();
const editable = ref(false);
const title = ref(props.element.title);
const description = ref(props.element.description);

const toEditable = () => {
  editable.value = !editable.value;
};

const onUpdate = () => {
  workspaceStore.updateTask({
    id: props.element.id,
    title: title.value,
    description: description.value,
  });
  editable.value = false;
};

const close = () => {
  editable.value = false;
  title.value = props.element.title;
  description.value = props.element.description;
};
</script>

<style scoped>
.task {
  cursor: grab;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.right-button {
  display: flex;
  justify-content: end;
  gap: 10px
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  * {
    flex: 1 1 auto;
  }
}
</style>
