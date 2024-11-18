import React, { useState, useEffect } from 'react';

const AddMemberModal = ({ open, setOpen, userDetails, setUserDetails, onSave }) => {
    const [modalData, setModalData] = useState({
        name: '',
        email: '',
        age: '',
        parentId: ''
    });

    useEffect(() => {
        if (userDetails) {
            setModalData({ ...userDetails });
        }
    }, [userDetails]);

    const closeModal = () => {
        setOpen(false);
        setModalData({ name: '', email: '', age: '', parentId: '' });
    };

    const fnHandleChange = (e) => {
        const { id, value } = e.target;
        if (id === 'age') {
            setModalData((prevData) => ({ ...prevData, [id]: value ? Number(value) : '' }));
        } else {
            setModalData((prevData) => ({ ...prevData, [id]: value }));
        }
    };

    const fnHandleSubmit = () => {
        onSave(modalData);
        closeModal();
        setModalData({ name: '', email: '', age: '', parentId: '' });
    };

    return (
        <>
            {open && (
                <div
                    className="modal fade show"
                    id="addMemberModal"
                    tabIndex="-1"
                    aria-labelledby="addMemberModalLabel"
                    aria-hidden="true"
                    style={{ display: 'block' }}
                >
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '600px', width: '100%' }}>
                        <div
                            className="modal-content shadow-lg p-3 mb-5 bg-body rounded"
                            style={{ border: 'none', backgroundColor: '#fff' }}
                        >
                            <div className="modal-header">
                                <h5 className="modal-title" id="addMemberModalLabel">
                                    {userDetails ? 'Edit Member' : 'Add Member'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Member Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        value={modalData.name}
                                        onChange={fnHandleChange}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={modalData.email}
                                        onChange={fnHandleChange}
                                        placeholder="ex@gmail.com"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        id="age"
                                        className="form-control"
                                        value={modalData.age}
                                        onChange={fnHandleChange}
                                        placeholder="Age"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="parentId" className="form-label">
                                        Member Parent Id
                                    </label>
                                    <input
                                        type="text"
                                        id="parentId"
                                        className="form-control"
                                        value={modalData.parentId}
                                        onChange={fnHandleChange}
                                        placeholder="Parent ID"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button type="button" className="btn btn-primary" onClick={fnHandleSubmit}>
                                    {userDetails ? 'Update Member' : 'Add New Member'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddMemberModal;
