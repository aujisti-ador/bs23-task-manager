import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./index.css";
import { useDispatch, useSelector } from 'react-redux';
import { getTaskListAsync } from '../../../store/slices/taskSlice';

// function TasksList() {
//   const { data, loading, error } = useSelector((state) => state.task);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getTaskListAsync());
//   }, [dispatch]);

//   return (
//     <div className='container-tasklist'>
//       <h1>Task List</h1>

//       <div className="scrollable-table">
//         {loading && <p>Loading tasks...</p>}

//         {error && <p>Error loading tasks: {error.message}</p>}

//         {data.length > 0 && (
//           <table>
//             <thead>
//               <tr>
//                 <th>Id</th>
//                 <th>Title</th>
//                 <th>Description</th>
//                 <th>Assigned to</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((task) => (
//                 <tr key={task.id}>
//                   <td>{task.id}</td>
//                   <td>{task.title}</td>
//                   <td>{task.description}</td>
//                   <td>{task.assignedTo}</td>
//                   <td>
//                     <Link to={`/dashboard/tasks/${task.id}`}>View Details</Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TasksList;

// ... (import statements remain unchanged)

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
        <Link to="/dashboard/tasks/new" className="add-task-button">
          Add New Task
        </Link>

        {loading && <p>Loading tasks...</p>}

        {error && <p>Error loading tasks: {error.message}</p>}

        {data.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Assigned to</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>
                    <Link to={`/dashboard/tasks/${task.id}`}>{task.title}</Link>
                  </td>
                  <td>{task.description}</td>
                  <td>{task.assignedTo}</td>
                  <td>{task.createdAt}</td>
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
