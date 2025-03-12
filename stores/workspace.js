// stores/workspace.js
import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { socketService } from "../services/socketService";

// move to constants
const STATUSES = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  DONE: "done",
};
export const useWorkspaceStore = defineStore("workspace", () => {
  const tasks = reactive({ list: [] });
  // move to chat to separate store
  const messages = reactive({ list: [] });
  const users = reactive({ list: [] });

  const getTasksByStatus = computed({
    get() {
      // @todo statuses should be dynamic
      const taskMap = {
        [STATUSES.TODO]: [],
        [STATUSES.IN_PROGRESS]: [],
        [STATUSES.DONE]: [],
      };

      if (tasks.list) {
        for (let i = 0; i < tasks.list.length; i++) {
          taskMap[tasks.list[i].status].push(tasks.list[i]);
        }
      }

      return [
        { status: STATUSES.TODO, tasks: taskMap[STATUSES.TODO] },
        { status: STATUSES.IN_PROGRESS, tasks: taskMap[STATUSES.IN_PROGRESS] },
        { status: STATUSES.DONE, tasks: taskMap[STATUSES.DONE] },
      ];
    },
  });

  const initialize = () => {
    socketService.onWorkspaceUpdate((data) => {
      tasks.list = data.tasks;
      messages.list = data.messages;
      users.list = data.users;
    });
  };

  const createTask = (taskData) => {
    tasks.list.push(taskData);
    socketService.createTask(taskData);
  };

  const updateTask = (taskData) => {
    socketService.updateTask(taskData);
    // update store, now we don't need, because we will get updated data from server even if update done with same user
  };

  const moveTask = (taskId, newStatus) => {
    socketService.moveTask(taskId, newStatus);
    // update store, now we don't need, because we will get updated data from server even if update done with same user
    // tasks.list.find((task) => task.id === taskId).status = newStatus;
  };

  // move to chat store
  const sendMessage = (message) => {
    socketService.sendMessage(message);
  };

  const setTyping = (isTypingNew) => {
    socketService.setTyping(isTypingNew);
  };

  return {
    tasks,
    getTasksByStatus,
    messages,
    users,
    initialize,
    createTask,
    updateTask,
    moveTask,
    sendMessage,
    setTyping,
  };
});
