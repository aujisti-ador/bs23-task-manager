import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTaskList } from '../../api/fetchApi';

//  async thunk for the login action
export const getTaskListAsync = createAsyncThunk('task/getTaskListAsync', async () => {
    try {
        const response = await fetchTaskList();
        console.log("===> response", response)
        // dispatch(clearError())
        return response;
    } catch (error) {
        // Handle error, dispatch an error action, etc.
        console.error('Task List data fetching failed:', error.message);
        throw error;
    }
});

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        loading: false,
        data: [],
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
            });
    },

});

export const { } = taskSlice.actions;
export const selectTask = (state) => state.task;
export default taskSlice.reducer;
