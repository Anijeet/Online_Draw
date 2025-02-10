"use client";

import { HTTP_BACKEND } from "@/config";
import { Button } from "@repo/ui/button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return () => {
      document.body.classList.remove("cursor-wait"); // Reset cursor when unmounted
    };
  }, []);

  const signinHandler = async () => {
    try {
      setLoading(true)
      document.body.classList.add("cursor-wait");
      const newUser = { username: email, password };
      const response = await axios.post(`${HTTP_BACKEND}/signin`, newUser);

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("adminId", data.userid);
        router.push("/dashboard");
      } 
      document.body.classList.remove("cursor-wait");
      setLoading(false)
    } catch (error) {
      setErrorMessage(true);
      document.body.classList.remove("cursor-wait");
      setLoading(false);
    }
  };

  const signupHandler = async () => {
    setLoading(true)
      document.body.classList.add("cursor-wait");
    try {
      const newUser = { name: username, username: email, password };
      const response = await axios.post(`${HTTP_BACKEND}/signup`, newUser);

      if (response.status === 200) {
        router.push("/signin");
      }
      document.body.classList.remove("cursor-wait");
      setLoading(false)
    } catch (error) {
      setErrorMessage(true);
    }
  };

 

  return (
    <div className="h-screen w-screen bg-slate-900 flex justify-center items-center">
      <div className="h-81 w-80 flex flex-col p-10 items-center rounded-xl bg-white">
        <div>
          <h1 className="text-xl font-bold text-black">
            {isSignin ? "Sign In" : "Sign Up"}
          </h1>
        </div>
        <div className="p-4 gap-3 flex flex-col">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-5 py-2 text-black border-[2px] rounded-xl border-gray-700 text-lg"
            type="text"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-5 py-2 text-black border-[2px] border-gray-700 rounded-xl text-lg"
            type="password"
            placeholder="Password"
          />
          {!isSignin && (
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-5 py-2 text-black border-[2px] border-gray-700 rounded-xl text-lg"
              type="text"
              placeholder="Username"
            />
          )}
        </div>
        {errorMessage && <p className="text-red-800">Invalid Credentials</p>}
        <div>
          {isSignin ? (
            <Button
              onClick={signinHandler}
              className={`bg-slate-800 text-white px-3 py-2 rounded-lg  ${loading ? "cursor-wait" : ""}`}
            >
              {loading ? "Loading..." : "Sign In"}
            </Button>
          ) : (
            <Button
              onClick={signupHandler}
              className={`bg-slate-800 text-white px-3 py-2 rounded-lg  ${loading ? "cursor-wait" : ""}`}
            >
             {loading ? "Loading..." : "Sign Up"}
            </Button>
          )}
        </div>
        {isSignin && (
          <p className="text-gray-700 text-sm mt-1">
            Don't have an account?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-green-700 cursor-pointer hover:text-green-900"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
