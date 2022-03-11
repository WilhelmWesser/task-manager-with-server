import React, { useState, useEffect } from "react";
import { validatorChooser } from "../utils/validators/validatorChooser";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUser } from "../store/user";
const EditMyProfilePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const [userData, setUserData] = useState({
        _id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email
    });
    const [errors, setErrors] = useState({
        name: validatorChooser("name", userData.name),
        email: validatorChooser("email", userData.email)
    });
    const [disabled, setDisabled] = useState(
        errors.name !== "" || errors.email !== ""
    );

    useEffect(() => {
        setDisabled(errors.name !== "" || errors.email !== "");
    }, [userData]);

    const handleChange = (event) => {
        setErrors((prevState) => ({
            ...prevState,
            [event.target.name]: validatorChooser(
                event.target.name,
                event.target.value
            )
        }));

        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(updateUser(userData));
            history.replace("/myProfile");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center bg-dark">
            <div className="bg-dark rounded mx-1">
                <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                        history.push("/myProfile");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-left"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                        />
                    </svg>{" "}
                    Go back
                </button>
            </div>
            <form
                className="d-flex flex-column justify-content-center text-warning mt-5"
                onSubmit={handleSubmit}
            >
                <h1 className="mb-5 mt-3">Edit my profile</h1>
                <div className="form-group mt-2">
                    <label className="text-info">{errors.name}</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        aria-describedby="textHelp"
                        placeholder="User name"
                        defaultValue={userData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mt-1">
                    <label className="text-info">{errors.email}</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        defaultValue={userData.email}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className={`btn ${
                        disabled ? "bg-secondary" : "btn-outline-warning"
                    } mt-5 mb-3`}
                    disabled={disabled}
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditMyProfilePage;
