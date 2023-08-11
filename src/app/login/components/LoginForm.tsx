'use client';

import { SubmitButton } from "@/app/components/SubmitButton";
import LoginType from "@/app/constants/login-types";
import { Button, Form, Input, Space } from "antd";
import { SignInOptions, signIn } from "next-auth/react"
import React, { MouseEvent, useState } from 'react';
import validator from 'validator'

const LoginForm = () => {
    const [error, setError] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [form] = Form.useForm();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const errorTranslation = (errorMessage: string): string => {
        switch (errorMessage) {
            case "EmailSignin":
                return "The email is not valid.";
            default:
                break;
        }

        return '';
    }

    const handleButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const options: SignInOptions = {
            email: email,
            redirect: false,
            callbackUrl: `${window.location.origin}/home`,
            action: LoginType.DEFAULT
        };

        const response = await signIn("email", options);

        if (!!response?.error) {
            setError(errorTranslation(response.error));
            return;
        }

        setError('');
        setEmail('');
        console.log(options);
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-full max-w-lg">
                <Form
                    form={form} 
                    name="loginForm"
                    autoComplete="off"
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <Form.Item 
                        className="mb-4"
                        name="emailInput"
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[{ 
                            required: true,
                            message: "dkjsdkjjkdjkdsjkdsjk sdjksdjk",
                            validator: (_, value) => {
                                !validator.isEmail(value) 
                                    ? Promise.reject('jsavhjvhs sasabhhad')
                                    : Promise.resolve();

                                    console.log("VALUE =====> " + value)
                                }
                        }]}
                    >
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <Input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            value={email}
                            type="email"
                            onChange={handleEmailChange}
                            placeholder="Enter email here ..."
                            required />
                        {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    </Form.Item>
                    <Form.Item className="flex items-center justify-between">
                        <Space>
                            <SubmitButton 
                                label="Sign In" 
                                onClickHandler={handleButtonClick} 
                                form={form}
                            />
                            <Button
                                type="link"
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                Register
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LoginForm
