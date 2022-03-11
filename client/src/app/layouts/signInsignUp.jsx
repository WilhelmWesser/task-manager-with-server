import React from "react";
import LoginForm from "../forms/loginForm";
import RegisterForm from "../forms/registerForm";
import { useParams } from "react-router-dom";

const SignInSignUp = () => {
    const { type } = useParams();
    if (type === "signIn") {
        return <LoginForm />;
    } else {
        return <RegisterForm />;
    }
};

export default SignInSignUp;
