import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMemberList } from '../../api/fetchApi';

//  async thunk for the login action
export const getMemberListAsync = createAsyncThunk('member/getMemberListAsync', async () => {
    try {
        const response = await fetchMemberList();
        return response;
    } catch (error) {
        // Handle error
        console.error('Member List data fetching failed:', error.message);
        throw error;
    }
});

export const getMemberByIdAsync = createAsyncThunk('member/getMemberByIdAsync', async (memberId) => {
    try {
        const response = await fetchMemberList();
        console.log(memberId)
        const foundMember = response.find(data => data.id == memberId);

        if (foundMember) {
            console.log('Found Member:', foundMember);
            return foundMember;
        } else {
            throw new Error('Member not found:', memberId);
        }
    } catch (error) {
        // Handle error
        console.error('Member List data fetching failed:', error.message);
        throw error;
    }
});

// export const updateTaskAsync = createAsyncThunk('task/updateTaskAsync', async ({ id, title, description }) => {
//     try {
//         // Fetch the current task list
//         const response = await fetchTaskList();

//         // Find the index of the task to be updated
//         const taskIndex = response.findIndex((task) => task.id === id);

//         if (taskIndex !== -1) {
//             // Create a new task object with updated values
//             const updatedTask = { ...response[taskIndex], title, description };

//             // Update the task in the array
//             response[taskIndex] = updatedTask;

//             // Save the updated task list
//             await updateTask(response);

//             // Return the updated task
//             return updatedTask;
//         } else {
//             throw new Error(`Task not found with id: ${id}`);
//         }
//     } catch (error) {
//         console.error('Updating task failed:', error.message);
//         throw error;
//     }
// });

const memberSlice = createSlice({
    name: 'member',
    initialState: {
        loading: false,
        data: [],
        memberDetails: null,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMemberListAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMemberListAsync.fulfilled, (state, action) => {
                console.log("===> action", action)
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getMemberListAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getMemberByIdAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMemberByIdAsync.fulfilled, (state, action) => {
                console.log("===> action", action)
                state.loading = false;
                state.memberDetails = action.payload;
            })
            .addCase(getMemberByIdAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { } = memberSlice.actions;
export const selectMember = (state) => state.member;
export default memberSlice.reducer;
