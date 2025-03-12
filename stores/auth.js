// stores/auth.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { socketService } from "../services/socketService";

export const useAuthStore = defineStore("auth", () => {
  const currentUser = ref(null);
  const id = ref(null);
  const isConnected = ref(false);

  // move connection logic to separate store
  const connect = () => {
    socketService.connect();
  };

  const onConnect = () => {
    socketService.onConnect(() => {
      isConnected.value = true;
    });
  };

  const disconnect = () => {
    socketService.disconnect();
  };
  const login = (userData) => {
    currentUser.value = userData;
    socketService.joinWorkspace(userData);
  };

  const logout = () => {
    currentUser.value = null;
    socketService.disconnect();
  };

  const setConnectionStatus = (status) => {
    isConnected.value = status;
  };

  return {
    currentUser,
    id,
    isConnected,
    connect,
    onConnect,
    disconnect,
    login,
    logout,
    setConnectionStatus,
  };
});
