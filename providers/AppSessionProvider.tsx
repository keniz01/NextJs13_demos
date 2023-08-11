"use client";

import ErrorBoundary from "@/app/components/error-boundary";
import { SessionProvider } from "next-auth/react";
import { ConfigProvider, type ThemeConfig } from 'antd';

type Props = {
    children?: React.ReactNode;
};

const theme: ThemeConfig = {
    token: {
        fontSize: 16,
        colorPrimary: '#52c41a',
    },
};

export const AppSessionProvider = ({ children }: Props) => {
    return (
        <ConfigProvider theme={theme}>
            <SessionProvider refetchOnWindowFocus={false} >
                <ErrorBoundary>
                    <>{children} </>
                </ErrorBoundary>
            </SessionProvider>
        </ConfigProvider>
    )
};