import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import taskService from "../services/task.service";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCurrentUserId, getIsLoggedIn } from "../store/user";

const TasksContext = React.createContext();

export const useTasks = () => {
    return useContext(TasksContext);
};

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUserId = useSelector(getCurrentUserId());
    useEffect(() => {
        getTasks();
    }, []);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function getTaskById(id) {
        return tasks.find((task) => task._id === id);
    }

    async function getTasks() {
        try {
            if (isLoggedIn) {
                const { content } = await taskService.fetchAll(currentUserId);
                setTasks(content);
                setIsLoading(false);
            }
        } catch (error) {
            const { message } = error.response.data;
            errorCatcher(message);
        }
    }

    const addTask = async (data) => {
        try {
            const { content } = await taskService.create(data);
            if (content) {
                setTasks((prevState) => [...prevState, data]);
            }
            return content;
        } catch (error) {
            const { message } = error.response.data;
            errorCatcher(message);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const { content } = await taskService.delete(taskId);
            if (!content) {
                setTasks((prevState) =>
                    prevState.filter((task) => task._id !== taskId)
                );
            }
            return content;
        } catch (error) {
            const { message } = error.response.data;
            errorCatcher(message);
        }
    };

    async function updateTask(updateData) {
        try {
            const { content } = await taskService.update(updateData);
            if (content) {
                setTasks((prevState) =>
                    prevState.map((item) => {
                        if (item._id === updateData._id) {
                            return updateData;
                        }
                        return item;
                    })
                );
            }
            return content;
        } catch (error) {
            const { message } = error.response.data;
            errorCatcher(message);
        }
    }

    return (
        <TasksContext.Provider
            value={{
                isLoading,
                tasks,
                setTasks,
                getTaskById,
                deleteTask,
                addTask,
                updateTask,
                getTasks
            }}
        >
            {children}
        </TasksContext.Provider>
    );
};

TasksProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
