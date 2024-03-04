import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./index.css";
import { getMemberByIdAsync } from '../../../store/slices/memberSlice';
// import { getMemberByIdAsync, updateMemberAsync, deleteMemberAsync } from '../../../store/slices/memberSlice';

function MemberDetails() {
    const { memberId } = useParams();
    const { memberDetails, loading, error } = useSelector((state) => state.member);
    const dispatch = useDispatch();

    // State for editable fields
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({
        name: '',
        email: '',
    });

    useEffect(() => {
        dispatch(getMemberByIdAsync(memberId));
    }, [dispatch, memberId]);

    // Function to handle entering edit mode
    const handleEdit = () => {
        setEditMode(true);
        // Set input fields to current member details
        setEditData({
            name: memberDetails.name,
            email: memberDetails.email,
        });
    };

    // Function to handle saving edits
    const handleSave = () => {
        // dispatch(updateMemberAsync({ memberId, ...editData }));
        setEditMode(false);
    };

    // Function to handle deleting member
    const handleDelete = () => {
        // dispatch(deleteMemberAsync(memberId));
    };

    // Function to handle canceling edit mode
    const handleCancelEdit = () => {
        setEditMode(false);
    };

    return (
        <div className='container-details'>
            <h2>Member Details</h2>
            {loading && <p>Loading member details...</p>}
            {error && <p>Error loading member details {error.message}</p>}
            {memberDetails && !loading && (
                <div>
                    <p><strong>Name:</strong> {memberDetails.name}</p>
                    <p><strong>Email:</strong> {memberDetails.email}</p>

                    {/* Edit and Delete Buttons */}
                    {!editMode && (
                        <div className='button-container'>
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    )}

                    {/* Editable Fields */}
                    {editMode && (
                        <div>
                            <label>Edit Name:</label>
                            <input
                                type="text"
                                value={editData.name}
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            />
                            <br />

                            <label>Edit Email:</label>
                            <input
                                type="text"
                                value={editData.email}
                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            />
                            <br />

                            {/* Save and Cancel Buttons */}
                            <div className='button-container'>
                                <button onClick={handleSave}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default MemberDetails;
