'use client';

import { useSession } from "next-auth/react";
import LoginForm from "./components/LoginForm";
import Home from "../home/page";

const Login = () => {
  const { data: session } = useSession();
  return !session 
    ? <LoginForm />
    : <Home />
};

export default Login;
