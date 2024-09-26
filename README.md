# TodoFlow

This is a **TodoFlow Application** built using **React** and **Redux** for managing tasks. It allows users to add, update, delete, and search todos. The app is responsive and provides a seamless user experience to manage tasks efficiently.

## Features

- **Add Todo**: Create a new todo task with details like title, description, date, location, and status.
- **Edit Todo**: Modify the existing todo details.
- **Delete Todo**: Remove any task from the list.
- **Toggle Status**: Mark tasks as completed or active.
- **Search Todos**: Find specific tasks based on their title or content.
- **Persistent State**: Todos are managed using Redux to maintain state across components.
## Technologies Used

- **React**: Frontend library to create interactive UI.
- **Redux**: State management library.
- **Redux Thunk**: Middleware for handling async actions.
- **Bootstrap**: For styling and responsive design.
- **Axios**: For making HTTP requests.
- **Node.js** and **Express.js**: For backend API .
- **JWT**: For authenticate the user.
- **MongoDB**: For database storage.

### Installation

1. Clone the repository and navigate to the `client` folder:

```
git clone https://github.com/manoje8/todo-flow.git
cd todo-flow
```

2. Install the dependencies:

```
npm install
```


3. Start the development server:

```
npm start
```
---

## Available Scripts

In the project directory, you can run the following scripts:

### `npm start`

Runs the app in development mode.  
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.  
It bundles React in production mode and optimizes the build for the best performance.

---

## Usage

1. **Add a New Todo**: Click the '+' icon or use the form at the bottom of the list to add a new task.
2. **Edit Todo**: Click on any task to edit its details.
3. **Delete Todo**: Use the red icon to remove any task from the list.
4. **Search**: Use the search bar at the top to filter tasks based on their title.
5. **Toggle Status**: Mark tasks as completed or active by clicking the green icon.