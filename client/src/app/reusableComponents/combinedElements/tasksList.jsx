import React from "react";
import PropTypes from "prop-types";
import Task from "../singleElements/task";

const TasksList = ({ userTasks, type, onDelete }) => {
    return userTasks.map((task) => {
        if (task.status === type) {
            return (
                <Task
                    key={task._id}
                    _id={task._id}
                    color={task.color}
                    onDelete={onDelete}
                />
            );
        } else {
            return null;
        }
    });
};
TasksList.propTypes = {
    userTasks: PropTypes.array,
    type: PropTypes.string,
    onDelete: PropTypes.func
};
export default TasksList;
