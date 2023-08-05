'use client';

import { AppSessionProvider } from '../../providers/AppSessionProvider';
import './globals.css'
 
function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head>
                <title>Test App</title>
            </head>
            <body>
                <AppSessionProvider>
                    <>{children}</>
                </AppSessionProvider>
            </body>
        </html>
    );
}

export default RootLayout;
