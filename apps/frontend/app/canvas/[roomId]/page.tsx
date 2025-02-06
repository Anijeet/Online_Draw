
import { RoomCanvas } from "@/app/components/RoomCanvs";
import { initDraw } from "@/app/draw";
import { useEffect, useRef } from "react";



export default function CanvasPage({ params }:{
    params:{
        roomId:string
    }
}){
    const roomId = params.roomId;
    console.log(roomId)

    return <RoomCanvas roomId={roomId} />
    
}