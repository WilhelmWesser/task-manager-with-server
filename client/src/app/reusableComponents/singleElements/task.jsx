import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useTasks } from "../../hooks/useTasks";
// TODO
//
// get task content on pageload
//
//
//
//
//
const Task = ({ _id, color, onDelete }) => {
    const history = useHistory();
    const { getTaskById } = useTasks();
    const taskToEdit = getTaskById(_id);

    const handleEditClick = () => {
        history.push(`/myTasks/edit/${_id}`);
    };

    return (
        <div
            key={_id}
            className={`card border-${color} mb-3 shadow-sm`}
            style={{ maxWidth: "18rem" }}
        >
            <div className="d-flex flex-row justify-content-between">
                <div className="card-header text-center">
                    <h6>{taskToEdit.responsible}</h6>
                </div>
                <div className="d-flex">
                    <button
                        type="button"
                        className="btn btn-warning text-dark"
                        onClick={() => {
                            handleEditClick();
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                        >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                            <path
                                fillRule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            ></path>
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        aria-label="Close"
                        onClick={() => {
                            onDelete(_id);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-x-lg"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                            />
                            <path
                                fillRule="evenodd"
                                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`card-body text-${color}`}>
                <h5 className="card-title text-center">{taskToEdit.heading}</h5>
                <h6 className="card-title text-center">{taskToEdit.content}</h6>
                <h5 className="card-title text-center text-danger">
                    {taskToEdit.terms}
                </h5>
            </div>
        </div>
    );
};

Task.propTypes = {
    _id: PropTypes.string,
    color: PropTypes.string,
    responsible: PropTypes.string,
    heading: PropTypes.string,
    terms: PropTypes.string,
    content: PropTypes.string,
    onDelete: PropTypes.func
};
export default Task;
