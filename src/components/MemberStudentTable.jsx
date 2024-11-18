import React, { useState, useEffect } from 'react';
import AddMemberModal from './AddMemberModal';
import useMember from '../hooks/useMember';

const MemberStudentTable = () => {
    // hooks
    const [open, setOpen] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    // custom hooks we can also create pagination custom hook
    const {
        users,
        fnFetchUsers,
        fnAddMember,
        fnDeleteMember,
        fnUpdateMember,
        currentPage,
        setCurrentPage,
        totalPages,
        pageSize,
        setPageSize,
    } = useMember();

    useEffect(() => {
        const start = (currentPage - 1) * pageSize;
        const payload = { start: start, limit: pageSize };
        fnFetchUsers(payload);
    }, [currentPage, pageSize]);

    const handleAddMember = () => {
        setUserDetails(null);
        setOpen(true);
    };

    const handleEditMember = (user) => {
        setUserDetails(user);
        setOpen(true);
    };

    const handleSaveMember = (newUserData) => {
        if (userDetails) {
            fnUpdateMember({ ...userDetails, ...newUserData });
        } else {
            fnAddMember({ ...newUserData, mark: 10 });
        }
        setOpen(false);
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1);
    };

    return (
        <div>
            <div className="text-center m-3">
                <h1>Manage Students</h1>
            </div>
            <div className="m-5">
                <button
                    type="button"
                    className="btn btn-success float-end m-2"
                    onClick={handleAddMember}
                >
                    Add New Member
                </button>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Age</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <span
                                        className="m-2"
                                        style={{ cursor: 'pointer', fontSize: '18px' }}
                                        onClick={() => handleEditMember(user)}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </span>
                                    <i
                                        className="bi bi-trash text-danger"
                                        style={{ cursor: 'pointer', fontSize: '18px' }}
                                        onClick={() => fnDeleteMember(user.id)}
                                    ></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between mb-3">
                    <div>
                        <label className="me-2">Show entries:</label>
                        <select
                            className="form-select d-inline-block"
                            style={{ width: 'auto' }}
                            value={pageSize}
                            onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <div className="float-end">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => handlePageChange(1)}>
                                        First
                                    </a>
                                </li>
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>
                                        Previous
                                    </a>
                                </li>
                                {[...Array(totalPages).keys()].map((page) => (
                                    <li
                                        key={page}
                                        className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}
                                    >
                                        <a
                                            className="page-link"
                                            href="#"
                                            onClick={() => handlePageChange(page + 1)}
                                        >
                                            {page + 1}
                                        </a>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>
                                        Next
                                    </a>
                                </li>
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => handlePageChange(totalPages)}>
                                        Last
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <AddMemberModal
                open={open}
                setOpen={setOpen}
                userDetails={userDetails}
                onSave={handleSaveMember}
            />
        </div>
    )
}

export default MemberStudentTable