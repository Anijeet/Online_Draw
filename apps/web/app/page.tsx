"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router=useRouter()

  return (
    <div className="flex h-screen w-screen justify-center items-center gap-2">
        <div>
          <input
            type="text"
            value={roomId}
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
            placeholder="Room Id"
            className="bg-slate-300 text-black p-2 outline-green-600"
          />
        </div>
        <div>
          <button onClick={()=>{
            router.push(`/room/${roomId}`)
          }} className="py-3 px-6 rounded-lg bg-slate-500">Join</button>
      </div>
    </div>
  );
}
