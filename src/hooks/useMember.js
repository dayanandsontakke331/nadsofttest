import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const useMember = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    // const pageSize = 5;

    const fnValidator = (payload) => {
        if(!payload.name || !payload.email || !payload.age < 18) {
            Swal.fire('Error!', 'Requied fields name, email and age, age must be greater than 18.', 'success');
            return;
        }
    }

    // fetch all student member
    const fnFetchUsers = (payload) => {
        console.log('Fetching users with payload:', payload);

        axios.post('http://localhost:8080/member/getMembers', payload)
            .then((resp) => {
                setUsers(resp.data.data);
                setTotalPages(Math.ceil(resp.data.totalRecords / pageSize));
            })
            .catch((err) => {
                console.log('Fetching members error', err);
            });
    };

    // function delete member
    const fnDeleteMember = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `If you delete this Member Then this action can not be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel!',
            reverseButtons: false,
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8080/member/deleteStudentMember', { id })
                    .then(() => {
                        Swal.fire('Success!', 'Member deleted successfully.', 'success');
                        fnFetchUsers({ start: (currentPage - 1) * pageSize, limit: pageSize });
                    })
                    .catch((err) => {
                        console.error('Error deleting member:', err);
                        Swal.fire('Error!', 'There was an error deleting the member.', 'error');
                    });
            } else {
                Swal.fire('Cancelled', 'The member was not deleted.', 'info');
            }
        });
    };

    // function add member
    const fnAddMember = (payload) => {
        axios.post('http://localhost:8080/member/addMemberStudent', { ...payload })
            .then((res) => {
                if (res?.data?.error) {
                    Swal.fire('Error!', res.data.error, 'error');
                    return
                }
                if (res.data.message) {
                    Swal.fire('Success!', 'New member added successfully.', 'success');
                    fnFetchUsers({ start: (currentPage - 1) * pageSize, limit: pageSize });
                }
            })
            .catch((err) => {
                console.error('Error adding member:', err);
            });
    };

    // function update student member
    const fnUpdateMember = (payload) => {
        axios.post('http://localhost:8080/member/updateStudentMember', { ...payload })
            .then((res) => {
                if (res.data.message) {
                    Swal.fire('Success!', 'Member updated successfully.', 'success');
                    fnFetchUsers({ start: (currentPage - 1) * pageSize, limit: pageSize });
                }
            })
            .catch((err) => {
                console.error('Error updating member:', err);
            });
    };

    return {
        users,
        setUsers,
        fnFetchUsers,
        fnAddMember,
        fnUpdateMember,
        fnDeleteMember,
        currentPage,
        setCurrentPage,
        totalPages,
        pageSize,
        setPageSize
    };
};

export default useMember;
