'use client';

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const Home = () => {
    const router = useRouter();
    const { status, data:session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/');
        },
    })

    if (status === "loading") {
        return "Loading or not authenticated..."
    }
    
    return (
        <div>
            <h1>Home</h1>
            Hello, {session?.user?.email ?? session?.user?.name} <br />
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    )
}

export default Home