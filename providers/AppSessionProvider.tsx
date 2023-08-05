"use client";

import ErrorBoundary from "@/app/components/error-boundary";
import { SessionProvider } from "next-auth/react";

type Props = {
    children?: React.ReactNode;
};

export const AppSessionProvider = ({ children }: Props) => {
    return (
        <SessionProvider refetchOnWindowFocus={false} >
            <ErrorBoundary>
                <>{children} </>
            </ErrorBoundary>
        </SessionProvider>
    )
};