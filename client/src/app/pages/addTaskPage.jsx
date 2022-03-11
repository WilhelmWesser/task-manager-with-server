import React, { useState } from "react";
import validateTaskFields from "../utils/validators/taskCreationValidator";
import { useHistory } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/user";

const AddTaskPage = () => {
    const history = useHistory();
    const currentUserId = useSelector(getCurrentUserId());
    const [data, setData] = useState({
        _id: nanoid(),
        pageId: currentUserId,
        heading: "",
        status: "",
        priority: "",
        responsible: "",
        terms: "",
        content: ""
    });

    const handleChange = (event) => {
        let preWorkedValue = event.target.value;

        switch (preWorkedValue) {
            case "urgent":
                preWorkedValue = {
                    rate: 3,
                    canWaitForExecution: event.target.value
                };
                break;
            case "for 1-3 days":
                preWorkedValue = {
                    rate: 2,
                    canWaitForExecution: event.target.value
                };
                break;
            case "for a long time":
                preWorkedValue = {
                    rate: 1,
                    canWaitForExecution: event.target.value
                };
                break;
            default:
                break;
        }

        setData((prevState) => ({
            ...prevState,
            [event.target.name]: preWorkedValue
        }));
    };

    const { addTask } = useTasks();
    const handleTaskCreation = (event) => {
        event.preventDefault();
        if (validateTaskFields(data)) {
            addTask(data);
            history.push("/myTasks");
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="d-flex flex-column justify-content-center w-25 mt-5">
                <form>
                    <div className="d-flex flex-column justify-content-center">
                        <div className="d-flex flex-column justify-content-center">
                            <div className="input-group mb-2 border-dark">
                                <input
                                    name="heading"
                                    type="text"
                                    className="form-control bg-warning text-dark"
                                    placeholder="Heading"
                                    onChange={handleChange}
                                />
                            </div>
                            <select
                                name="status"
                                className="custom-select mb-2 text-center text-dark bg-warning rounded border-warning"
                                defaultValue="task status"
                                onChange={handleChange}
                            >
                                <option disabled value="task status">
                                    Task status
                                </option>
                                <option
                                    value="not started"
                                    className="text-danger"
                                >
                                    Not started
                                </option>
                                <option
                                    value="in process"
                                    className="text-primary"
                                >
                                    In process
                                </option>
                                <option
                                    value="completed"
                                    className="text-success"
                                >
                                    Completed
                                </option>
                            </select>
                            <select
                                name="priority"
                                className="custom-select mb-2 text-center text-dark bg-warning rounded border-warning"
                                defaultValue="importance level"
                                onChange={handleChange}
                            >
                                <option disabled value="importance level">
                                    Importance level
                                </option>
                                <option value="urgent">Urgent</option>
                                <option value="for 1-3 days">
                                    For 1-3 days
                                </option>
                                <option value="for a long time">
                                    For a long time
                                </option>
                            </select>
                            <div className="input-group mb-2 border-dark">
                                <input
                                    name="responsible"
                                    type="text"
                                    className="form-control bg-warning text-dark"
                                    placeholder="Responsible"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group border-dark">
                                <input
                                    name="terms"
                                    type="text"
                                    className="form-control bg-warning text-dark"
                                    placeholder="Terms"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group align-items-center">
                        <textarea
                            name="content"
                            className="form-control text-dark bg-warning mt-2 mb-4"
                            rows="3"
                            placeholder="Task description"
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-dark text-warning w-50"
                            onClick={handleTaskCreation}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskPage;
