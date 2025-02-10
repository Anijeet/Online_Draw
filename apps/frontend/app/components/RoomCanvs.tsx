"use client"

import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import { WS_URL } from "@/config";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}:{roomId:string}){
    const token = localStorage.getItem("token")
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [socket,setSocket] = useState<WebSocket | null>(null);
    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=${token}`);

        ws.onopen = () => {
            setSocket(ws);
            ws.send(
                JSON.stringify({
                    type: "join_room",
                    roomId,
                })
            );

            const usersId = localStorage.getItem("adminId");
            if (usersId) {
                setUsers((prevUsers) => [...new Set([...prevUsers, usersId])]); 

            }
            console.log(users)
        };

        return () => ws.close(); // Cleanup WebSocket on unmount
    }, [roomId, token]);
    

    
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!socket) {
                window.location.reload(); 
            }
        }, 1000); 

        return () => clearTimeout(timeout); 
    }, [socket]);

    if(!socket){
        return <div className="bg-slate-950">Connecting...</div>
    }

    return <div>
        
        <Canvas  roomId={roomId} socket={socket} />
    </div>
}