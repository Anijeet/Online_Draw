"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthPage } from "../components/AuthPage";

export default function Signin() {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);

        if (storedToken) {
            router.push("/dashboard"); 
        }
    }, []);

   

    if (!token) {
        return <AuthPage isSignin={true} />;
    }

    return <div>Redirecting...</div>;
}
