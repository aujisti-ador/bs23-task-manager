import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTaskByIdAsync } from '../../../store/slices/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import "./index.css";

function TaskDetails() {
  const { taskId } = useParams();
  const { taskDetails, loading, error } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  // States for editing
  const [isEditing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({});

  useEffect(() => {
    dispatch(getTaskByIdAsync(taskId));
  }, [dispatch, taskId]);

  const handleEditClick = () => {
    setEditedTask({ ...taskDetails }); // Save a copy of the task for editing
    setEditing(true);
  };

  const handleDeleteClick = () => {
    // Add logic for deleting the task
    console.log('Delete button clicked');
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSaveEdit = () => {
    // Implement logic to save the edited task details
    console.log('Save edited task:', editedTask);
    setEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <div className='container-details'>
      <h2>Task Details</h2>
      {loading && <p>Loading task details...</p>}
      {error && <p>Error loading task details {error.message}</p>}
      {taskDetails && !loading && (
        <div>
          {isEditing ? (
            // Edit mode with input fields
            <div>
              <label>Title: </label>
              <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleInputChange}
              />
              <br />
              <label>Description: </label>
              <textarea
                name="description"
                value={editedTask.description}
                onChange={handleInputChange}
              />
              <br />
              <label>Assigned To: </label>
              <input
                type="text"
                name="assignedTo"
                value={editedTask.assignedTo}
                onChange={handleInputChange}
              />
              <br />
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            // Display mode
            <div>
              <p><strong>Title:</strong> {taskDetails.title}</p>
              <p><strong>Description:</strong> {taskDetails.description}</p>
              <p><strong>Assigned To:</strong> {taskDetails.assignedTo}</p>

              {/* Edit and Delete buttons */}
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={handleDeleteClick}>Delete</button>
              {/* Include the delete button as needed */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskDetails;
