import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./index.css"
import { getMemberByIdAsync } from '../../../store/slices/memberSlice';

function MemberDetails() {
    const { memberId } = useParams();
    const { memberDetails, loading, error } = useSelector((state) => state.member);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMemberByIdAsync(memberId));
    }, [dispatch, memberId]);

    return (
        <div className='container-details'>
            <h2>Task Details</h2>
            {loading && <p>Loading member details...</p>}
            {error && <p>Error loading member details {error.message}</p>}
            {memberDetails && !loading && (
                <div>
                    <p><strong>Name:</strong> {memberDetails.name}</p>
                    <p><strong>Email:</strong> {memberDetails.email}</p>
                </div>
            )}
        </div>
    );
}

export default MemberDetails;
