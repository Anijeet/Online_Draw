import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import IconsButtons from "./IconsButtons";
import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdStraight } from "react-icons/md";
import { MdOutlinePanTool } from "react-icons/md";
import { LuEraser } from "react-icons/lu";

import { Game } from "../draw/Game";
import { useRouter } from "next/navigation";


export type Tool = "circle" | "rect" | "line" | "panTool" | "pencil" | "eraser";

export function Canvas({
    roomId,
    socket
}: {
    socket: WebSocket;
    roomId: string;
}) {
    

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("rect")
    const [grabbing, setGrabbing] = useState(false)
    const router = useRouter();
    const [shouldRender, setShouldRender] = useState(false);
    // useEffect(() => {
    //     const hasRefreshed = sessionStorage.getItem("canvas_refreshed");

    //     if (!hasRefreshed) {
    //         sessionStorage.setItem("canvas_refreshed", "true");
    //         window.location.replace(window.location.href); // Hard refresh
    //     } else {
    //         setShouldRender(true);
    //     }

    //     return () => {
    //         sessionStorage.removeItem("canvas_refreshed"); // Ensure refresh on next visit
    //     };
    // }, []);

    // if (!shouldRender) return null;

    useEffect(() => {
        game?.setTool(selectedTool);
    }, [selectedTool, game]);

    useEffect(() => {
        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);

           

            if(selectedTool === "panTool"){
                const handleGrab = () => {
                    setGrabbing((prev)=> !prev)
                }

                document.addEventListener("mousedown", handleGrab)
                document.addEventListener("mouseup", handleGrab)

                return () =>{
                    document.removeEventListener("mousedown", handleGrab)
                    document.removeEventListener("mouseup", handleGrab)
                }

            }



        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "1":
                    setSelectedTool("rect");
                    break;
                case "2":
                    setSelectedTool("circle");
                    break;
                case "3":
                    setSelectedTool("line");
                    break;
                case "4":
                    setSelectedTool("pencil");
                    break;
                case "5":
                    setSelectedTool("panTool");
                    break;
                case "6":
                    setSelectedTool("eraser");
                    break;
            }
        };
        
        document.addEventListener("keydown", handleKeyDown);
    

            return () => {
                g.destroy();
                document.removeEventListener("keydown", handleKeyDown)
            }
        }



    }, [canvasRef]);
  
    return <div className="w-screen overflow-hidden h-screen relative">
        <canvas className={`h-screen overflow-hidden bg-white 
    ${(selectedTool === "panTool") ? 
    (grabbing ? "cursor-grabbing" : "cursor-grab") : 
    "cursor-crosshair"} ` }
     style={{ cursor: selectedTool === "rect" ? "crosshair" :  selectedTool === "circle" ? "crosshair" :  selectedTool === "line" ? "crosshair": selectedTool === "panTool" ? "grab" : selectedTool==="pencil" ? "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"26\" height=\"26\"><path d=\"M4 20h16v2H4v-2zm16.586-11.414l-2.172-2.172a1.5 1.5 0 0 0-2.121 0L4.414 16.293l-.707 4.242 4.242-.707L20.586 8.586a1.5 1.5 0 0 0 0-2.121z\" fill=\"%23FFFFFF\"/></svg>') 6 20, auto" : selectedTool === "eraser" ? "url('https://img.icons8.com/?size=20&id=98412&format=png&color=FFFFFF' ),auto"  : "default"  }} 
     ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <Topbar  setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
    </div>
}

function Topbar({selectedTool, setSelectedTool}: {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}) {
    return <div className="drawing-container fixed items-center text-center h-[40px] flex top-8 left-[650px] bg-slate-900 p-2  px-10 gap-5 rounded-lg" style={{ cursor: selectedTool === "rect" ? "crosshair" : "default" }}>
        <IconsButtons shortKey={1}
        onClick={()=>{setSelectedTool('rect') }}
         activated={selectedTool==="rect"} icon={<RiRectangleLine className={`h-5 w-5  `  }/>} />
        <IconsButtons shortKey={2}
         onClick={()=>{setSelectedTool('circle')}}
         activated={selectedTool==="circle"} icon={<FaRegCircle />}  />
        <IconsButtons  shortKey={3}
        onClick={()=>{setSelectedTool('line')}}
        activated={selectedTool==="line"} icon={<MdStraight />}  />
         <IconsButtons shortKey={4}
        onClick={()=>{setSelectedTool('panTool')}}
        activated={selectedTool==="panTool"} icon={<MdOutlinePanTool />}  />
        <IconsButtons shortKey={5}
        onClick={()=>{setSelectedTool('pencil')}}
        activated={selectedTool==="pencil"} icon={<FaPencilAlt />}  />
        <IconsButtons shortKey={6}
        onClick={()=>{setSelectedTool('eraser')}}
        activated={selectedTool==="eraser"} icon={<LuEraser />}  />
    </div>
}