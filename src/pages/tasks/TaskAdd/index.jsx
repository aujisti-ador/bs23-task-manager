import React, { useEffect, useState } from 'react';
import "./index.css";
import { useDispatch, useSelector } from 'react-redux';
import { getMemberListAsync } from '../../../store/slices/memberSlice';

function TaskAdd() {

    const { data: memberList, loading, error } = useSelector((state) => state.member);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMemberListAsync());
    }, [dispatch]);

    // State for form inputs
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

    return (
        <div className='container-add-task'>
            <h2>Add New Task</h2>
            <form>
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
