import React, { useEffect } from "react";
import TasksList from "../reusableComponents/combinedElements/tasksList";
import { useHistory } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
const MyTasks = () => {
    const history = useHistory();
    const cardTypes = [
        {
            type: "not started",
            color: "danger",
            text: "Tasks to start"
        },
        {
            type: "in process",
            color: "primary",
            text: "Started but not finished"
        },
        {
            type: "completed",
            color: "success",
            text: "Finished tasks"
        }
    ];
    const { tasks, setTasks, getTasks, deleteTask } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    const handleSubmit = () => {
        history.push("/createTask");
    };

    const handleTaskDeletion = (id) => {
        deleteTask(id);
    };

    const handleSelectSwitch = (event) => {
        const filter = event.target.value;
        switch (filter) {
            case "urgent":
                setTasks([
                    ...tasks.sort((a, b) =>
                        a.priority.rate > b.priority.rate ? -1 : 1
                    )
                ]);
                break;
            case "for 1-3 days":
                setTasks([
                    ...tasks.sort((a, b) => (a.priority.rate === 2 ? -1 : 1))
                ]);
                break;
            case "for a long time":
                setTasks([
                    ...tasks.sort((a, b) =>
                        a.priority.rate < b.priority.rate ? -1 : 1
                    )
                ]);
                break;
            default:
                break;
        }
    };

    if (tasks) {
        return (
            <div className="d-flex flex-column justify-content-around">
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column justify-content-center  mt-3">
                        <h6 className="text-center text-warning bg-dark rounded">
                            Filter by urgency
                        </h6>
                        <select
                            className="custom-select text-center text-warning bg-dark rounded"
                            defaultValue="urgent"
                            onChange={handleSelectSwitch}
                        >
                            <option disabled>Task importance filter</option>
                            <option value="urgent" className="text-danger">
                                Urgent
                            </option>
                            <option
                                value="for 1-3 days"
                                className="text-primary"
                            >
                                For 1-3 days
                            </option>
                            <option
                                value="for a long time"
                                className="text-success"
                            >
                                For a long time
                            </option>
                        </select>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-around m-5">
                    {cardTypes.map((type) => (
                        <div className="d-flex flex-column" key={type.color}>
                            <div
                                className={`card text-white bg-${type.color} mb-3`}
                                style={{ maxWidth: "18rem" }}
                            >
                                <div className="card-body">
                                    <h5 className="card-title text-center">
                                        {type.text}
                                    </h5>
                                </div>
                            </div>
                            <TasksList
                                userTasks={tasks}
                                type={type.type}
                                onDelete={handleTaskDeletion}
                            />
                            {type.type === "not started" ? (
                                <button
                                    className="btn btn-dark text-warning shadow-lg"
                                    onClick={handleSubmit}
                                >
                                    Add task
                                </button>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return <h1>Loading....</h1>;
    }
};

export default MyTasks;
