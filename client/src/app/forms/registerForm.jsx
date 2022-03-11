import React, { useState, useEffect } from "react";
import { validatorChooser } from "../utils/validators/validatorChooser";
import { privacyPolicyValidator } from "../utils/validators/privacyPolicyValidator";
import { useTasks } from "../hooks/useTasks";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, signUp } from "../store/user";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const signUpError = useSelector(getAuthErrors());
    const { getTasks } = useTasks();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        name: validatorChooser("name", userData.name),
        email: validatorChooser("email", userData.email),
        password: validatorChooser("password", userData.password),
        privacyPolicy: privacyPolicyValidator("")
    });
    const [disabled, setDisabled] = useState(
        errors.name !== "" ||
            errors.email !== "" ||
            errors.password !== "" ||
            errors.privacyPolicy !== ""
    );

    useEffect(() => {
        setDisabled(
            errors.name !== "" ||
                errors.email !== "" ||
                errors.password !== "" ||
                errors.privacyPolicy !== ""
        );
    }, [userData]);

    const handleChange = (event) => {
        setErrors((prevState) => ({
            ...prevState,
            [event.target.name]: validatorChooser(
                event.target.name,
                event.target.name === "privacyPolicy"
                    ? event.target.checked
                    : event.target.value
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
            dispatch(signUp(userData));
            await getTasks();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center bg-dark">
            <div className="d-flex justify-content-center">
                <form
                    className="d-flex flex-column justify-content-center text-warning mt-5"
                    onSubmit={handleSubmit}
                >
                    <h1 className="mb-5 mt-3">Registration form</h1>
                    <div className="form-group mt-2">
                        <label className="text-info">{errors.name}</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            aria-describedby="textHelp"
                            placeholder="User name"
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
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label className="text-info">{errors.password}</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-check mt-3">
                        <label className="text-info">
                            {errors.privacyPolicy}
                        </label>
                        <div>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="exampleCheck1"
                                name="privacyPolicy"
                                onChange={handleChange}
                            />
                            <label>
                                Accept{" "}
                                <a
                                    href="/"
                                    className="text-success"
                                    style={{ textDecoration: "none" }}
                                >
                                    licence terms
                                </a>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="text-dark bg-info rounded mt-2">
                            {signUpError}
                        </label>
                    </div>
                    <button
                        type="submit"
                        className={`btn ${
                            disabled ? "bg-secondary" : "btn-outline-warning"
                        } mt-3 mb-3`}
                        disabled={disabled}
                    >
                        Sign up
                    </button>
                    <h5 className="text-center text-light mb-5">
                        Do you already have an account?{" "}
                        <a
                            href="/login/signIn"
                            className="text-success"
                            style={{ textDecoration: "none" }}
                        >
                            Sign In
                        </a>
                    </h5>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
