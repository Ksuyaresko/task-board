# Collaborative Workspace Dashboard

## Overview

For this application was used: Vue3, Pinia, Socket.io, and VueDraggableNext.

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the mock server:
   ```
   npm run server
   ```
4. In another terminal, start the frontend development server:
   ```
   npm run dev
   ```
5. Open your browser to the URL shown in the terminal (typically http://localhost:5173)

## Project Structure

The repository includes:

- A mock Socket.io server (/server)
- Basic frontend scaffolding for both React and Vue
- Empty directories for you to implement your component structure

## Available Socket Events

The mock server implements these events:

- **user:join** - Send when a user joins with their name and avatar
- **user:status** - Send when a user changes their status
- **task:create** - Send when a user creates a new task
- **task:update** - Send when a user updates a task
- **task:move** - Send when a user moves a task between columns
- **message:send** - Send when a user sends a chat message
- **user:typing** - Send when a user starts/stops typing
- **workspace:update** - Received with the current workspace state after any change

## Socket Event Reference

The mock server handles all socket interactions, so you only need to implement the client-side events:

```javascript
// Connect to the server
socketService.connect();

// Join the workspace (after login)
socketService.joinWorkspace({ name: "User Name", avatar: "1" });

// Change user status
socketService.updateStatus("away"); // 'active', 'away', or 'do-not-disturb'

// Create a new task
socketService.createTask({
  title: "Task Title",
  description: "Task Description",
  status: "todo", // 'todo', 'in-progress', or 'done'
});

// Update an existing task
socketService.updateTask({
  id: "task-1",
  title: "Updated Title",
  description: "Updated Description",
});

// Move a task to a different status
socketService.moveTask("task-1", "in-progress");

// Send a chat message
socketService.sendMessage("Hello team!");

// Send typing indicator
socketService.setTyping(true); // or false when stopped typing
```
