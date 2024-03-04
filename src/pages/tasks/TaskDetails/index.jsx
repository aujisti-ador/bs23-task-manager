import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTaskByIdAsync } from '../../../store/slices/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import "./index.css"

function TaskDetails() {
  const { taskId } = useParams();
  const { taskDetails, loading, error } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskByIdAsync(taskId));
  }, [dispatch, taskId]);

  return (
    <div className='container-details'>
      <h2>Task Details</h2>
      {loading && <p>Loading task details...</p>}
      {error && <p>Error loading task details {error.message}</p>}
      {taskDetails && !loading && (
        <div>
          <p><strong>Title:</strong> {taskDetails.title}</p>
          <p><strong>Description:</strong> {taskDetails.description}</p>
          <p><strong>Assigned To:</strong> {taskDetails.assignedTo}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
}

export default TaskDetails;
