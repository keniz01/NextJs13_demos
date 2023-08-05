'use client';

import LoginType from "@/app/constants/login-types";
import { Button } from "antd";
import { SignInOptions, signIn } from "next-auth/react"
import React, { MouseEvent, useState } from 'react';

const LoginForm = () => {
    const [error, setError] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const emailInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    const errorTranslator = (errorMessage: string): string => {
        switch (errorMessage) {
            case "EmailSignin":
                return "The email is not valid.";
            default:
                break;
        }

        return '';
    }
    const submitClickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const options: SignInOptions = {
            email: email,
            redirect: false,
            callbackUrl: "http://localhost:3000/home",
            action: LoginType.DEFAULT
        };

        const response = await signIn("email", options);

        if (!!response?.error) {
            setError(errorTranslator(response.error));
            return;
        }
        setError('');
        setEmail('');
        console.log(options);
    }

    return (
        <div className="grid place-items-center h-screen">
            <section>
                <label>Login</label>
            </section>

            <input
                type="email"
                value={email}
                placeholder="Enter email here"
                onChange={emailInputChangeHandler}
                required />
            <Button type="primary" onClick={submitClickHandler}>Log In</Button>
            <span hidden={!error} >{error}</span>
        </div>
    )
}

export default LoginForm
