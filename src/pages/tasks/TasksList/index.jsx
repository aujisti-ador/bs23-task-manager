import React, { useEffect } from 'react';
import "./index.css";
import { useDispatch, useSelector } from 'react-redux';
import { getTaskListAsync } from '../../../store/slices/taskSlice';

function TasksList() {
  const { data, loading, error } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskListAsync());
  }, [dispatch]);

  return (
    <div className='container-tasklist'>
      <h1>Task List</h1>

      <div className="scrollable-table">
        {loading && <p>Loading tasks...</p>}

        {error && <p>Error loading tasks: {error.message}</p>}

        {data.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Assigned to</th>
                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {data.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.assignedTo}</td>
                  {/* Add more columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TasksList;
