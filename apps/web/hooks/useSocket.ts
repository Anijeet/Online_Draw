import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [loading,setloading]=useState(true);
    const [socket,setSocket]=useState<WebSocket>();

    useEffect(()=>{
        const ws=new WebSocket (`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNWE1OWUwNC00NzczLTQ4NzQtOGZlNi1mM2E2NzZhYjk1MDgiLCJpYXQiOjE3MzY5MjM0MTd9.f3pd7zaSZvY5LvxufH3SnLf3dMizwFLzBj8oadOO_kY`);
        ws.onopen=()=>{
            setloading(false);
            setSocket(ws);
        }
    },[])

    return {
        loading,
        socket
    }
}