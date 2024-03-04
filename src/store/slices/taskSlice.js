import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTaskList } from '../../api/fetchApi';

// api/fetchApi.js

export const updateTask = async (updatedTaskList) => {
    try {
        // Assuming the taskList.json file is in the same directory
        const filePath = '../../api/taskList.json';

        // Update the task list in the JSON file
        const updatedTaskListJson = JSON.stringify(updatedTaskList, null, 2);
        // Using the 'fs' module to write to the file (Node.js environment)
        // const fs = require('fs');

        // fs.writeFileSync(filePath, updatedTaskListJson);

        console.log('Task list updated successfully!');
    } catch (error) {
        console.error('Updating task list failed:', error.message);
        throw error;
    }
};

// Define the async thunk for adding a task
export const addTaskAsync = createAsyncThunk('task/addTaskAsync', async (newTask) => {
    try {
        // Fetch the current task list
        const currentTaskList = await fetchTaskList(); // You need to implement this function

        // Add the new task to the list
        const updatedTaskList = [...currentTaskList, newTask];

        // Update the local JSON file with the new task list
        await updateTask(updatedTaskList);

        return updatedTaskList;
    } catch (error) {
        console.error('Adding task failed:', error.message);
        throw error;
    }
});
//  async thunk for the login action
export const getTaskListAsync = createAsyncThunk('task/getTaskListAsync', async () => {
    try {
        const response = await fetchTaskList();
        return response;
    } catch (error) {
        // Handle error
        console.error('Task List data fetching failed:', error.message);
        throw error;
    }
});

export const getTaskByIdAsync = createAsyncThunk('task/getTaskByIdAsync', async (taskId) => {
    try {
        const response = await fetchTaskList();
        console.log(taskId)
        const foundTask = response.find(data => data.id == taskId);

        if (foundTask) {
            console.log('Found Task:', foundTask);
            return foundTask;
        } else {
            throw new Error('Task not found:', taskId);
        }
    } catch (error) {
        // Handle error
        console.error('Task List data fetching failed:', error.message);
        throw error;
    }
});

export const updateTaskAsync = createAsyncThunk('task/updateTaskAsync', async ({ id, title, description }) => {
    try {
        // Fetch the current task list
        const response = await fetchTaskList();

        // Find the index of the task to be updated
        const taskIndex = response.findIndex((task) => task.id === id);

        if (taskIndex !== -1) {
            // Create a new task object with updated values
            const updatedTask = { ...response[taskIndex], title, description };

            // Update the task in the array
            response[taskIndex] = updatedTask;

            // Save the updated task list
            await updateTask(response);

            // Return the updated task
            return updatedTask;
        } else {
            throw new Error(`Task not found with id: ${id}`);
        }
    } catch (error) {
        console.error('Updating task failed:', error.message);
        throw error;
    }
});

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        loading: false,
        data: [],
        taskDetails: null,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTaskListAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTaskListAsync.fulfilled, (state, action) => {
                console.log("===> action", action)
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getTaskListAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getTaskByIdAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTaskByIdAsync.fulfilled, (state, action) => {
                console.log("===> action", action)
                state.loading = false;
                state.taskDetails = action.payload;
            })
            .addCase(getTaskByIdAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addTaskAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                console.log("===> action", action)
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addTaskAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { } = taskSlice.actions;
export const selectTask = (state) => state.task;
export default taskSlice.reducer;
