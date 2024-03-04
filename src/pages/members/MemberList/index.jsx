import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./index.css";
import { useDispatch, useSelector } from 'react-redux';
import { getMemberListAsync } from '../../../store/slices/memberSlice';

function MemberList() {
  const { data, loading, error } = useSelector((state) => state.member);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemberListAsync());
  }, [dispatch]);

  return (
    <div className='container-memberlist'>
      <h1>Member List</h1>

      <div className="scrollable-table">
        {loading && <p>Loading members...</p>}

        {error && <p>Error loading members: {error.message}</p>}

        {data.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>
                    <Link to={`/dashboard/members/${member.id}`}>View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MemberList;

