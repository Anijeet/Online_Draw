"use client"

import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import { WS_URL } from "@/config";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}:{roomId:string}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [socket,setSocket] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ZjYxZTkxMS1hODgzLTRjNzUtOTI1MS1hNDJmNzhlYWVjMjIiLCJpYXQiOjE3MzgxNDQ1MTZ9.rd9r-2_TdMMCqAWb0KoqKv1vZq9SUsO_cVfSnSjM_MQ`)

        ws.onopen=()=>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type:"join_room",
                roomId
            }))
        }
    })

    
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!socket) {
                window.location.reload(); // Reload the page if socket is still null
            }
        }, 1000); // Wait for 3 seconds

        return () => clearTimeout(timeout); // Cleanup the timeout
    }, [socket]);

    if(!socket){
        return <div>Connecting...</div>
    }

    return <div>
        <Canvas roomId={roomId} socket={socket} />
    </div>
}