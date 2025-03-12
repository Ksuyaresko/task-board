<template>
  <div class="kanban-board">
    <div
      v-for="column in workspaceStore.getTasksByStatus"
      :key="column.status"
      :class="potentialParent === column.status ? 'column active' : 'column'"
    >
      <ColumnHeader :column="column" />
      <VueDraggableNext
        :list="column.tasks"
        class="draggableArea"
        :group="{ name: 'column.status', pull: true, put: true }"
        @change="log($event, column.status)"
        :move="checkMove"
        :data-status="column.status"
      >
        <div
          v-for="element in column.tasks"
          :key="element.name"
          :id="element.id"
        >
          <Task :element="element" />
        </div>
      </VueDraggableNext>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import { useWorkspaceStore } from "../../stores";
import Task from "./Task.vue";
import ColumnHeader from "./ColumnHeader.vue";

const workspaceStore = useWorkspaceStore();

onMounted(() => {
  workspaceStore.initialize();
});

const potentialParent = ref(null);
const checkMove = (evt) => {
  potentialParent.value = evt.to.getAttribute("data-status");
};

const log = (event) => {
  if (event.added) {
    workspaceStore.moveTask(event.added.element.id, potentialParent.value);
    potentialParent.value = null;
  }
};
</script>

<style scoped>
.kanban-board {
  display: flex;
  justify-content: space-between;
}

.column {
  width: 30%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.active {
  border: 1px solid #007bff;
}

.draggableArea {
  min-height: 100px;
}
</style>
