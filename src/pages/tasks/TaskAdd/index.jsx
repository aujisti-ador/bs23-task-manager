import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMemberListAsync } from '../../../store/slices/memberSlice';
import { addTaskAsync } from '../../../store/slices/taskSlice'; // Import the action for adding a task
import "./index.css";

function TaskAdd() {
    const { data: memberList, loading, error } = useSelector((state) => state.member);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMemberListAsync());
    }, [dispatch]);

    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        assignedTo: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (taskData.title && taskData.description && taskData.assignedTo) {
            // Dispatch an action to add the task
            dispatch(addTaskAsync(taskData));

            // Reset the form after submission
            setTaskData({
                title: '',
                description: '',
                assignedTo: '',
            });
        } else {
            // Handle validation error, show a message, etc.
            console.error('Please fill in all fields.');
        }
    };

    return (
        <div className='container-add-task'>
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={taskData.title}
                    onChange={handleInputChange}
                />
                <br />

                <label>Description:</label>
                <textarea
                    name="description"
                    value={taskData.description}
                    onChange={handleInputChange}
                />
                <br />

                <label>Assigned To:</label>
                <select
                    name="assignedTo"
                    value={taskData.assignedTo}
                    onChange={handleInputChange}
                >
                    <option value="">Select Member</option>
                    {memberList.map((member) => (
                        <option key={member.id} value={member.name}>
                            {member.name}
                        </option>
                    ))}
                </select>
                <br />

                <button type="submit">Add Task</button>
            </form>
        </div>
    );
}

export default TaskAdd;
